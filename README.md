# @sciactive/tokenizer - Tokenizer for Natural Language Processing

Tokenize string input into 32-bit integers (for full text search and natural language processing).

It works by removing stop words, normalizing text, stemming each word, then tokenizing both the original and the stemmed version of the word. It returns the tokens, along with their position in the text (1 indexed), and whether the token is a stemmed version. Stemmed versions will have the same position as their unstemmed counterparts.

For email addresses, it will provide the username, domain parts, and the whole domain as stemmed tokens, then the whole address as an unstemmed token.

For URLs, it will provide the protocol, domain parts, whole domain, and path as stemmed tokens, then the whole address as an unstemmed token.

SciActive Tokenizer also includes a search query parser that supports double quotes for exact (unstemmed) sequential matches, single quotes for sequential matches, "or" as an or operator, and "-" as a not operator.

It also offers a `searchString` function that takes a search query and an input string, and returns true if the search query matches the input string.

## Usage

```ts
import { Tokenizer } from '@sciactive/tokenizer';

//
// Tokenizing text to go into an index.
//

const input = 'A natural language string input goes here.';

const tokenizer = new Tokenizer(/* Optional config object can go here. */);

const tokens = tokenizer.tokenize(input);
// [
//   { token: -603851912, position: 1, stem: true },
//   { token: -1167464141, position: 1, stem: false },
//   { token: 1865099040, position: 2, stem: true },
//   { token: -723816011, position: 2, stem: false },
//   { token: -1631669591, position: 3, stem: false },
//   { token: -668454185, position: 4, stem: false },
//   { token: 1835329032, position: 5, stem: true },
//   { token: 364389343, position: 5, stem: false },
//   { token: -1323595880, position: 6, stem: false }
// ]

const detailed = tokenizer.detailedTokenize(input);
// {
//   original: [ 'natural', 'language', 'string', 'input', 'goes', 'here' ],
//   stemmed: [ 'natur', 'languag', 'string', 'input', 'goe', 'here' ],
//   tokens: [
//     [
//       { input: 'natur', token: -603851912, position: 1, stem: true },
//       { input: 'natural', token: -1167464141, position: 1, stem: false }
//     ],
//     [
//       { input: 'languag', token: 1865099040, position: 2, stem: true },
//       { input: 'language', token: -723816011, position: 2, stem: false }
//     ],
//     [
//       { input: 'string', token: -1631669591, position: 3, stem: false }
//     ],
//     [
//       { input: 'input', token: -668454185, position: 4, stem: false }
//     ],
//     [
//       { input: 'goe', token: 1835329032, position: 5, stem: true },
//       { input: 'goes', token: 364389343, position: 5, stem: false }
//     ],
//     [
//       { input: 'here', token: -1323595880, position: 6, stem: false }
//     ]
//   ]
// }

//
// Parsing a query to search the index.
//

const query = 'this is an example of a search string';

const parsedQuery = tokenizer.parseSearchQuery(query);
// [
//   { type: 'token', input: 'exampl', token: -1997076268, nostemmed: false },
//   { type: 'token', input: 'search', token: -1259283545, nostemmed: false },
//   { type: 'token', input: 'string', token: -1631669591, nostemmed: false },
// ]

const query2 = "'from example.com to example.net'";

const parsedQuery2 = tokenizer.parseSearchQuery(query2);
// [
//   {
//     type: 'series',
//     tokens: [
//       {
//         type: 'token',
//         input: 'example.com',
//         token: -1225109831,
//         nostemmed: false,
//       },
//       {
//         type: 'token',
//         input: 'example.net',
//         token: 547790240,
//         nostemmed: false,
//       },
//     ],
//   },
// ]

const query3 = '"delicious" -"strawberries"';

const parsedQuery3 = tokenizer.parseSearchQuery(query3);
// [
//   { type: 'token', input: 'delicious', token: 1544783590, nostemmed: true },
//   {
//     type: 'not',
//     operand: {
//       type: 'token',
//       input: 'strawberries',
//       token: -377504889,
//       nostemmed: true,
//     },
//   },
// ]

const query4 = 'delicious or strawberries or blueberries';

const parsedQuery4 = tokenizer.parseSearchQuery(query4);
// [
//   {
//     type: 'or',
//     operands: [
//       {
//         type: 'token',
//         input: 'delici',
//         token: 1060982110,
//         nostemmed: false,
//       },
//       {
//         type: 'token',
//         input: 'strawberri',
//         token: 389051739,
//         nostemmed: false,
//       },
//       {
//         type: 'token',
//         input: 'blueberri',
//         token: 1688810679,
//         nostemmed: false,
//       },
//     ],
//   },
// ]

//
// Searching a string with a query.
//

tokenizer.searchString('red', 'the big red ball rolls down the driveway');
// true

tokenizer.searchString('blue', 'the big red ball rolls down the driveway');
// false

tokenizer.searchString(
  'red or blue',
  'the big red ball rolls down the driveway',
);
// true

tokenizer.searchString('-blue', 'the big red ball rolls down the driveway');
// true

tokenizer.searchString(
  'big red ball',
  'the big red ball rolls down the driveway',
);
// true

tokenizer.searchString(
  'big red driveway',
  'the big red ball rolls down the driveway',
);
// true

tokenizer.searchString(
  '"big red driveway"',
  'the big red ball rolls down the driveway',
);
// false

tokenizer.searchString(
  '"big red ball"',
  'the big red ball rolls down the driveway',
);
// true

tokenizer.searchString(
  '"big red balls"',
  'the big red ball rolls down the driveway',
);
// false

tokenizer.searchString(
  "'big red balls'",
  'the big red ball rolls down the driveway',
);
// true

tokenizer.searchString(
  "'red big ball'",
  'the big red ball rolls down the driveway',
);
// false
```

