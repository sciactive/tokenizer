# @sciactive/tokenizer - Tokenizer for Natural Language Processing

Tokenize string input into 32-bit integers (for full text search and natural language processing).

It works by removing stop words, normalizing text, stemming each word, then tokenizing both the original and the stemmed version of the word. It returns the tokens, along with their position in the text (1 indexed), and whether the token was verbatim (not a stemmed version).

## Usage

```ts
import { Tokenizer } from '@sciactive/tokenizer';

const input = 'A natural language string input goes here.';

const tokenizer = new Tokenizer(/* Optional config object can go here. */);

const tokens = tokenizer.tokenize(input);
// [
//   { token: -603851912, position: 1, verbatim: false },
//   { token: -1167464141, position: 1, verbatim: true },
//   { token: 1865099040, position: 2, verbatim: false },
//   { token: -723816011, position: 2, verbatim: true },
//   { token: -1631669591, position: 3, verbatim: true },
//   { token: -668454185, position: 4, verbatim: true },
//   { token: 1835329032, position: 5, verbatim: false },
//   { token: 364389343, position: 5, verbatim: true },
//   { token: -1323595880, position: 6, verbatim: true }
// ]

const detailed = tokenizer.detailedTokenize(input);
// {
//   original: [ 'natural', 'language', 'string', 'input', 'goes', 'here' ],
//   stemmed: [ 'natur', 'languag', 'string', 'input', 'goe', 'here' ],
//   tokens: [
//     [
//       {
//         _input: 'natur',
//         token: -603851912,
//         position: 1,
//         verbatim: false
//       },
//       {
//         _input: 'natural',
//         token: -1167464141,
//         position: 1,
//         verbatim: true
//       }
//     ],
//     [
//       {
//         _input: 'languag',
//         token: 1865099040,
//         position: 2,
//         verbatim: false
//       },
//       {
//         _input: 'language',
//         token: -723816011,
//         position: 2,
//         verbatim: true
//       }
//     ],
//     [
//       {
//         _input: 'string',
//         token: -1631669591,
//         position: 3,
//         verbatim: true
//       }
//     ],
//     [
//       {
//         _input: 'input',
//         token: -668454185,
//         position: 4,
//         verbatim: true
//       }
//     ],
//     [
//       {
//         _input: 'goe',
//         token: 1835329032,
//         position: 5,
//         verbatim: false
//       },
//       { _input: 'goes', token: 364389343, position: 5, verbatim: true }
//     ],
//     [
//       {
//         _input: 'here',
//         token: -1323595880,
//         position: 6,
//         verbatim: true
//       }
//     ]
//   ]
// }
```

## Options

## `tokenize`

## `detailedTokenize`

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
