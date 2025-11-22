import CRC32 from 'crc-32';
import { splitn } from '@sciactive/splitn';

import { StopWords } from './StopWords.js';
import { Stemmers } from './Stemmers.js';

type InterimOrTerm = {
  type: 'interimor';
};

type InterimNotTerm = {
  type: 'interimnot';
};

export type SearchTerm = {
  type: 'token';
  input: string;
  token: number;
  nostemmed: boolean;
};

export type SearchOrTerm = {
  type: 'or';
  operands: (SearchTerm | SearchNotTerm | SearchSeriesTerm)[];
};

export type SearchNotTerm = {
  type: 'not';
  operand: SearchTerm | SearchSeriesTerm;
};

export type SearchSeriesTerm = {
  type: 'series';
  tokens: SearchTerm[];
};

type InterimSearchQuery = (
  | SearchTerm
  | InterimOrTerm
  | InterimNotTerm
  | SearchSeriesTerm
)[];

export type SearchQuery = (
  | SearchTerm
  | SearchOrTerm
  | SearchNotTerm
  | SearchSeriesTerm
)[];

export class Tokenizer {
  public stemmer: any;
  public trimGrammarPunctuation: (word: string) => string;
  public removePunctuation: (word: string) => string;
  public stopWords: { [k: string]: number };

