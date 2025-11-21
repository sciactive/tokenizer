import {
  LONG_REALISTIC_INPUT,
  LONG_REALISTIC_INPUT_DETAILED,
  LONG_REALISTIC_INPUT_TOKENS,
} from './testArtifacts.js';
import { Tokenizer } from './Tokenizer.js';

describe('Tokenizer', () => {
  it('tokenizes English', () => {
    const input = `This is an example string that contains some basic English text.`;

    const tokenizer = new Tokenizer();

    expect(tokenizer.tokenize(input)).toEqual([
      { token: -1997076268, position: 1, stem: true },
      { token: 1861000095, position: 1, stem: false },
      { token: -1631669591, position: 2, stem: false },
      { token: 1274017736, position: 3, stem: true },
      { token: -1896191362, position: 3, stem: false },
      { token: -1871088301, position: 4, stem: false },
      { token: 746783232, position: 5, stem: false },
      { token: 999008199, position: 6, stem: false },
    ]);
    expect(tokenizer.detailedTokenize(input)).toEqual({
      original: ['example', 'string', 'contains', 'basic', 'english', 'text'],
      stemmed: ['exampl', 'string', 'contain', 'basic', 'english', 'text'],
      tokens: [
        [
          { input: 'exampl', token: -1997076268, position: 1, stem: true },
          { input: 'example', token: 1861000095, position: 1, stem: false },
        ],
        [{ input: 'string', token: -1631669591, position: 2, stem: false }],
        [
          { input: 'contain', token: 1274017736, position: 3, stem: true },
          { input: 'contains', token: -1896191362, position: 3, stem: false },
        ],
        [{ input: 'basic', token: -1871088301, position: 4, stem: false }],
        [{ input: 'english', token: 746783232, position: 5, stem: false }],
        [{ input: 'text', token: 999008199, position: 6, stem: false }],
      ],
    });
  });

  it('tokenizes a domain name', () => {
    const input = `This is example.com`;

    const tokenizer = new Tokenizer();

    expect(tokenizer.tokenize(input)).toEqual([
      { token: 1861000095, position: 1, stem: true },
      { token: 1689700070, position: 1, stem: true },
      { token: -1225109831, position: 1, stem: false },
    ]);
    expect(tokenizer.detailedTokenize(input)).toEqual({
      original: ['example.com'],
      stemmed: ['example', 'com'],
      tokens: [
        [
          { input: 'example', token: 1861000095, position: 1, stem: true },
          { input: 'com', token: 1689700070, position: 1, stem: true },
          {
            input: 'example.com',
            token: -1225109831,
            position: 1,
            stem: false,
          },
        ],
      ],
    });
  });

  it('tokenizes some fancy stuff', () => {
    const input = `
For the past two years, I have been running around like a first-born chicken with its head cut off.
I ain't gonna take it no more!
I'm just trying to see Donny Benet!
The torsion, the disgrace, the admonition, the ammunctitude of it all!
I ran all over, and swam sometimes, and jumped and went everywhere.
Address: hperrin+myself@example.com
Website: https://example.com/ThisIsAURL/?querypart=SUCCESS%20MAN
And there you have it, papácita.
`;

    const tokenizer = new Tokenizer();

    expect(tokenizer.tokenize(input)).toEqual([
      { token: 1343504775, position: 1, stem: false },
      { token: 298486374, position: 2, stem: false },
      { token: -1149078729, position: 3, stem: true },
      { token: -1559697289, position: 3, stem: false },
      { token: 1349952704, position: 4, stem: true },
      { token: 790727023, position: 4, stem: false },
      { token: 1906729077, position: 5, stem: false },
      { token: -1402781517, position: 6, stem: false },
      { token: -1838027177, position: 7, stem: true },
      { token: 1155742626, position: 7, stem: true },
      { token: 805517113, position: 7, stem: false },
      { token: -2010726756, position: 8, stem: false },
      { token: -1477183844, position: 9, stem: false },
      { token: -1326410499, position: 10, stem: false },
      { token: 733764931, position: 11, stem: false },
      { token: 1022026391, position: 12, stem: true },
      { token: 134610293, position: 12, stem: true },
      { token: -340070397, position: 12, stem: false },
      { token: -1234660522, position: 13, stem: true },
      { token: -678964540, position: 13, stem: true },
      { token: 234310360, position: 13, stem: false },
      { token: 937258619, position: 14, stem: false },
      { token: 1739204639, position: 15, stem: false },
      { token: -1957498244, position: 16, stem: false },
      { token: 1956642256, position: 17, stem: false },
      { token: -1737897102, position: 18, stem: true },
      { token: -604311376, position: 18, stem: false },
      { token: -1935407826, position: 19, stem: false },
      { token: 1150072890, position: 20, stem: true },
      { token: 1497081950, position: 20, stem: false },
      { token: 612571372, position: 21, stem: false },
      { token: -1994858100, position: 22, stem: false },
      { token: 717580933, position: 23, stem: true },
      { token: 1914882207, position: 23, stem: false },
      { token: -2144271829, position: 24, stem: true },
      { token: -1478960717, position: 24, stem: false },
      { token: -1012739481, position: 25, stem: true },
      { token: 1020210291, position: 25, stem: false },
      { token: 2128114581, position: 26, stem: false },
      { token: -1258511527, position: 27, stem: false },
      { token: 1184229816, position: 28, stem: false },
      { token: 13635853, position: 29, stem: true },
      { token: 1329722356, position: 29, stem: false },
      { token: -1481439722, position: 30, stem: true },
      { token: -428368115, position: 30, stem: false },
      { token: 900120062, position: 31, stem: false },
      { token: 1900713806, position: 32, stem: true },
      { token: 1132546706, position: 32, stem: false },
      { token: 223244161, position: 33, stem: false },
      { token: -764108410, position: 34, stem: true },
      { token: 1861000095, position: 34, stem: true },
      { token: 1689700070, position: 34, stem: true },
      { token: -1225109831, position: 34, stem: true },
      { token: -326013665, position: 34, stem: false },
      { token: -755439443, position: 35, stem: true },
      { token: 1198480871, position: 35, stem: false },
      { token: 1056335270, position: 36, stem: true },
      { token: 1861000095, position: 36, stem: true },
      { token: 1689700070, position: 36, stem: true },
      { token: -1225109831, position: 36, stem: true },
      { token: -2142303079, position: 36, stem: true },
      { token: -87252393, position: 36, stem: false },
      { token: 1410168347, position: 37, stem: true },
      { token: 600520759, position: 37, stem: false },
    ]);
    expect(tokenizer.detailedTokenize(input)).toEqual({
      original: [
        'past',
        'two',
        'years',
        'running',
        'around',
        'like',
        'first-born',
        'chicken',
        'head',
        'cut',
        'off',
        "ain't",
        'gonna',
        'take',
        'no',
        'more',
        'just',
        'trying',
        'see',
        'donny',
        'benet',
        'torsion',
        'disgrace',
        'admonition',
        'ammunctitude',
        'ran',
        'over',
        'swam',
        'sometimes',
        'jumped',
        'went',
        'everywhere',
        'address',
        'hperrin+myself@example.com',
        'website',
        'https://example.com/thisisaurl/?querypart=success%20man',
        'papácita',
      ],
      stemmed: [
        'past',
        'two',
        'year',
        'run',
        'around',
        'like',
        'first',
        'born',
        'chicken',
        'head',
        'cut',
        'off',
        'is',
        'not',
        'go',
        'to',
        'take',
        'no',
        'more',
        'just',
        'try',
        'see',
        'donni',
        'benet',
        'torsion',
        'disgrac',
        'admonit',
        'ammunctitud',
        'ran',
        'over',
        'swam',
        'sometim',
        'jump',
        'went',
        'everywh',
        'address',
        'hperrin+myself@example.com',
        'websit',
        'https://example.com/thisisaurl/?querypart=success%20man',
        'papcita',
      ],
      tokens: [
        [{ input: 'past', token: 1343504775, position: 1, stem: false }],
        [{ input: 'two', token: 298486374, position: 2, stem: false }],
        [
          { input: 'year', token: -1149078729, position: 3, stem: true },
          { input: 'years', token: -1559697289, position: 3, stem: false },
        ],
        [
          { input: 'run', token: 1349952704, position: 4, stem: true },
          { input: 'running', token: 790727023, position: 4, stem: false },
        ],
        [{ input: 'around', token: 1906729077, position: 5, stem: false }],
        [{ input: 'like', token: -1402781517, position: 6, stem: false }],
        [
          { input: 'first', token: -1838027177, position: 7, stem: true },
          { input: 'born', token: 1155742626, position: 7, stem: true },
          { input: 'first-born', token: 805517113, position: 7, stem: false },
        ],
        [{ input: 'chicken', token: -2010726756, position: 8, stem: false }],
        [{ input: 'head', token: -1477183844, position: 9, stem: false }],
        [{ input: 'cut', token: -1326410499, position: 10, stem: false }],
        [{ input: 'off', token: 733764931, position: 11, stem: false }],
        [
          { input: 'is', token: 1022026391, position: 12, stem: true },
          { input: 'not', token: 134610293, position: 12, stem: true },
          { input: "ain't", token: -340070397, position: 12, stem: false },
        ],
        [
          { input: 'go', token: -1234660522, position: 13, stem: true },
          { input: 'to', token: -678964540, position: 13, stem: true },
          { input: 'gonna', token: 234310360, position: 13, stem: false },
        ],
        [{ input: 'take', token: 937258619, position: 14, stem: false }],
        [{ input: 'no', token: 1739204639, position: 15, stem: false }],
        [{ input: 'more', token: -1957498244, position: 16, stem: false }],
        [{ input: 'just', token: 1956642256, position: 17, stem: false }],
        [
          { input: 'try', token: -1737897102, position: 18, stem: true },
          { input: 'trying', token: -604311376, position: 18, stem: false },
        ],
        [{ input: 'see', token: -1935407826, position: 19, stem: false }],
        [
          { input: 'donni', token: 1150072890, position: 20, stem: true },
          { input: 'donny', token: 1497081950, position: 20, stem: false },
        ],
        [{ input: 'benet', token: 612571372, position: 21, stem: false }],
        [{ input: 'torsion', token: -1994858100, position: 22, stem: false }],
        [
          { input: 'disgrac', token: 717580933, position: 23, stem: true },
          { input: 'disgrace', token: 1914882207, position: 23, stem: false },
        ],
        [
          { input: 'admonit', token: -2144271829, position: 24, stem: true },
          {
            input: 'admonition',
            token: -1478960717,
            position: 24,
            stem: false,
          },
        ],
        [
          {
            input: 'ammunctitud',
            token: -1012739481,
            position: 25,
            stem: true,
          },
          {
            input: 'ammunctitude',
            token: 1020210291,
            position: 25,
            stem: false,
          },
        ],
        [{ input: 'ran', token: 2128114581, position: 26, stem: false }],
        [{ input: 'over', token: -1258511527, position: 27, stem: false }],
        [{ input: 'swam', token: 1184229816, position: 28, stem: false }],
        [
          { input: 'sometim', token: 13635853, position: 29, stem: true },
          { input: 'sometimes', token: 1329722356, position: 29, stem: false },
        ],
        [
          { input: 'jump', token: -1481439722, position: 30, stem: true },
          { input: 'jumped', token: -428368115, position: 30, stem: false },
        ],
        [{ input: 'went', token: 900120062, position: 31, stem: false }],
        [
          { input: 'everywh', token: 1900713806, position: 32, stem: true },
          { input: 'everywhere', token: 1132546706, position: 32, stem: false },
        ],
        [{ input: 'address', token: 223244161, position: 33, stem: false }],
        [
          {
            input: 'hperrin+myself',
            token: -764108410,
            position: 34,
            stem: true,
          },
          { input: 'example', token: 1861000095, position: 34, stem: true },
          { input: 'com', token: 1689700070, position: 34, stem: true },
          {
            input: 'example.com',
            token: -1225109831,
            position: 34,
            stem: true,
          },
          {
            input: 'hperrin+myself@example.com',
            token: -326013665,
            position: 34,
            stem: false,
          },
        ],
        [
          { input: 'websit', token: -755439443, position: 35, stem: true },
          { input: 'website', token: 1198480871, position: 35, stem: false },
        ],
        [
          { input: 'https', token: 1056335270, position: 36, stem: true },
          { input: 'example', token: 1861000095, position: 36, stem: true },
          { input: 'com', token: 1689700070, position: 36, stem: true },
          {
            input: 'example.com',
            token: -1225109831,
            position: 36,
            stem: true,
          },
          {
            input: 'thisisaurl/?querypart=success%20man',
            token: -2142303079,
            position: 36,
            stem: true,
          },
          {
            input: 'https://example.com/thisisaurl/?querypart=success%20man',
            token: -87252393,
            position: 36,
            stem: false,
          },
        ],
        [
          { input: 'papcita', token: 1410168347, position: 37, stem: true },
          { input: 'papácita', token: 600520759, position: 37, stem: false },
        ],
      ],
    });
  });

  it('takes a stop word list', () => {
    const input = `This is an example string that contains some basic English text.`;

    const tokenizer = new Tokenizer({
      stopWords: { english: 1, example: 1, text: 1 },
    });

    expect(tokenizer.tokenize(input)).toEqual([
      { token: 905126349, position: 1, stem: true },
      { token: -17923545, position: 1, stem: false },
      { token: 1022026391, position: 2, stem: false },
      { token: -1758133178, position: 3, stem: false },
      { token: -1631669591, position: 4, stem: false },
      { token: -1470915188, position: 5, stem: false },
      { token: 1274017736, position: 6, stem: true },
      { token: -1896191362, position: 6, stem: false },
      { token: -154215346, position: 7, stem: false },
      { token: -1871088301, position: 8, stem: false },
    ]);
    expect(tokenizer.detailedTokenize(input)).toEqual({
      original: [
        'this',
        'is',
        'an',
        'string',
        'that',
        'contains',
        'some',
        'basic',
      ],
      stemmed: [
        'thi',
        'is',
        'an',
        'string',
        'that',
        'contain',
        'some',
        'basic',
      ],
      tokens: [
        [
          { input: 'thi', token: 905126349, position: 1, stem: true },
          { input: 'this', token: -17923545, position: 1, stem: false },
        ],
        [{ input: 'is', token: 1022026391, position: 2, stem: false }],
        [{ input: 'an', token: -1758133178, position: 3, stem: false }],
        [{ input: 'string', token: -1631669591, position: 4, stem: false }],
        [{ input: 'that', token: -1470915188, position: 5, stem: false }],
        [
          { input: 'contain', token: 1274017736, position: 6, stem: true },
          { input: 'contains', token: -1896191362, position: 6, stem: false },
        ],
        [{ input: 'some', token: -154215346, position: 7, stem: false }],
        [{ input: 'basic', token: -1871088301, position: 8, stem: false }],
      ],
    });
  });

  it('uses a different stemming algorithm', () => {
    const input = `This is an example string that contains some basic English text.`;

    const tokenizer = new Tokenizer({
      stemmingAlgorithm: 'lancaster',
    });

    expect(tokenizer.tokenize(input)).toEqual([
      { token: -1997076268, position: 1, stem: true },
      { token: 1861000095, position: 1, stem: false },
      { token: -1631669591, position: 2, stem: false },
      { token: 1274017736, position: 3, stem: true },
      { token: -1896191362, position: 3, stem: false },
      { token: 33078332, position: 4, stem: true },
      { token: -1871088301, position: 4, stem: false },
      { token: 21884436, position: 5, stem: true },
      { token: 746783232, position: 5, stem: false },
      { token: 999008199, position: 6, stem: false },
    ]);
    expect(tokenizer.detailedTokenize(input)).toEqual({
      original: ['example', 'string', 'contains', 'basic', 'english', 'text'],
      stemmed: ['exampl', 'string', 'contain', 'bas', 'engl', 'text'],
      tokens: [
        [
          { input: 'exampl', token: -1997076268, position: 1, stem: true },
          { input: 'example', token: 1861000095, position: 1, stem: false },
        ],
        [{ input: 'string', token: -1631669591, position: 2, stem: false }],
        [
          { input: 'contain', token: 1274017736, position: 3, stem: true },
          { input: 'contains', token: -1896191362, position: 3, stem: false },
        ],
        [
          { input: 'bas', token: 33078332, position: 4, stem: true },
          { input: 'basic', token: -1871088301, position: 4, stem: false },
        ],
        [
          { input: 'engl', token: 21884436, position: 5, stem: true },
          { input: 'english', token: 746783232, position: 5, stem: false },
        ],
        [{ input: 'text', token: 999008199, position: 6, stem: false }],
      ],
    });
  });

  it('tokenizes French', () => {
    const input = `J'ai envie de Taco Bell. Je vais aller en voiture au restaurant et acheter toute la nourriture.`;

    const tokenizer = new Tokenizer({
      language: 'fra',
      stemmingAlgorithm: 'snowball',
      stopWords: Tokenizer.getLanguageStopWords('fra'),
    });

    expect(tokenizer.tokenize(input)).toEqual([
      { token: -225897218, position: 1, stem: true },
      { token: 5577476, position: 1, stem: false },
      { token: 587086219, position: 2, stem: true },
      { token: -1785536821, position: 2, stem: false },
      { token: 533794157, position: 3, stem: false },
      { token: -392399667, position: 4, stem: true },
      { token: 1933303943, position: 4, stem: false },
      { token: 1530294563, position: 5, stem: false },
      { token: -187933459, position: 6, stem: false },
      { token: -1907471803, position: 7, stem: true },
      { token: -371031793, position: 7, stem: false },
      { token: 1104876021, position: 8, stem: true },
      { token: -342552001, position: 8, stem: false },
      { token: 1120223570, position: 9, stem: true },
      { token: 1846448408, position: 9, stem: false },
      { token: -2085462948, position: 10, stem: true },
      { token: -1920674343, position: 10, stem: false },
      { token: -111216192, position: 11, stem: true },
      { token: 1950869011, position: 11, stem: false },
    ]);
    expect(tokenizer.detailedTokenize(input)).toEqual({
      original: [
        "j'ai",
        'envie',
        'taco',
        'bell',
        'vais',
        'aller',
        'voiture',
        'restaurant',
        'acheter',
        'toute',
        'nourriture',
      ],
      stemmed: [
        'jai',
        'envi',
        'taco',
        'bel',
        'vais',
        'aller',
        'voitur',
        'restaur',
        'achet',
        'tout',
        'nourritur',
      ],
      tokens: [
        [
          { input: 'jai', token: -225897218, position: 1, stem: true },
          { input: "j'ai", token: 5577476, position: 1, stem: false },
        ],
        [
          { input: 'envi', token: 587086219, position: 2, stem: true },
          { input: 'envie', token: -1785536821, position: 2, stem: false },
        ],
        [{ input: 'taco', token: 533794157, position: 3, stem: false }],
        [
          { input: 'bel', token: -392399667, position: 4, stem: true },
          { input: 'bell', token: 1933303943, position: 4, stem: false },
        ],
        [{ input: 'vais', token: 1530294563, position: 5, stem: false }],
        [{ input: 'aller', token: -187933459, position: 6, stem: false }],
        [
          { input: 'voitur', token: -1907471803, position: 7, stem: true },
          { input: 'voiture', token: -371031793, position: 7, stem: false },
        ],
        [
          { input: 'restaur', token: 1104876021, position: 8, stem: true },
          { input: 'restaurant', token: -342552001, position: 8, stem: false },
        ],
        [
          { input: 'achet', token: 1120223570, position: 9, stem: true },
          { input: 'acheter', token: 1846448408, position: 9, stem: false },
        ],
        [
          { input: 'tout', token: -2085462948, position: 10, stem: true },
          { input: 'toute', token: -1920674343, position: 10, stem: false },
        ],
        [
          { input: 'nourritur', token: -111216192, position: 11, stem: true },
          { input: 'nourriture', token: 1950869011, position: 11, stem: false },
        ],
      ],
    });
  });

  it('tokenizes long realistic input', () => {
    const input = LONG_REALISTIC_INPUT;

    const tokenizer = new Tokenizer();

    expect(tokenizer.tokenize(input)).toEqual(LONG_REALISTIC_INPUT_TOKENS);
    expect(tokenizer.detailedTokenize(input)).toEqual(
      LONG_REALISTIC_INPUT_DETAILED,
    );
  });

  it('parses simple search queries', () => {
    let input = 'delicious strawberries';

    const tokenizer = new Tokenizer();

    expect(tokenizer.parseSearchQuery(input)).toEqual([
      { type: 'token', input: 'delici', token: 1060982110, nostemmed: false },
      {
        type: 'token',
        input: 'strawberri',
        token: 389051739,
        nostemmed: false,
      },
    ]);

    input = '"delicious" -"strawberries"';

    expect(tokenizer.parseSearchQuery(input)).toEqual([
      { type: 'token', input: 'delicious', token: 1544783590, nostemmed: true },
      {
        type: 'not',
        operand: {
          type: 'token',
          input: 'strawberries',
          token: -377504889,
          nostemmed: true,
        },
      },
    ]);

    input = 'delicious or strawberries';

    expect(tokenizer.parseSearchQuery(input)).toEqual([
      {
        type: 'or',
        operands: [
          {
            type: 'token',
            input: 'delici',
            token: 1060982110,
            nostemmed: false,
          },
          {
            type: 'token',
            input: 'strawberri',
            token: 389051739,
            nostemmed: false,
          },
        ],
      },
    ]);

    input = 'delicious or strawberries or blueberries';

    expect(tokenizer.parseSearchQuery(input)).toEqual([
      {
        type: 'or',
        operands: [
          {
            type: 'token',
            input: 'delici',
            token: 1060982110,
            nostemmed: false,
          },
          {
            type: 'token',
            input: 'strawberri',
            token: 389051739,
            nostemmed: false,
          },
          {
            type: 'token',
            input: 'blueberri',
            token: 1688810679,
            nostemmed: false,
          },
        ],
      },
    ]);

    input = '-delicious or strawberries';

    expect(tokenizer.parseSearchQuery(input)).toEqual([
      {
        type: 'or',
        operands: [
          {
            type: 'not',
            operand: {
              type: 'token',
              input: 'delici',
              token: 1060982110,
              nostemmed: false,
            },
          },
          {
            type: 'token',
            input: 'strawberri',
            token: 389051739,
            nostemmed: false,
          },
        ],
      },
    ]);

    input = "'from example.com'";

    expect(tokenizer.parseSearchQuery(input)).toEqual([
      {
        type: 'token',
        input: 'example.com',
        token: -1225109831,
        nostemmed: false,
      },
    ]);

    input = "'from example.com to example.net'";

    expect(tokenizer.parseSearchQuery(input)).toEqual([
      {
        type: 'series',
        tokens: [
          { input: 'example.com', token: -1225109831, nostemmed: false },
          { input: 'example.net', token: 547790240, nostemmed: false },
        ],
      },
    ]);

    input = 'this is another example of a search string';

    expect(tokenizer.parseSearchQuery(input)).toEqual([
      { type: 'token', input: 'anoth', token: -231149483, nostemmed: false },
      { type: 'token', input: 'exampl', token: -1997076268, nostemmed: false },
      { type: 'token', input: 'search', token: -1259283545, nostemmed: false },
      { type: 'token', input: 'string', token: -1631669591, nostemmed: false },
    ]);
  });
});
