# @sciactive/tokenizer - Tokenizer for Natural Language Processing

Tokenize string input into 32-bit integers (for full text search and natural language processing).

It works by removing stop words, normalizing text, stemming each word, then tokenizing both the original and the stemmed version of the word. It returns the tokens, along with their position in the text (1 indexed), and whether the token is a stemmed version. Stemmed versions will have the same position as their unstemmed counterparts.

For email addresses, it will provide the username part and the domain part as stemmed tokens, then the whole address as an unstemmed token.

For URLs, it will provide the protocol, domain, and path as stemmed tokens, then the whole address as an unstemmed token.

## Usage

```ts
import { Tokenizer } from '@sciactive/tokenizer';

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
//       {
//         input: 'natur',
//         token: -603851912,
//         position: 1,
//         stem: true
//       },
//       {
//         input: 'natural',
//         token: -1167464141,
//         position: 1,
//         stem: false
//       }
//     ],
//     [
//       {
//         input: 'languag',
//         token: 1865099040,
//         position: 2,
//         stem: true
//       },
//       {
//         input: 'language',
//         token: -723816011,
//         position: 2,
//         stem: false
//       }
//     ],
//     [
//       {
//         input: 'string',
//         token: -1631669591,
//         position: 3,
//         stem: false
//       }
//     ],
//     [
//       {
//         input: 'input',
//         token: -668454185,
//         position: 4,
//         stem: false
//       }
//     ],
//     [
//       {
//         input: 'goe',
//         token: 1835329032,
//         position: 5,
//         stem: true
//       },
//       { input: 'goes', token: 364389343, position: 5, stem: false }
//     ],
//     [
//       {
//         input: 'here',
//         token: -1323595880,
//         position: 6,
//         stem: false
//       }
//     ]
//   ]
// }
```

## Options

The config object includes the following options:

- `stopWords`: The stop word set. Defaults to the `sciactive` set.
- `stemmingAlgorithm`: The stemming algorithm to use. Defaults to `'porter'`.

## `tokenize`

This function returns a simplified output of just each token, its position, and whether it is a stemmed version.

## `detailedTokenize`

This function gives more detail, including the original tokens, the stemmed versions, and an array of the sets of tokens. Each set will include the unstemmed version in the last position, and any stemmed versions before it.

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
