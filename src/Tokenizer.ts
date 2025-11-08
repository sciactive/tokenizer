import CRC32 from 'crc-32';
import JsLingua from 'jslingua';
import { splitn } from '@sciactive/splitn';

import { sciactive } from './stopwords.js';

export class Tokenizer {
  public Morpho: any;
  public stopWords: { [k: string]: number };

  static listLanguages(): string[] {
    return JsLingua.llang('morpho');
  }

  static listStemmingAlgorithms(language: string): string[] {
    const Morpho = JsLingua.gserv('morpho', language);
    return Morpho.lstem();
  }

  static getLanguageStopWords(language: string): { [k: string]: number } {
    const Morpho = JsLingua.gserv('morpho', language);
    return Morpho.stop_words;
  }

  constructor({
    stopWords = sciactive,
    language = 'eng',
    stemmingAlgorithm = 'porter',
  }: {
    stopWords?: { [k: string]: number };
    language?: string;
    stemmingAlgorithm?: string;
  } = {}) {
    this.stopWords = stopWords;
    this.Morpho = JsLingua.gserv('morpho', language);

    this.Morpho.sstem(stemmingAlgorithm);
  }

  detailedTokenize(input: string) {
    const words: string[] = this.Morpho.gwords(
      input
        .trim()
        .replace(/(\w),(\w)/g, '$1 $2')
        .replace(/(\d),(\w)/g, '$1 $2')
        .replace(/(\w),(\d)/g, '$1 $2'),
    )
      .filter((word: string | null) => word != null && !!word.match(/\w/))
      .map((word: string) =>
        word
          .replace(/[)\]}:;.?!…‽"']$/g, () => '')
          .replace(/^[([{"']/g, () => ''),
      )
      .filter((word: string) => word != '');

    let outputOrig: string[] = [];
    let outputStem: string[] = [];
    let outputTokens: [string, boolean][][] = [];

    for (let word of words) {
      const orig = word.toLowerCase().trim();
      if (orig == '' || orig in this.stopWords || this.stopWords[orig]) {
        continue;
      }

      outputOrig.push(orig);

      if (/^\S*@\S*$/.test(word)) {
        let [user, domainandpossiblyquery] = splitn(orig, '@', 2);
        const [domain, _querypart] = splitn(domainandpossiblyquery, '?', 2);
        let tokens: [string, boolean][] = [];
        if (user.startsWith('mailto:')) {
          const [proto, realuser] = splitn(user, ':', 2);
          tokens = [
            [proto, true],
            [realuser, true],
            [domain, true],
            [orig, false],
          ];
        } else {
          tokens = [
            [user, true],
            [domain, true],
            [orig, false],
          ];
        }

        outputStem.push(orig);
        outputTokens.push(tokens);
      } else if (/^\w+:\/\/\S+$/.test(word)) {
        const [proto, domainpath] = splitn(orig, '://', 2);
        const [domain, path] = splitn(domainpath, '/', 2);
        const tokens: [string, boolean][] = [
          [proto, true],
          [domain, true],
        ];
        if (path) {
          tokens.push([path, true]);
        }
        tokens.push([orig, false]);

        outputStem.push(orig);
        outputTokens.push(tokens);
      } else {
        let newWords: string[] = this.Morpho.gwords(
          this.Morpho.norm(this.Morpho.stem(word)),
        )
          .filter((word: string | null) => word != null && word != '')
          .map((word: string) => this.Morpho.stem(word).toLowerCase() as string)
          .map((word: string) => word.split('-'))
          .flat()
          .map((word: string) => word.replace(/\W+/, () => '').trim())
          .filter((word: string) => word != '');

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
              newWords.map((newWord) => [newWord, newWord !== orig]),
            );
          } else {
            outputTokens.push([
              ...newWords.map(
                (newWord) => [newWord, true] as [string, boolean],
              ),
              [orig, false],
            ]);
          }
        }
      }
    }

    const resultTokens: {
      input: string;
      token: number;
      position: number;
      stem: boolean;
    }[][] = [];
    for (let i = 0; i < outputTokens.length; i++) {
      resultTokens[i] = [];
      const tokens = outputTokens[i];
      for (let j = 0; j < tokens.length; j++) {
        resultTokens[i][j] = {
          input: tokens[j][0],
          token: CRC32.str(tokens[j][0], 0),
          position: i + 1,
          stem: tokens[j][1],
        };
      }
    }

    return {
      original: outputOrig,
      stemmed: outputStem,
      tokens: resultTokens,
    };
  }

  tokenize(input: string) {
    return this.detailedTokenize(input)
      .tokens.flat()
      .map((token) => ({
        token: token.token,
        position: token.position,
        stem: token.stem,
      }));
  }
}