  constructor({
    stopWords = StopWords.english,
    language = 'english',
    trimGrammarPunctuation = (word: string) =>
      word
        .replace(
          /[\u2000-\u206F\u2E00-\u2E7F\\'!"&()*,\-.\/:;<=>?@\[\]^_`{|}~]+$/g,
          () => '',
        )
        .replace(
          /^[\u2000-\u206F\u2E00-\u2E7F\\'!"&()*,\-.\/:;<=>?@\[\]^_`{|}~]+/g,
          () => '',
        ),
    removePunctuation = (word: string) =>
      word.replace(
        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/g,
        () => '',
      ),
  }: {
    stopWords?: { [k: string]: number };
    language?: keyof typeof Stemmers;
    trimGrammarPunctuation?: (word: string) => string;
    removePunctuation?: (word: string) => string;
  } = {}) {
    this.stopWords = stopWords;

    this.stemmer = new Stemmers[language]();
    this.trimGrammarPunctuation = trimGrammarPunctuation;
    this.removePunctuation = removePunctuation;
  }

  parseSearchQuery(input: string) {
    input = input.toLowerCase().replace(/“|”/g, '"').replace(/‘|’/g, "'");

    // The interim query has flat ORs and NOTs, since those things are dependent
    // on what is around them. The get translated later.
    const interimQuery: InterimSearchQuery = [];
    let context: 'bare' | 'doublequote' | 'singlequote' = 'bare';
    let currentSpan = '';

    // Add the current span to the interim query, using the right context.
    const addCurrentSpanToInterimQuery = () => {
      const detailed = this.detailedTokenize(currentSpan);

      if (detailed.tokens.length === 0) {
        return;
      }

      if (context === 'bare') {
        for (let tokens of detailed.tokens) {
          if (tokens.length === 1) {
            interimQuery.push({
              type: 'token',
              input: tokens[0].input,
              token: tokens[0].token,
              nostemmed: false,
            });
          } else if (tokens.length === 2) {
            const stemmedToken =
              tokens.find((token) => token.stem) || tokens[0];

            interimQuery.push({
              type: 'token',
              input: tokens[0].input,
              token: stemmedToken.token,
              nostemmed: false,
            });
          } else {
            const unstemmedToken =
              tokens.find((token) => !token.stem) || tokens[tokens.length - 1];

            interimQuery.push({
              type: 'token',
              input: tokens[0].input,
              token: unstemmedToken.token,
              nostemmed: false,
            });
          }
        }
      } else {
        const seriesTerm: SearchSeriesTerm = {
          type: 'series',
          tokens: [],
        };

        for (let tokens of detailed.tokens) {
          if (tokens.length === 1) {
            seriesTerm.tokens.push({
              type: 'token',
              input: tokens[0].input,
              token: tokens[0].token,
              nostemmed: context === 'doublequote',
            });
          } else if (tokens.length === 2) {
            const selectedToken =
              tokens.find((token) =>
                context === 'singlequote' ? token.stem : !token.stem,
              ) || tokens[0];

            seriesTerm.tokens.push({
              type: 'token',
              input: selectedToken.input,
              token: selectedToken.token,
              nostemmed: context === 'doublequote',
            });
          } else {
            const unstemmedToken =
              tokens.find((token) => !token.stem) || tokens[tokens.length - 1];

            seriesTerm.tokens.push({
              type: 'token',
              input: unstemmedToken.input,
              token: unstemmedToken.token,
              nostemmed: context === 'doublequote',
            });
          }
        }

        if (seriesTerm.tokens.length) {
          interimQuery.push(seriesTerm);
        }
      }
    };

    // Go through each character.
    for (let i = 0; i < input.length; i++) {
      if (input[i] === '"' && context !== 'singlequote') {
        if (context === 'doublequote') {
          // This is an ending double quote.
          addCurrentSpanToInterimQuery();
          currentSpan = '';
          context = 'bare';
          continue;
        } else {
          // This is a beginning double quote.
          if (currentSpan !== '') {
            addCurrentSpanToInterimQuery();
          }
          currentSpan = '';
          context = 'doublequote';
          continue;
        }
      }

      if (input[i] === "'" && context !== 'doublequote') {
        if (context === 'singlequote') {
          // This is an ending single quote.
          addCurrentSpanToInterimQuery();
          currentSpan = '';
          context = 'bare';
          continue;
        } else {
          // This is a beginning single quote.
          if (currentSpan !== '') {
            addCurrentSpanToInterimQuery();
          }
          currentSpan = '';
          context = 'singlequote';
          continue;
        }
      }

      if (
        context === 'bare' &&
        input[i] === 'o' &&
        input
          .slice(Math.max(i - 1, 0), Math.min(i + 3, input.length - 1))
          .match(/^\s?or\s?$/)
      ) {
        // This is the word "or" surrounded by white space, which is the OR
        // operator.
        addCurrentSpanToInterimQuery();
        currentSpan = '';
        interimQuery.push({
          type: 'interimor',
        });
        // We need to move forward to after the "or" so that the next iteration
        // will come after the whitespace.
        i = i + 2;
        continue;
      }

      if (
        context === 'bare' &&
        input[i] === '-' &&
        input
          .slice(Math.max(i - 1, 0), Math.min(i + 2, input.length - 1))
          .match(/^\s?-\S$/)
      ) {
        // This is a "-", prededed by white space, and followed by non-white
        // space, which is the NOT operator.
        addCurrentSpanToInterimQuery();
        currentSpan = '';
        interimQuery.push({
          type: 'interimnot',
        });
        continue;
      }

      // Nothing special, so just add the character to the current span.
      currentSpan += input[i];
    }
    // Add any remaining things in the current span to the interim query.
    addCurrentSpanToInterimQuery();

    // Search for series with only one token and reduce them to their only term.
    for (let i = 0; i < interimQuery.length; i++) {
      const term = interimQuery[i];
      if (term.type === 'series' && term.tokens.length === 0) {
        interimQuery.splice(i, 1);
        i--;
        continue;
      } else if (term.type === 'series' && term.tokens.length === 1) {
        interimQuery[i] = term.tokens[0];
      }
    }

    // Convert the ORs and NOTs in the interim query to the final query.
    const query: SearchQuery = [];
    while (interimQuery.length) {
      const currentTerm = interimQuery.shift();

      if (currentTerm == null) {
        continue;
      }

      if (currentTerm.type === 'interimnot') {
        // An interim not negates the next term, so convert it and the next term
        // to a "not" term.
        let nextTerm = interimQuery.shift();
        while (
          nextTerm &&
          (nextTerm?.type === 'interimnot' || nextTerm?.type === 'interimor')
        ) {
          nextTerm = interimQuery.shift();
        }
        if (nextTerm == null) {
          continue;
        }

        query.push({
          type: 'not',
          operand: nextTerm,
        });
      } else if (currentTerm.type === 'interimor') {
        // An interim or combines the previous and next term into an or, so
        // convert it to an "or" term.

        // If the query doesn't have any previous terms, just ignore the or.
        if (query.length === 0) {
          continue;
        }

        const lastTerm = query[query.length - 1];
        let nextTerm:
          | SearchTerm
          | InterimOrTerm
          | InterimNotTerm
          | SearchSeriesTerm
          | SearchNotTerm
          | undefined = interimQuery.shift();
        while (nextTerm && nextTerm?.type === 'interimor') {
          nextTerm = interimQuery.shift();
        }
        if (nextTerm == null) {
          continue;
        }

        if (nextTerm.type === 'interimnot') {
          // If the next term is an interim not, we need to convert it here.
          while (
            nextTerm &&
            (nextTerm?.type === 'interimnot' || nextTerm?.type === 'interimor')
          ) {
            nextTerm = interimQuery.shift();
          }
          if (nextTerm == null) {
            continue;
          }

          nextTerm = {
            type: 'not',
            operand: nextTerm,
          };
        }

        if (lastTerm.type === 'or') {
          // The last term is already an or, so just append the next term to the
          // operands.
          lastTerm.operands.push(nextTerm);
        } else {
          // The last term is a normal term, so convert it to an or with the
          // left and right terms in the operand list.
          query[query.length - 1] = {
            type: 'or',
            operands: [lastTerm, nextTerm],
          };
        }
      } else {
        // Not a special term, so just append it to the query.
        query.push(currentTerm);
      }
    }

    // Search for ORs with only one operand and reduce them to their only term.
    for (let i = 0; i < query.length; i++) {
      const term = query[i];
      if (term.type === 'or' && term.operands.length === 0) {
        query.splice(i, 1);
        i--;
        continue;
      } else if (term.type === 'or' && term.operands.length === 1) {
        query[i] = term.operands[0];
      }
    }

    return query;
  }

  detailedTokenize(input: string) {
    const words: string[] = input
      .trim()
      .replace(/\x00-\x1f\x7F\x80-\x9F/g, () => '')
      .replace(/“|”/g, '"')
      .replace(/‘|’/g, "'")
      .replace(/(\w),(\w)/g, '$1 $2')
      .replace(/(\d),(\w)/g, '$1 $2')
      .replace(/(\w),(\d)/g, '$1 $2')
      .split(/(?:[,;])?\s+/)
      .filter((word: string | null) => word != null)
      .map(this.trimGrammarPunctuation)
      .filter((word: string) => this.removePunctuation(word) != '');

    let outputOrig: string[] = [];
    let outputStem: string[] = [];
    // "string" is the text token, "boolean" is whether it is a stemmed version.
    let outputTokens: [string, boolean][][] = [];

    for (let word of words) {
      const orig = word.toLowerCase().trim();
      if (orig == '' || orig in this.stopWords || this.stopWords[orig]) {
        continue;
      }

      outputOrig.push(orig);

      if (/^\S*@\S*$/.test(word)) {
        // Handle email addresses.
        let [user, domainandpossiblyquery] = splitn(orig, '@', 2);
        const [domain, _querypart] = splitn(domainandpossiblyquery, '?', 2);
        const parts = this.splitDomain(domain);
        let tokens: [string, boolean][] = [];
        if (user.startsWith('mailto:')) {
          const [proto, realuser] = splitn(user, ':', 2);
          tokens = [
            [proto, true],
            [realuser, true],
            ...parts.map((part) => [part, true] as [string, boolean]),
            [orig, false],
          ];
        } else {
          tokens = [
            [user, true],
            ...parts.map((part) => [part, true] as [string, boolean]),
            [orig, false],
          ];
        }

        outputStem.push(orig);
        outputTokens.push(tokens);
      } else if (/^\w+:\/\/\S+$/.test(word)) {
        // Handle URLs.
        const [proto, domainpath] = splitn(orig, '://', 2);
        const [domain, path] = splitn(domainpath, '/', 2);
        const parts = this.splitDomain(domain);
        const tokens: [string, boolean][] = [
          [proto, true],
          ...parts.map((part) => [part, true] as [string, boolean]),
        ];
        if (path) {
          tokens.push([path, true]);
        }
        tokens.push([orig, false]);

        outputStem.push(orig);
        outputTokens.push(tokens);
      } else if (/^\w+(?:[-.+=_]\w+)+$/.test(word)) {
        // Handle conjoined words, like domain.names, hyphenated-words, etc.

        let parts: string[] = [];
        let tokens: [string, boolean][] = [];
        if (word.match(/^(?:\w|-)+\.(?:\w|-)+(?:\.(?:\w|-)+)?$/)) {
          // Looks like a domain name.
          parts = this.splitDomain(orig).filter((part) => part !== orig);
          tokens = parts.map((part) => [part, true]);
          tokens.push([orig, false]);
        } else {
          parts = orig.split(/[-.+=]/g);
          tokens = parts.map((part) => [part, true]);
          tokens.push([orig, false]);
        }

        outputStem.push(...parts);
        outputTokens.push(tokens);
      } else {
        // Handle everything else.
        let newWords: string[] = word
          .split(/(?:[,;])?\s+/)
          .filter((word: string | null) => word != null)
          .map((word: string) => word.toLowerCase() as string)
          .map((word: string) => word.split('-'))
          .flat()
          .map(
            this.stemmer.stemWord.bind(this.stemmer) as (
              word: string,
            ) => string,
          )
          .map((word: string) => this.removePunctuation(word).trim())
          .filter((word: string | null) => word != null && word != '');

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

    // Use CRC32 to turn the string tokens into their actual (Int32) token
    // values.
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

  searchString(query: string, input: string) {
    const tokens = this.tokenize(input);
    const parsedQuery = this.parseSearchQuery(query);

    const tokenMap: { [k: string]: { position: number; stem: boolean }[] } = {};

    // Build a token map of the input string.
    for (let token of tokens) {
      if (!(token.token in tokenMap)) {
        tokenMap[token.token] = [];
      }

      tokenMap[token.token].push({
        position: token.position,
        stem: token.stem,
      });
    }

    const checkToken = (term: SearchTerm) => {
      if (!(term.token in tokenMap)) {
        return false;
      }
      if (term.nostemmed) {
        if (!tokenMap[term.token].find((token) => !token.stem)) {
          return false;
        }
      }
      return true;
    };

    const checkSeries = (series: SearchSeriesTerm) => {
      const firstTerm = series.tokens[0];

      if (!(firstTerm.token in tokenMap)) {
        return false;
      }

      const firstTokens = tokenMap[firstTerm.token].filter(
        (token) => !firstTerm.nostemmed || !token.stem,
      );

      for (let firstToken of firstTokens) {
        let found = true;
        for (let i = 1; i < series.tokens.length; i++) {
          const currentTerm = series.tokens[i];
          if (!(currentTerm.token in tokenMap)) {
            return false;
          }
          if (
            !tokenMap[currentTerm.token].find(
              (token) =>
                token.position === firstToken.position + i &&
                (!currentTerm.nostemmed || !token.stem),
            )
          ) {
            found = false;
            break;
          }
        }

        if (found) {
          return true;
        }
      }

      return false;
    };

    const checkTerm = (
      term: SearchTerm | SearchOrTerm | SearchNotTerm | SearchSeriesTerm,
    ): boolean => {
      if (term.type === 'series') {
        return checkSeries(term);
      } else if (term.type === 'not') {
        return !checkTerm(term.operand);
      } else if (term.type === 'or') {
        for (let operand of term.operands) {
          if (checkTerm(operand)) {
            return true;
          }
        }
        return false;
      }
      return checkToken(term);
    };

    // Run through the query and check each term.
    for (let term of parsedQuery) {
      if (!checkTerm(term)) {
        return false;
      }
    }

    // All terms matched!
    return true;
  }

  splitDomain(domain: string) {
    // All of the domain parts.
    const parts = domain.split('.');
    // Save parts length because it will change.
    const partsLength = parts.length;
    // Add all of the domains/subdomains.
    // Ex: mail.port87.com will include both port87.com and mail.port87.com.
    for (let i = partsLength - 2; i >= 0; i--) {
      parts.push(parts.slice(i, partsLength).join('.'));
    }
    return parts;
  }
}