## Options

The config object includes the following options:

- `stopWords`: The stop word list. Defaults to the `sciactive` list.
- `language`: A language from `listLanguages()`. Defaults to `'eng'`.
- `stemmingAlgorithm`: A stemming algorithm from `listStemmingAlgorithms(language)`. Defaults to `'porter'`.

## `tokenize`

This function returns a simplified output of just each token, its position, and whether it is a stemmed version.

## `detailedTokenize`

This function gives more detail, including the original tokens, the stemmed versions, and an array of the sets of tokens. Each set will include the unstemmed version in the last position, and any stemmed versions before it.

## Other Languages

To use the tokenizer for other languages, you can use the static functions to see what other languages and stemming algorithms are available and get the stop list for a language. Don't forget to set the stop word list for the language you're using.

Note that the stop word list for English returned by `getLanguageStopWords('eng')` is much longer than the default stop word list (the `sciactive` list).

```ts
import { Tokenizer } from '@sciactive/tokenizer';

// Get the available languages and features for your language.
const supportedLanguages = Tokenizer.listLanguages();
const frenchStemmingAlgorithms = Tokenizer.listStemmingAlgorithms('fra');
const frenchStopWordList = Tokenizer.getLanguageStopWords('fra');

// You must set all of `language`, `stemmingAlgorithm`, and `stopWords` for non-English support.
const tokenizer = new Tokenizer({
  language: 'fra',
  stemmingAlgorithm: 'snowball',
  stopWords: Tokenizer.getLanguageStopWords('fra'),
});

const tokens = tokenizer.tokenize(
  `J'ai envie de Taco Bell. Je vais aller en voiture au restaurant et acheter toute la nourriture.`,
);

// Original: j'ai envie taco bell vais aller voiture restaurant acheter toute nourriture
// Stemmed: jai envi taco bel vais aller voitur restaur achet tout nourritur
```

# License

Copyright 2025 SciActive Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
