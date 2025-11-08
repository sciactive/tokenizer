import CRC32 from 'crc-32';
import JsLingua from 'jslingua';
import { splitn } from '@sciactive/splitn';

import { sciactive } from './stopwords.js';

export class Tokenizer {
  stopWords;

  constructor({ stopWords = sciactive } = {}) {
    this.stopWords = stopWords;
  }

  detailedTokenize(input) {
    let EngMorpho = JsLingua.gserv('morpho', 'eng');

    const words = EngMorpho.gwords(
      input
        .trim()
        .replace(/(\w),(\w)/g, '$1 $2')
        .replace(/(\d),(\w)/g, '$1 $2')
        .replace(/(\w),(\d)/g, '$1 $2'),
    )
      .filter((word) => !!word.match(/\w/))
      .map((word) =>
        word
          .replace(/[)\]}:;.?!…‽"']$/g, () => '')
          .replace(/^[([{"']/g, () => ''),
      )
      .filter((word) => word != null && word != '');

    EngMorpho.sstem('porter');
    //EngMorpho.sstem('lancaster');

    let outputOrig = [];
    let outputStem = [];
    let outputTokens = [];

    for (let word of words) {
      const orig = word.toLowerCase().trim();
      if (orig == '' || orig in this.stopWords || this.stopWords[orig]) {
        continue;
      }

      outputOrig.push(orig);

      if (/^\S*@\S*$/.test(word)) {
        let [user, domain] = splitn(orig, '@', 2);
        let tokens = [];
        if (user.startsWith('mailto:')) {
          const [proto, realuser] = splitn(user, ':', 2);
          tokens = [
            [proto, false],
            [realuser, false],
            [domain, false],
            [orig, true],
          ];
        } else {
          tokens = [
            [user, false],
            [domain, false],
            [orig, true],
          ];
        }

        outputStem.push(orig);
        outputTokens.push(tokens);
      } else if (/^\w+:\/\/\S+$/.test(word)) {
        const [proto, domainpath] = splitn(orig, '://', 2);
        const [domain, path] = splitn(domainpath, '/', 2);
        const tokens = [
          [proto, false],
          [domain, false],
        ];
        if (path) {
          tokens.push([path, false]);
        }
        tokens.push([orig, true]);

        outputStem.push(orig);
        outputTokens.push(tokens);
      } else {
        let newWords = EngMorpho.gwords(EngMorpho.norm(EngMorpho.stem(word)))
          .map((word) => EngMorpho.stem(word).toLowerCase())
          .map((word) => word.split('-'))
          .flat()
          .map((word) => word.replace(/\W+/, () => '').trim())
          .filter((word) => word != '');

        newWords = newWords
          .map((curWord) => {
            if (/^\d+[.,]\d+$/.test(curWord)) {
              const [part1, _part2] = splitn(curWord, /[.,]/, 2);
              if (!newWords.includes(part1)) {
                return [part1, curWord];
              }
            }
            return [curWord];
          })
          .flat();

        if (newWords.length) {
          outputStem.push(...newWords);
        }

        if (newWords.length || orig != '') {
          if (newWords.includes(orig) || orig == '') {
            outputTokens.push(
              newWords.map((newWord) => [newWord, newWord === orig]),
            );
          } else {
            outputTokens.push([
              ...newWords.map((newWord) => [newWord, false]),
              [orig, true],
            ]);
          }
        }
      }
    }

    for (let i = 0; i < outputTokens.length; i++) {
      const tokens = outputTokens[i];
      for (let j = 0; j < tokens.length; j++) {
        tokens[j] = {
          _input: tokens[j][0],
          token: CRC32.str(tokens[j][0], 0),
          position: i + 1,
          verbatim: tokens[j][1],
        };
      }
    }

    return {
      original: outputOrig,
      stemmed: outputStem,
      tokens: outputTokens,
    };
  }

  tokenize(input) {
    return this.detailedTokenize(input)
      .tokens.flat()
      .map((token) => ({
        token: token.token,
        position: token.position,
        verbatim: token.verbatim,
      }));
  }
}
