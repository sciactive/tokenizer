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
          {
            input: 'contains',
            token: -1896191362,
            position: 3,
            stem: false,
          },
        ],
        [{ input: 'basic', token: -1871088301, position: 4, stem: false }],
        [{ input: 'english', token: 746783232, position: 5, stem: false }],
        [{ input: 'text', token: 999008199, position: 6, stem: false }],
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
      { token: -1225109831, position: 34, stem: true },
      { token: -326013665, position: 34, stem: false },
      { token: -755439443, position: 35, stem: true },
      { token: 1198480871, position: 35, stem: false },
      { token: 1056335270, position: 36, stem: true },
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
          {
            input: 'first-born',
            token: 805517113,
            position: 7,
            stem: false,
          },
        ],
        [
          {
            input: 'chicken',
            token: -2010726756,
            position: 8,
            stem: false,
          },
        ],
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
        [
          {
            input: 'torsion',
            token: -1994858100,
            position: 22,
            stem: false,
          },
        ],
        [
          { input: 'disgrac', token: 717580933, position: 23, stem: true },
          {
            input: 'disgrace',
            token: 1914882207,
            position: 23,
            stem: false,
          },
        ],
        [
          {
            input: 'admonit',
            token: -2144271829,
            position: 24,
            stem: true,
          },
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
          {
            input: 'sometimes',
            token: 1329722356,
            position: 29,
            stem: false,
          },
        ],
        [
          { input: 'jump', token: -1481439722, position: 30, stem: true },
          { input: 'jumped', token: -428368115, position: 30, stem: false },
        ],
        [{ input: 'went', token: 900120062, position: 31, stem: false }],
        [
          { input: 'everywh', token: 1900713806, position: 32, stem: true },
          {
            input: 'everywhere',
            token: 1132546706,
            position: 32,
            stem: false,
          },
        ],
        [{ input: 'address', token: 223244161, position: 33, stem: false }],
        [
          {
            input: 'hperrin+myself',
            token: -764108410,
            position: 34,
            stem: true,
          },
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
          {
            input: 'website',
            token: 1198480871,
            position: 35,
            stem: false,
          },
        ],
        [
          { input: 'https', token: 1056335270, position: 36, stem: true },
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
          {
            input: 'papácita',
            token: 600520759,
            position: 37,
            stem: false,
          },
        ],
      ],
    });
  });

  it('takes a stop word list', () => {
    const input = `This is an example string that contains some basic English text.`;

    const tokenizer = new Tokenizer({
      stopWords: {
        english: 1,
        example: 1,
        text: 1,
      },
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
          {
            input: 'contains',
            token: -1896191362,
            position: 6,
            stem: false,
          },
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
          {
            input: 'contains',
            token: -1896191362,
            position: 3,
            stem: false,
          },
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
          {
            input: 'restaurant',
            token: -342552001,
            position: 8,
            stem: false,
          },
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
          {
            input: 'nourritur',
            token: -111216192,
            position: 11,
            stem: true,
          },
          {
            input: 'nourriture',
            token: 1950869011,
            position: 11,
            stem: false,
          },
        ],
      ],
    });
  });

  it('tokenizes long realistic input', () => {
    const input = `
Thank you for your purchase, Hunter!
  
Order Number:   NEOF8H4Y6F7
  
Date of Purchase:   Sun Oct 19, 2025
  ALL SALES ARE FINAL.
  
ORDER SUMMARY

  

  Belly Up & Casbah Present
Donny Benet

Sun Mar 8, 2026
8:00 PM (Doors @ 7:00 PM)
(Time displayed is local to the venue)

AGE: 21+

  
  Music Box 
1337 India Street
San Diego, CA 92101
  
Venue Directions [http://email.t.ticketweb.com/c/14e9fff1-0cb6-419e-a998-6188a46d17fc India Street,San Diego,CA,92101]

  
2    General Admission Standing - Day of Show
General Admission  $32.00
  $64.00
  

2    Addl. Item - The Backstage Lounge + Cocktail  $40.00
  $80.00
  


DELIVERY TYPE: TicketFast
.
This is your receipt, not your tickets.
When your tickets are ready, you will be sent another email with
your tickets attached as PDFs.
. 
Note:
Additionally, please check your "spam" or "junk mail" mailbox as
the email may have been misclassified.
.

  

ADDITIONAL INFO:
In addition to TicketWeb's Privacy Policy, the following Privacy
Policy exists for this event:
We do not share text messaging opt-in data or consent information
with third parties, except when necessary to provide the messaging
services (such as with aggregators or service providers).



  

Paid with:
  
Visa: xxxx-4696
  Subtotal
  
Service Fee
  
Delivery Fee
  
Total Payment
  $144.00
  
$18.60
  
$0.00
  
$162.60
  

Please note: while we know you are excited, rest assured your ticket(s) will
be dispatched closer to the event date. Additionally, please check
your "Spam" or "Junk" mailbox as the email containing your tickets
may have been misclassified.

  

This email confirms your purchase; you will receive a separate
email with your tickets.
  
If you have chosen to have tickets delivered to you and have not
received your tickets 48 HOURS BEFORE THE EVENT, please contact us
immediately.
Assistance with your order is available by emailing info@example.com [mailto:info@example.com]
Thank you for choosing TicketWeb. [http://email.t.ticketweb.com/c/14e9fff1-0cb6-419e-a998-6188a46d17fc]

`;

    const tokenizer = new Tokenizer();

    expect(tokenizer.tokenize(input)).toEqual([
      {
        token: 1558786320,
        position: 1,
        stem: false,
      },
      {
        token: -1732566604,
        position: 2,
        stem: false,
      },
      {
        token: -1746637102,
        position: 3,
        stem: true,
      },
      {
        token: 1628950843,
        position: 3,
        stem: false,
      },
      {
        token: 1255640165,
        position: 4,
        stem: false,
      },
      {
        token: -181824616,
        position: 5,
        stem: false,
      },
      {
        token: -1768939692,
        position: 6,
        stem: false,
      },
      {
        token: 1576289265,
        position: 7,
        stem: false,
      },
      {
        token: -1432471686,
        position: 8,
        stem: false,
      },
      {
        token: -1746637102,
        position: 9,
        stem: true,
      },
      {
        token: 1628950843,
        position: 9,
        stem: false,
      },
      {
        token: 1370803959,
        position: 10,
        stem: false,
      },
      {
        token: -1519200178,
        position: 11,
        stem: false,
      },
      {
        token: -662594235,
        position: 12,
        stem: false,
      },
      {
        token: -456221964,
        position: 13,
        stem: false,
      },
      {
        token: 1803644996,
        position: 14,
        stem: false,
      },
      {
        token: -321561402,
        position: 15,
        stem: false,
      },
      {
        token: -181824616,
        position: 16,
        stem: false,
      },
      {
        token: -836213149,
        position: 17,
        stem: false,
      },
      {
        token: -1782375662,
        position: 18,
        stem: true,
      },
      {
        token: -2005660810,
        position: 18,
        stem: false,
      },
      {
        token: 1133833840,
        position: 19,
        stem: false,
      },
      {
        token: -1767497446,
        position: 20,
        stem: false,
      },
      {
        token: -37966313,
        position: 21,
        stem: false,
      },
      {
        token: 1150072890,
        position: 22,
        stem: true,
      },
      {
        token: 1497081950,
        position: 22,
        stem: false,
      },
      {
        token: 612571372,
        position: 23,
        stem: false,
      },
      {
        token: 1370803959,
        position: 24,
        stem: false,
      },
      {
        token: 2107886487,
        position: 25,
        stem: false,
      },
      {
        token: -100641005,
        position: 26,
        stem: false,
      },
      {
        token: 2110245710,
        position: 27,
        stem: false,
      },
      {
        token: 749103973,
        position: 28,
        stem: true,
      },
      {
        token: -994547381,
        position: 28,
        stem: false,
      },
      {
        token: 1575319276,
        position: 29,
        stem: false,
      },
      {
        token: -1964682195,
        position: 30,
        stem: true,
      },
      {
        token: 1583052330,
        position: 30,
        stem: false,
      },
      {
        token: 670706776,
        position: 31,
        stem: true,
      },
      {
        token: -1663338211,
        position: 31,
        stem: false,
      },
      {
        token: 1575319276,
        position: 32,
        stem: false,
      },
      {
        token: 1872009285,
        position: 33,
        stem: false,
      },
      {
        token: 291922631,
        position: 34,
        stem: true,
      },
      {
        token: 682482615,
        position: 34,
        stem: false,
      },
      {
        token: -1948874520,
        position: 35,
        stem: false,
      },
      {
        token: -98702835,
        position: 36,
        stem: true,
      },
      {
        token: -1852761331,
        position: 36,
        stem: false,
      },
      {
        token: -1590685518,
        position: 37,
        stem: false,
      },
      {
        token: -42514764,
        position: 38,
        stem: true,
      },
      {
        token: -1303439842,
        position: 38,
        stem: false,
      },
      {
        token: -850255286,
        position: 39,
        stem: false,
      },
      {
        token: 145311802,
        position: 40,
        stem: false,
      },
      {
        token: 53009198,
        position: 41,
        stem: false,
      },
      {
        token: 1219330253,
        position: 42,
        stem: false,
      },
      {
        token: -252783656,
        position: 43,
        stem: false,
      },
      {
        token: 2132416930,
        position: 44,
        stem: false,
      },
      {
        token: 1427314299,
        position: 45,
        stem: false,
      },
      {
        token: 901544789,
        position: 46,
        stem: false,
      },
      {
        token: -1694456658,
        position: 47,
        stem: false,
      },
      {
        token: -98702835,
        position: 48,
        stem: true,
      },
      {
        token: -1852761331,
        position: 48,
        stem: false,
      },
      {
        token: 538383694,
        position: 49,
        stem: true,
      },
      {
        token: 1230530540,
        position: 49,
        stem: false,
      },
      {
        token: -1753739854,
        position: 50,
        stem: true,
      },
      {
        token: -1776963108,
        position: 50,
        stem: true,
      },
      {
        token: 1040107793,
        position: 50,
        stem: true,
      },
      {
        token: -493100521,
        position: 50,
        stem: false,
      },
      {
        token: 1219330253,
        position: 51,
        stem: false,
      },
      {
        token: -252783656,
        position: 52,
        stem: false,
      },
      {
        token: 2132416930,
        position: 53,
        stem: false,
      },
      {
        token: 1427314299,
        position: 54,
        stem: false,
      },
      {
        token: 901544789,
        position: 55,
        stem: false,
      },
      {
        token: -1694456658,
        position: 56,
        stem: false,
      },
      {
        token: 450215437,
        position: 57,
        stem: false,
      },
      {
        token: 83899049,
        position: 58,
        stem: true,
      },
      {
        token: -836159926,
        position: 58,
        stem: false,
      },
      {
        token: -189070774,
        position: 59,
        stem: false,
      },
      {
        token: 1689852086,
        position: 60,
        stem: true,
      },
      {
        token: 1637518040,
        position: 60,
        stem: false,
      },
      {
        token: -132695564,
        position: 61,
        stem: true,
      },
      {
        token: -442488432,
        position: 61,
        stem: false,
      },
      {
        token: 839833857,
        position: 62,
        stem: false,
      },
      {
        token: 83899049,
        position: 63,
        stem: true,
      },
      {
        token: -836159926,
        position: 63,
        stem: false,
      },
      {
        token: -189070774,
        position: 64,
        stem: false,
      },
      {
        token: 2103780943,
        position: 65,
        stem: true,
      },
      {
        token: -1311938348,
        position: 65,
        stem: true,
      },
      {
        token: 1511029066,
        position: 65,
        stem: false,
      },
      {
        token: -378439873,
        position: 66,
        stem: true,
      },
      {
        token: 1548138616,
        position: 66,
        stem: true,
      },
      {
        token: -1214535194,
        position: 66,
        stem: false,
      },
      {
        token: 450215437,
        position: 67,
        stem: false,
      },
      {
        token: -1466585258,
        position: 68,
        stem: false,
      },
      {
        token: 521872670,
        position: 69,
        stem: false,
      },
      {
        token: 1072522677,
        position: 70,
        stem: true,
      },
      {
        token: 1424937020,
        position: 70,
        stem: false,
      },
      {
        token: -2093510035,
        position: 71,
        stem: true,
      },
      {
        token: -598061011,
        position: 71,
        stem: false,
      },
      {
        token: 2068387028,
        position: 72,
        stem: false,
      },
      {
        token: -601173596,
        position: 73,
        stem: true,
      },
      {
        token: -1444643761,
        position: 73,
        stem: true,
      },
      {
        token: 1111059921,
        position: 73,
        stem: false,
      },
      {
        token: 1889509032,
        position: 74,
        stem: true,
      },
      {
        token: 1813287246,
        position: 74,
        stem: true,
      },
      {
        token: -2016837424,
        position: 74,
        stem: false,
      },
      {
        token: 931261456,
        position: 75,
        stem: false,
      },
      {
        token: -1931585751,
        position: 76,
        stem: false,
      },
      {
        token: 1802799890,
        position: 77,
        stem: false,
      },
      {
        token: -1732566604,
        position: 78,
        stem: false,
      },
      {
        token: 1402582597,
        position: 79,
        stem: false,
      },
      {
        token: 134610293,
        position: 80,
        stem: false,
      },
      {
        token: -1732566604,
        position: 81,
        stem: false,
      },
      {
        token: -1751077469,
        position: 82,
        stem: true,
      },
      {
        token: 1413914100,
        position: 82,
        stem: false,
      },
      {
        token: 602410524,
        position: 83,
        stem: false,
      },
      {
        token: -1732566604,
        position: 84,
        stem: false,
      },
      {
        token: -1751077469,
        position: 85,
        stem: true,
      },
      {
        token: 1413914100,
        position: 85,
        stem: false,
      },
      {
        token: 891459019,
        position: 86,
        stem: true,
      },
      {
        token: 680887727,
        position: 86,
        stem: false,
      },
      {
        token: 501661262,
        position: 87,
        stem: false,
      },
      {
        token: -1161549143,
        position: 88,
        stem: false,
      },
      {
        token: -231149483,
        position: 89,
        stem: true,
      },
      {
        token: -1658244040,
        position: 89,
        stem: false,
      },
      {
        token: -409830284,
        position: 90,
        stem: false,
      },
      {
        token: -1732566604,
        position: 91,
        stem: false,
      },
      {
        token: -1751077469,
        position: 92,
        stem: true,
      },
      {
        token: 1413914100,
        position: 92,
        stem: false,
      },
      {
        token: -557220735,
        position: 93,
        stem: true,
      },
      {
        token: 1755800200,
        position: 93,
        stem: false,
      },
      {
        token: 250665868,
        position: 94,
        stem: true,
      },
      {
        token: -15798053,
        position: 94,
        stem: false,
      },
      {
        token: -809633260,
        position: 95,
        stem: false,
      },
      {
        token: -353782887,
        position: 96,
        stem: true,
      },
      {
        token: -877576791,
        position: 96,
        stem: false,
      },
      {
        token: 696878056,
        position: 97,
        stem: true,
      },
      {
        token: -1710936086,
        position: 97,
        stem: false,
      },
      {
        token: 1015983123,
        position: 98,
        stem: false,
      },
      {
        token: -1732566604,
        position: 99,
        stem: false,
      },
      {
        token: 1138425661,
        position: 100,
        stem: false,
      },
      {
        token: 117152825,
        position: 101,
        stem: false,
      },
      {
        token: 1361488968,
        position: 102,
        stem: false,
      },
      {
        token: -1499471349,
        position: 103,
        stem: false,
      },
      {
        token: -409830284,
        position: 104,
        stem: false,
      },
      {
        token: -138018181,
        position: 105,
        stem: true,
      },
      {
        token: -361688545,
        position: 105,
        stem: false,
      },
      {
        token: 1123456848,
        position: 106,
        stem: true,
      },
      {
        token: -950259431,
        position: 106,
        stem: false,
      },
      {
        token: -1949279002,
        position: 107,
        stem: false,
      },
      {
        token: -880201385,
        position: 108,
        stem: false,
      },
      {
        token: 2059259779,
        position: 109,
        stem: true,
      },
      {
        token: -353782887,
        position: 109,
        stem: false,
      },
      {
        token: 59292339,
        position: 110,
        stem: true,
      },
      {
        token: -1236523907,
        position: 110,
        stem: false,
      },
      {
        token: -567080596,
        position: 111,
        stem: true,
      },
      {
        token: -1014753016,
        position: 111,
        stem: false,
      },
      {
        token: -305523342,
        position: 112,
        stem: true,
      },
      {
        token: -260242154,
        position: 112,
        stem: false,
      },
      {
        token: 1748255856,
        position: 113,
        stem: true,
      },
      {
        token: 1908379107,
        position: 113,
        stem: false,
      },
      {
        token: -567080596,
        position: 114,
        stem: true,
      },
      {
        token: -1014753016,
        position: 114,
        stem: false,
      },
      {
        token: -305523342,
        position: 115,
        stem: true,
      },
      {
        token: -260242154,
        position: 115,
        stem: false,
      },
      {
        token: 755493100,
        position: 116,
        stem: true,
      },
      {
        token: -1298176336,
        position: 116,
        stem: false,
      },
      {
        token: 1001261735,
        position: 117,
        stem: false,
      },
      {
        token: 134610293,
        position: 118,
        stem: false,
      },
      {
        token: -284779174,
        position: 119,
        stem: false,
      },
      {
        token: 999008199,
        position: 120,
        stem: false,
      },
      {
        token: -730385796,
        position: 121,
        stem: true,
      },
      {
        token: -300565919,
        position: 121,
        stem: false,
      },
      {
        token: -996304420,
        position: 122,
        stem: true,
      },
      {
        token: 1609338446,
        position: 122,
        stem: true,
      },
      {
        token: 2068808234,
        position: 122,
        stem: false,
      },
      {
        token: -1376521373,
        position: 123,
        stem: false,
      },
      {
        token: 1662126096,
        position: 124,
        stem: false,
      },
      {
        token: -872999858,
        position: 125,
        stem: true,
      },
      {
        token: 695801987,
        position: 125,
        stem: false,
      },
      {
        token: 607264868,
        position: 126,
        stem: false,
      },
      {
        token: -1809686908,
        position: 127,
        stem: true,
      },
      {
        token: 1130567685,
        position: 127,
        stem: false,
      },
      {
        token: 1065421233,
        position: 128,
        stem: false,
      },
      {
        token: 602410524,
        position: 129,
        stem: false,
      },
      {
        token: -1353785820,
        position: 130,
        stem: true,
      },
      {
        token: -1292251584,
        position: 130,
        stem: false,
      },
      {
        token: -198469163,
        position: 131,
        stem: true,
      },
      {
        token: 429356952,
        position: 131,
        stem: false,
      },
      {
        token: -730385796,
        position: 132,
        stem: true,
      },
      {
        token: -300565919,
        position: 132,
        stem: false,
      },
      {
        token: -1670858232,
        position: 133,
        stem: true,
      },
      {
        token: 1932714345,
        position: 133,
        stem: false,
      },
      {
        token: 1671483036,
        position: 134,
        stem: true,
      },
      {
        token: 74391524,
        position: 134,
        stem: false,
      },
      {
        token: -1670858232,
        position: 135,
        stem: true,
      },
      {
        token: -509764910,
        position: 135,
        stem: false,
      },
      {
        token: -500837353,
        position: 136,
        stem: true,
      },
      {
        token: 327276530,
        position: 136,
        stem: false,
      },
      {
        token: -40981704,
        position: 137,
        stem: false,
      },
      {
        token: 380742408,
        position: 138,
        stem: false,
      },
      {
        token: 1813341303,
        position: 139,
        stem: true,
      },
      {
        token: -1076547093,
        position: 139,
        stem: true,
      },
      {
        token: 1307700196,
        position: 139,
        stem: false,
      },
      {
        token: 2057079866,
        position: 140,
        stem: true,
      },
      {
        token: -1197732220,
        position: 140,
        stem: false,
      },
      {
        token: -1670858232,
        position: 141,
        stem: true,
      },
      {
        token: -509764910,
        position: 141,
        stem: false,
      },
      {
        token: -1773574987,
        position: 142,
        stem: false,
      },
      {
        token: 708246644,
        position: 143,
        stem: true,
      },
      {
        token: 931261456,
        position: 143,
        stem: false,
      },
      {
        token: -1773574987,
        position: 144,
        stem: false,
      },
      {
        token: -1037049506,
        position: 145,
        stem: false,
      },
      {
        token: 1831371789,
        position: 146,
        stem: false,
      },
      {
        token: 1081496055,
        position: 147,
        stem: true,
      },
      {
        token: -1639945810,
        position: 147,
        stem: true,
      },
      {
        token: -1994650884,
        position: 147,
        stem: false,
      },
      {
        token: -1350128173,
        position: 148,
        stem: true,
      },
      {
        token: -219513770,
        position: 148,
        stem: true,
      },
      {
        token: 423062984,
        position: 148,
        stem: false,
      },
      {
        token: -186917087,
        position: 149,
        stem: true,
      },
      {
        token: 438520328,
        position: 149,
        stem: true,
      },
      {
        token: -922424371,
        position: 149,
        stem: false,
      },
      {
        token: -1692166592,
        position: 150,
        stem: true,
      },
      {
        token: -1749957996,
        position: 150,
        stem: true,
      },
      {
        token: -2131910202,
        position: 150,
        stem: false,
      },
      {
        token: 696878056,
        position: 151,
        stem: true,
      },
      {
        token: -1710936086,
        position: 151,
        stem: false,
      },
      {
        token: -809633260,
        position: 152,
        stem: false,
      },
      {
        token: -1557210429,
        position: 153,
        stem: false,
      },
      {
        token: -1866623007,
        position: 154,
        stem: true,
      },
      {
        token: 981630123,
        position: 154,
        stem: false,
      },
      {
        token: -49012272,
        position: 155,
        stem: false,
      },
      {
        token: -1592857288,
        position: 156,
        stem: true,
      },
      {
        token: -626480276,
        position: 156,
        stem: false,
      },
      {
        token: -1732566604,
        position: 157,
        stem: false,
      },
      {
        token: -1751077469,
        position: 158,
        stem: true,
      },
      {
        token: -121292020,
        position: 158,
        stem: false,
      },
      {
        token: 501661262,
        position: 159,
        stem: false,
      },
      {
        token: -2045614502,
        position: 160,
        stem: true,
      },
      {
        token: -150347779,
        position: 160,
        stem: false,
      },
      {
        token: -267126603,
        position: 161,
        stem: false,
      },
      {
        token: 1001261735,
        position: 162,
        stem: false,
      },
      {
        token: -1432471686,
        position: 163,
        stem: false,
      },
      {
        token: -353782887,
        position: 164,
        stem: true,
      },
      {
        token: -877576791,
        position: 164,
        stem: false,
      },
      {
        token: 696878056,
        position: 165,
        stem: true,
      },
      {
        token: -1710936086,
        position: 165,
        stem: false,
      },
      {
        token: 1015983123,
        position: 166,
        stem: false,
      },
      {
        token: -1732566604,
        position: 167,
        stem: false,
      },
      {
        token: 1138425661,
        position: 168,
        stem: false,
      },
      {
        token: 117152825,
        position: 169,
        stem: false,
      },
      {
        token: -1499471349,
        position: 170,
        stem: false,
      },
      {
        token: -409830284,
        position: 171,
        stem: false,
      },
      {
        token: 1274017736,
        position: 172,
        stem: true,
      },
      {
        token: 1679545423,
        position: 172,
        stem: false,
      },
      {
        token: -1732566604,
        position: 173,
        stem: false,
      },
      {
        token: -1751077469,
        position: 174,
        stem: true,
      },
      {
        token: 1413914100,
        position: 174,
        stem: false,
      },
      {
        token: -138018181,
        position: 175,
        stem: true,
      },
      {
        token: -361688545,
        position: 175,
        stem: false,
      },
      {
        token: 1123456848,
        position: 176,
        stem: true,
      },
      {
        token: -950259431,
        position: 176,
        stem: false,
      },
      {
        token: -409830284,
        position: 177,
        stem: false,
      },
      {
        token: -1881955516,
        position: 178,
        stem: true,
      },
      {
        token: 1781569825,
        position: 178,
        stem: false,
      },
      {
        token: -1732566604,
        position: 179,
        stem: false,
      },
      {
        token: -1746637102,
        position: 180,
        stem: true,
      },
      {
        token: 1628950843,
        position: 180,
        stem: false,
      },
      {
        token: 501661262,
        position: 181,
        stem: false,
      },
      {
        token: -869490539,
        position: 182,
        stem: true,
      },
      {
        token: 1869820209,
        position: 182,
        stem: false,
      },
      {
        token: -491501419,
        position: 183,
        stem: true,
      },
      {
        token: -810837695,
        position: 183,
        stem: false,
      },
      {
        token: -409830284,
        position: 184,
        stem: false,
      },
      {
        token: -1732566604,
        position: 185,
        stem: false,
      },
      {
        token: -1751077469,
        position: 186,
        stem: true,
      },
      {
        token: 1413914100,
        position: 186,
        stem: false,
      },
      {
        token: 294781498,
        position: 187,
        stem: false,
      },
      {
        token: -1751077469,
        position: 188,
        stem: true,
      },
      {
        token: 1413914100,
        position: 188,
        stem: false,
      },
      {
        token: -352577790,
        position: 189,
        stem: true,
      },
      {
        token: 1663731225,
        position: 189,
        stem: false,
      },
      {
        token: 134610293,
        position: 190,
        stem: false,
      },
      {
        token: -869490539,
        position: 191,
        stem: true,
      },
      {
        token: -915654201,
        position: 191,
        stem: false,
      },
      {
        token: -1732566604,
        position: 192,
        stem: false,
      },
      {
        token: -1751077469,
        position: 193,
        stem: true,
      },
      {
        token: 1413914100,
        position: 193,
        stem: false,
      },
      {
        token: -755934826,
        position: 194,
        stem: false,
      },
      {
        token: -1977959027,
        position: 195,
        stem: false,
      },
      {
        token: -667198034,
        position: 196,
        stem: false,
      },
      {
        token: 1001261735,
        position: 197,
        stem: false,
      },
      {
        token: 696878056,
        position: 198,
        stem: true,
      },
      {
        token: -1710936086,
        position: 198,
        stem: false,
      },
      {
        token: 1281549880,
        position: 199,
        stem: false,
      },
      {
        token: -627195958,
        position: 200,
        stem: false,
      },
      {
        token: 1295261063,
        position: 201,
        stem: true,
      },
      {
        token: -274668265,
        position: 201,
        stem: false,
      },
      {
        token: 1095432470,
        position: 202,
        stem: true,
      },
      {
        token: 458196466,
        position: 202,
        stem: false,
      },
      {
        token: -1732566604,
        position: 203,
        stem: false,
      },
      {
        token: -181824616,
        position: 204,
        stem: false,
      },
      {
        token: -1794504150,
        position: 205,
        stem: true,
      },
      {
        token: -1517312891,
        position: 205,
        stem: false,
      },
      {
        token: -409830284,
        position: 206,
        stem: true,
      },
      {
        token: 1587322774,
        position: 206,
        stem: false,
      },
      {
        token: -880201385,
        position: 207,
        stem: true,
      },
      {
        token: -1225109831,
        position: 207,
        stem: true,
      },
      {
        token: 390993611,
        position: 207,
        stem: false,
      },
      {
        token: 810002732,
        position: 208,
        stem: true,
      },
      {
        token: -880201385,
        position: 208,
        stem: true,
      },
      {
        token: -1225109831,
        position: 208,
        stem: true,
      },
      {
        token: -286643502,
        position: 208,
        stem: false,
      },
      {
        token: 1558786320,
        position: 209,
        stem: false,
      },
      {
        token: 1903892168,
        position: 210,
        stem: true,
      },
      {
        token: 2012965551,
        position: 210,
        stem: false,
      },
      {
        token: 59292339,
        position: 211,
        stem: false,
      },
      {
        token: -1753739854,
        position: 212,
        stem: true,
      },
      {
        token: -1776963108,
        position: 212,
        stem: true,
      },
      {
        token: 1040107793,
        position: 212,
        stem: true,
      },
      {
        token: -493100521,
        position: 212,
        stem: false,
      },
    ]);
    expect(tokenizer.detailedTokenize(input)).toEqual({
      original: [
        'thank',
        'your',
        'purchase',
        'hunter',
        'order',
        'number',
        'neof8h4y6f7',
        'date',
        'purchase',
        'sun',
        'oct',
        '19',
        '2025',
        'sales',
        'final',
        'order',
        'summary',
        'belly',
        'up',
        'casbah',
        'present',
        'donny',
        'benet',
        'sun',
        'mar',
        '8',
        '2026',
        '8:00',
        'pm',
        'doors',
        '7:00',
        'pm',
        'time',
        'displayed',
        'local',
        'venue',
        'age',
        '21+',
        'music',
        'box',
        '1337',
        'india',
        'street',
        'san',
        'diego',
        'ca',
        '92101',
        'venue',
        'directions',
        'http://email.t.ticketweb.com/c/14e9fff1-0cb6-419e-a998-6188a46d17fc',
        'india',
        'street',
        'san',
        'diego',
        'ca',
        '92101',
        '2',
        'general',
        'admission',
        'standing',
        'day',
        'show',
        'general',
        'admission',
        '$32.00',
        '$64.00',
        '2',
        'addl',
        'item',
        'backstage',
        'lounge',
        'cocktail',
        '$40.00',
        '$80.00',
        'delivery',
        'type',
        'ticketfast',
        'your',
        'receipt',
        'not',
        'your',
        'tickets',
        'when',
        'your',
        'tickets',
        'ready',
        'will',
        'sent',
        'another',
        'email',
        'your',
        'tickets',
        'attached',
        'pdfs',
        'note',
        'additionally',
        'please',
        'check',
        'your',
        'spam',
        'junk',
        'mail',
        'mailbox',
        'email',
        'may',
        'misclassified',
        'additional',
        'info',
        'addition',
        "ticketweb's",
        'privacy',
        'policy',
        'following',
        'privacy',
        'policy',
        'exists',
        'event',
        'not',
        'share',
        'text',
        'messaging',
        'opt-in',
        'data',
        'consent',
        'information',
        'third',
        'parties',
        'except',
        'when',
        'necessary',
        'provide',
        'messaging',
        'services',
        'aggregators',
        'service',
        'providers)',
        'paid',
        'visa',
        'xxxx-4696',
        'subtotal',
        'service',
        'fee',
        'delivery',
        'fee',
        'total',
        'payment',
        '$144.00',
        '$18.60',
        '$0.00',
        '$162.60',
        'please',
        'note',
        'know',
        'excited',
        'rest',
        'assured',
        'your',
        'ticket(s',
        'will',
        'dispatched',
        'closer',
        'event',
        'date',
        'additionally',
        'please',
        'check',
        'your',
        'spam',
        'junk',
        'mailbox',
        'email',
        'containing',
        'your',
        'tickets',
        'may',
        'misclassified',
        'email',
        'confirms',
        'your',
        'purchase',
        'will',
        'receive',
        'separate',
        'email',
        'your',
        'tickets',
        'chosen',
        'tickets',
        'delivered',
        'not',
        'received',
        'your',
        'tickets',
        '48',
        'hours',
        'before',
        'event',
        'please',
        'contact',
        'us',
        'immediately',
        'assistance',
        'your',
        'order',
        'available',
        'emailing',
        'info@example.com',
        'mailto:info@example.com',
        'thank',
        'choosing',
        'ticketweb',
        'http://email.t.ticketweb.com/c/14e9fff1-0cb6-419e-a998-6188a46d17fc',
      ],
      stemmed: [
        'thank',
        'your',
        'purcha',
        'hunter',
        'order',
        'number',
        'neof8h4y6f7',
        'date',
        'purcha',
        'sun',
        'oct',
        '19',
        '2025',
        'sales',
        'final',
        'order',
        'summary',
        'belli',
        'up',
        'casbah',
        'present',
        'donni',
        'benet',
        'sun',
        'mar',
        '8',
        '2026',
        '800',
        'pm',
        'door',
        '700',
        'pm',
        'time',
        'displai',
        'local',
        'venu',
        'age',
        '21',
        'music',
        'box',
        '1337',
        'india',
        'street',
        'san',
        'diego',
        'ca',
        '92101',
        'venu',
        'direct',
        'http://email.t.ticketweb.com/c/14e9fff1-0cb6-419e-a998-6188a46d17fc',
        'india',
        'street',
        'san',
        'diego',
        'ca',
        '92101',
        '2',
        'gener',
        'admission',
        'stand',
        'dai',
        'show',
        'gener',
        'admission',
        '32',
        '32.00',
        '64',
        '64.00',
        '2',
        'addl',
        'item',
        'backstag',
        'loung',
        'cocktail',
        '40',
        '40.00',
        '80',
        '80.00',
        'delivery',
        'type',
        'ticketfast',
        'your',
        'receipt',
        'not',
        'your',
        'ticket',
        'when',
        'your',
        'ticket',
        'readi',
        'will',
        'sent',
        'anoth',
        'email',
        'your',
        'ticket',
        'attach',
        'pdf',
        'note',
        'addition',
        'plea',
        'check',
        'your',
        'spam',
        'junk',
        'mail',
        'mailbox',
        'email',
        'mai',
        'misclassifi',
        'additional',
        'info',
        'addit',
        'ticketweb',
        'privaci',
        'polici',
        'follow',
        'privaci',
        'polici',
        'exist',
        'event',
        'not',
        'share',
        'text',
        'messag',
        'opt',
        'in',
        'data',
        'consent',
        'inform',
        'third',
        'parti',
        'except',
        'when',
        'necessari',
        'provid',
        'messag',
        'servic',
        'aggreg',
        'servic',
        'providers',
        'paid',
        'visa',
        'xxxx',
        '4696',
        'subtot',
        'servic',
        'fee',
        'deliveri',
        'fee',
        'total',
        'payment',
        '144',
        '144.00',
        '18',
        '18.60',
        '0',
        '0.00',
        '162',
        '162.60',
        'plea',
        'note',
        'know',
        'excit',
        'rest',
        'assur',
        'your',
        'ticket',
        'will',
        'dispatch',
        'closer',
        'event',
        'date',
        'addition',
        'plea',
        'check',
        'your',
        'spam',
        'junk',
        'mailbox',
        'email',
        'contain',
        'your',
        'ticket',
        'mai',
        'misclassifi',
        'email',
        'confirm',
        'your',
        'purcha',
        'will',
        'receiv',
        'separ',
        'email',
        'your',
        'ticket',
        'chosen',
        'ticket',
        'deliv',
        'not',
        'receiv',
        'your',
        'ticket',
        '48',
        'hours',
        'before',
        'event',
        'plea',
        'contact',
        'us',
        'immedi',
        'assistanc',
        'your',
        'order',
        'avail',
        'email',
        'info@example.com',
        'mailto:info@example.com',
        'thank',
        'choo',
        'ticketweb',
        'http://email.t.ticketweb.com/c/14e9fff1-0cb6-419e-a998-6188a46d17fc',
      ],
      tokens: [
        [
          {
            input: 'thank',
            token: 1558786320,
            position: 1,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 2,
            stem: false,
          },
        ],
        [
          {
            input: 'purcha',
            token: -1746637102,
            position: 3,
            stem: true,
          },
          {
            input: 'purchase',
            token: 1628950843,
            position: 3,
            stem: false,
          },
        ],
        [
          {
            input: 'hunter',
            token: 1255640165,
            position: 4,
            stem: false,
          },
        ],
        [
          {
            input: 'order',
            token: -181824616,
            position: 5,
            stem: false,
          },
        ],
        [
          {
            input: 'number',
            token: -1768939692,
            position: 6,
            stem: false,
          },
        ],
        [
          {
            input: 'neof8h4y6f7',
            token: 1576289265,
            position: 7,
            stem: false,
          },
        ],
        [
          {
            input: 'date',
            token: -1432471686,
            position: 8,
            stem: false,
          },
        ],
        [
          {
            input: 'purcha',
            token: -1746637102,
            position: 9,
            stem: true,
          },
          {
            input: 'purchase',
            token: 1628950843,
            position: 9,
            stem: false,
          },
        ],
        [
          {
            input: 'sun',
            token: 1370803959,
            position: 10,
            stem: false,
          },
        ],
        [
          {
            input: 'oct',
            token: -1519200178,
            position: 11,
            stem: false,
          },
        ],
        [
          {
            input: '19',
            token: -662594235,
            position: 12,
            stem: false,
          },
        ],
        [
          {
            input: '2025',
            token: -456221964,
            position: 13,
            stem: false,
          },
        ],
        [
          {
            input: 'sales',
            token: 1803644996,
            position: 14,
            stem: false,
          },
        ],
        [
          {
            input: 'final',
            token: -321561402,
            position: 15,
            stem: false,
          },
        ],
        [
          {
            input: 'order',
            token: -181824616,
            position: 16,
            stem: false,
          },
        ],
        [
          {
            input: 'summary',
            token: -836213149,
            position: 17,
            stem: false,
          },
        ],
        [
          {
            input: 'belli',
            token: -1782375662,
            position: 18,
            stem: true,
          },
          {
            input: 'belly',
            token: -2005660810,
            position: 18,
            stem: false,
          },
        ],
        [
          {
            input: 'up',
            token: 1133833840,
            position: 19,
            stem: false,
          },
        ],
        [
          {
            input: 'casbah',
            token: -1767497446,
            position: 20,
            stem: false,
          },
        ],
        [
          {
            input: 'present',
            token: -37966313,
            position: 21,
            stem: false,
          },
        ],
        [
          {
            input: 'donni',
            token: 1150072890,
            position: 22,
            stem: true,
          },
          {
            input: 'donny',
            token: 1497081950,
            position: 22,
            stem: false,
          },
        ],
        [
          {
            input: 'benet',
            token: 612571372,
            position: 23,
            stem: false,
          },
        ],
        [
          {
            input: 'sun',
            token: 1370803959,
            position: 24,
            stem: false,
          },
        ],
        [
          {
            input: 'mar',
            token: 2107886487,
            position: 25,
            stem: false,
          },
        ],
        [
          {
            input: '8',
            token: -100641005,
            position: 26,
            stem: false,
          },
        ],
        [
          {
            input: '2026',
            token: 2110245710,
            position: 27,
            stem: false,
          },
        ],
        [
          {
            input: '800',
            token: 749103973,
            position: 28,
            stem: true,
          },
          {
            input: '8:00',
            token: -994547381,
            position: 28,
            stem: false,
          },
        ],
        [
          {
            input: 'pm',
            token: 1575319276,
            position: 29,
            stem: false,
          },
        ],
        [
          {
            input: 'door',
            token: -1964682195,
            position: 30,
            stem: true,
          },
          {
            input: 'doors',
            token: 1583052330,
            position: 30,
            stem: false,
          },
        ],
        [
          {
            input: '700',
            token: 670706776,
            position: 31,
            stem: true,
          },
          {
            input: '7:00',
            token: -1663338211,
            position: 31,
            stem: false,
          },
        ],
        [
          {
            input: 'pm',
            token: 1575319276,
            position: 32,
            stem: false,
          },
        ],
        [
          {
            input: 'time',
            token: 1872009285,
            position: 33,
            stem: false,
          },
        ],
        [
          {
            input: 'displai',
            token: 291922631,
            position: 34,
            stem: true,
          },
          {
            input: 'displayed',
            token: 682482615,
            position: 34,
            stem: false,
          },
        ],
        [
          {
            input: 'local',
            token: -1948874520,
            position: 35,
            stem: false,
          },
        ],
        [
          {
            input: 'venu',
            token: -98702835,
            position: 36,
            stem: true,
          },
          {
            input: 'venue',
            token: -1852761331,
            position: 36,
            stem: false,
          },
        ],
        [
          {
            input: 'age',
            token: -1590685518,
            position: 37,
            stem: false,
          },
        ],
        [
          {
            input: '21',
            token: -42514764,
            position: 38,
            stem: true,
          },
          {
            input: '21+',
            token: -1303439842,
            position: 38,
            stem: false,
          },
        ],
        [
          {
            input: 'music',
            token: -850255286,
            position: 39,
            stem: false,
          },
        ],
        [
          {
            input: 'box',
            token: 145311802,
            position: 40,
            stem: false,
          },
        ],
        [
          {
            input: '1337',
            token: 53009198,
            position: 41,
            stem: false,
          },
        ],
        [
          {
            input: 'india',
            token: 1219330253,
            position: 42,
            stem: false,
          },
        ],
        [
          {
            input: 'street',
            token: -252783656,
            position: 43,
            stem: false,
          },
        ],
        [
          {
            input: 'san',
            token: 2132416930,
            position: 44,
            stem: false,
          },
        ],
        [
          {
            input: 'diego',
            token: 1427314299,
            position: 45,
            stem: false,
          },
        ],
        [
          {
            input: 'ca',
            token: 901544789,
            position: 46,
            stem: false,
          },
        ],
        [
          {
            input: '92101',
            token: -1694456658,
            position: 47,
            stem: false,
          },
        ],
        [
          {
            input: 'venu',
            token: -98702835,
            position: 48,
            stem: true,
          },
          {
            input: 'venue',
            token: -1852761331,
            position: 48,
            stem: false,
          },
        ],
        [
          {
            input: 'direct',
            token: 538383694,
            position: 49,
            stem: true,
          },
          {
            input: 'directions',
            token: 1230530540,
            position: 49,
            stem: false,
          },
        ],
        [
          {
            input: 'http',
            token: -1753739854,
            position: 50,
            stem: true,
          },
          {
            input: 'email.t.ticketweb.com',
            token: -1776963108,
            position: 50,
            stem: true,
          },
          {
            input: 'c/14e9fff1-0cb6-419e-a998-6188a46d17fc',
            token: 1040107793,
            position: 50,
            stem: true,
          },
          {
            input:
              'http://email.t.ticketweb.com/c/14e9fff1-0cb6-419e-a998-6188a46d17fc',
            token: -493100521,
            position: 50,
            stem: false,
          },
        ],
        [
          {
            input: 'india',
            token: 1219330253,
            position: 51,
            stem: false,
          },
        ],
        [
          {
            input: 'street',
            token: -252783656,
            position: 52,
            stem: false,
          },
        ],
        [
          {
            input: 'san',
            token: 2132416930,
            position: 53,
            stem: false,
          },
        ],
        [
          {
            input: 'diego',
            token: 1427314299,
            position: 54,
            stem: false,
          },
        ],
        [
          {
            input: 'ca',
            token: 901544789,
            position: 55,
            stem: false,
          },
        ],
        [
          {
            input: '92101',
            token: -1694456658,
            position: 56,
            stem: false,
          },
        ],
        [
          {
            input: '2',
            token: 450215437,
            position: 57,
            stem: false,
          },
        ],
        [
          {
            input: 'gener',
            token: 83899049,
            position: 58,
            stem: true,
          },
          {
            input: 'general',
            token: -836159926,
            position: 58,
            stem: false,
          },
        ],
        [
          {
            input: 'admission',
            token: -189070774,
            position: 59,
            stem: false,
          },
        ],
        [
          {
            input: 'stand',
            token: 1689852086,
            position: 60,
            stem: true,
          },
          {
            input: 'standing',
            token: 1637518040,
            position: 60,
            stem: false,
          },
        ],
        [
          {
            input: 'dai',
            token: -132695564,
            position: 61,
            stem: true,
          },
          {
            input: 'day',
            token: -442488432,
            position: 61,
            stem: false,
          },
        ],
        [
          {
            input: 'show',
            token: 839833857,
            position: 62,
            stem: false,
          },
        ],
        [
          {
            input: 'gener',
            token: 83899049,
            position: 63,
            stem: true,
          },
          {
            input: 'general',
            token: -836159926,
            position: 63,
            stem: false,
          },
        ],
        [
          {
            input: 'admission',
            token: -189070774,
            position: 64,
            stem: false,
          },
        ],
        [
          {
            input: '32',
            token: 2103780943,
            position: 65,
            stem: true,
          },
          {
            input: '32.00',
            token: -1311938348,
            position: 65,
            stem: true,
          },
          {
            input: '$32.00',
            token: 1511029066,
            position: 65,
            stem: false,
          },
        ],
        [
          {
            input: '64',
            token: -378439873,
            position: 66,
            stem: true,
          },
          {
            input: '64.00',
            token: 1548138616,
            position: 66,
            stem: true,
          },
          {
            input: '$64.00',
            token: -1214535194,
            position: 66,
            stem: false,
          },
        ],
        [
          {
            input: '2',
            token: 450215437,
            position: 67,
            stem: false,
          },
        ],
        [
          {
            input: 'addl',
            token: -1466585258,
            position: 68,
            stem: false,
          },
        ],
        [
          {
            input: 'item',
            token: 521872670,
            position: 69,
            stem: false,
          },
        ],
        [
          {
            input: 'backstag',
            token: 1072522677,
            position: 70,
            stem: true,
          },
          {
            input: 'backstage',
            token: 1424937020,
            position: 70,
            stem: false,
          },
        ],
        [
          {
            input: 'loung',
            token: -2093510035,
            position: 71,
            stem: true,
          },
          {
            input: 'lounge',
            token: -598061011,
            position: 71,
            stem: false,
          },
        ],
        [
          {
            input: 'cocktail',
            token: 2068387028,
            position: 72,
            stem: false,
          },
        ],
        [
          {
            input: '40',
            token: -601173596,
            position: 73,
            stem: true,
          },
          {
            input: '40.00',
            token: -1444643761,
            position: 73,
            stem: true,
          },
          {
            input: '$40.00',
            token: 1111059921,
            position: 73,
            stem: false,
          },
        ],
        [
          {
            input: '80',
            token: 1889509032,
            position: 74,
            stem: true,
          },
          {
            input: '80.00',
            token: 1813287246,
            position: 74,
            stem: true,
          },
          {
            input: '$80.00',
            token: -2016837424,
            position: 74,
            stem: false,
          },
        ],
        [
          {
            input: 'delivery',
            token: 931261456,
            position: 75,
            stem: false,
          },
        ],
        [
          {
            input: 'type',
            token: -1931585751,
            position: 76,
            stem: false,
          },
        ],
        [
          {
            input: 'ticketfast',
            token: 1802799890,
            position: 77,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 78,
            stem: false,
          },
        ],
        [
          {
            input: 'receipt',
            token: 1402582597,
            position: 79,
            stem: false,
          },
        ],
        [
          {
            input: 'not',
            token: 134610293,
            position: 80,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 81,
            stem: false,
          },
        ],
        [
          {
            input: 'ticket',
            token: -1751077469,
            position: 82,
            stem: true,
          },
          {
            input: 'tickets',
            token: 1413914100,
            position: 82,
            stem: false,
          },
        ],
        [
          {
            input: 'when',
            token: 602410524,
            position: 83,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 84,
            stem: false,
          },
        ],
        [
          {
            input: 'ticket',
            token: -1751077469,
            position: 85,
            stem: true,
          },
          {
            input: 'tickets',
            token: 1413914100,
            position: 85,
            stem: false,
          },
        ],
        [
          {
            input: 'readi',
            token: 891459019,
            position: 86,
            stem: true,
          },
          {
            input: 'ready',
            token: 680887727,
            position: 86,
            stem: false,
          },
        ],
        [
          {
            input: 'will',
            token: 501661262,
            position: 87,
            stem: false,
          },
        ],
        [
          {
            input: 'sent',
            token: -1161549143,
            position: 88,
            stem: false,
          },
        ],
        [
          {
            input: 'anoth',
            token: -231149483,
            position: 89,
            stem: true,
          },
          {
            input: 'another',
            token: -1658244040,
            position: 89,
            stem: false,
          },
        ],
        [
          {
            input: 'email',
            token: -409830284,
            position: 90,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 91,
            stem: false,
          },
        ],
        [
          {
            input: 'ticket',
            token: -1751077469,
            position: 92,
            stem: true,
          },
          {
            input: 'tickets',
            token: 1413914100,
            position: 92,
            stem: false,
          },
        ],
        [
          {
            input: 'attach',
            token: -557220735,
            position: 93,
            stem: true,
          },
          {
            input: 'attached',
            token: 1755800200,
            position: 93,
            stem: false,
          },
        ],
        [
          {
            input: 'pdf',
            token: 250665868,
            position: 94,
            stem: true,
          },
          {
            input: 'pdfs',
            token: -15798053,
            position: 94,
            stem: false,
          },
        ],
        [
          {
            input: 'note',
            token: -809633260,
            position: 95,
            stem: false,
          },
        ],
        [
          {
            input: 'addition',
            token: -353782887,
            position: 96,
            stem: true,
          },
          {
            input: 'additionally',
            token: -877576791,
            position: 96,
            stem: false,
          },
        ],
        [
          {
            input: 'plea',
            token: 696878056,
            position: 97,
            stem: true,
          },
          {
            input: 'please',
            token: -1710936086,
            position: 97,
            stem: false,
          },
        ],
        [
          {
            input: 'check',
            token: 1015983123,
            position: 98,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 99,
            stem: false,
          },
        ],
        [
          {
            input: 'spam',
            token: 1138425661,
            position: 100,
            stem: false,
          },
        ],
        [
          {
            input: 'junk',
            token: 117152825,
            position: 101,
            stem: false,
          },
        ],
        [
          {
            input: 'mail',
            token: 1361488968,
            position: 102,
            stem: false,
          },
        ],
        [
          {
            input: 'mailbox',
            token: -1499471349,
            position: 103,
            stem: false,
          },
        ],
        [
          {
            input: 'email',
            token: -409830284,
            position: 104,
            stem: false,
          },
        ],
        [
          {
            input: 'mai',
            token: -138018181,
            position: 105,
            stem: true,
          },
          {
            input: 'may',
            token: -361688545,
            position: 105,
            stem: false,
          },
        ],
        [
          {
            input: 'misclassifi',
            token: 1123456848,
            position: 106,
            stem: true,
          },
          {
            input: 'misclassified',
            token: -950259431,
            position: 106,
            stem: false,
          },
        ],
        [
          {
            input: 'additional',
            token: -1949279002,
            position: 107,
            stem: false,
          },
        ],
        [
          {
            input: 'info',
            token: -880201385,
            position: 108,
            stem: false,
          },
        ],
        [
          {
            input: 'addit',
            token: 2059259779,
            position: 109,
            stem: true,
          },
          {
            input: 'addition',
            token: -353782887,
            position: 109,
            stem: false,
          },
        ],
        [
          {
            input: 'ticketweb',
            token: 59292339,
            position: 110,
            stem: true,
          },
          {
            input: "ticketweb's",
            token: -1236523907,
            position: 110,
            stem: false,
          },
        ],
        [
          {
            input: 'privaci',
            token: -567080596,
            position: 111,
            stem: true,
          },
          {
            input: 'privacy',
            token: -1014753016,
            position: 111,
            stem: false,
          },
        ],
        [
          {
            input: 'polici',
            token: -305523342,
            position: 112,
            stem: true,
          },
          {
            input: 'policy',
            token: -260242154,
            position: 112,
            stem: false,
          },
        ],
        [
          {
            input: 'follow',
            token: 1748255856,
            position: 113,
            stem: true,
          },
          {
            input: 'following',
            token: 1908379107,
            position: 113,
            stem: false,
          },
        ],
        [
          {
            input: 'privaci',
            token: -567080596,
            position: 114,
            stem: true,
          },
          {
            input: 'privacy',
            token: -1014753016,
            position: 114,
            stem: false,
          },
        ],
        [
          {
            input: 'polici',
            token: -305523342,
            position: 115,
            stem: true,
          },
          {
            input: 'policy',
            token: -260242154,
            position: 115,
            stem: false,
          },
        ],
        [
          {
            input: 'exist',
            token: 755493100,
            position: 116,
            stem: true,
          },
          {
            input: 'exists',
            token: -1298176336,
            position: 116,
            stem: false,
          },
        ],
        [
          {
            input: 'event',
            token: 1001261735,
            position: 117,
            stem: false,
          },
        ],
        [
          {
            input: 'not',
            token: 134610293,
            position: 118,
            stem: false,
          },
        ],
        [
          {
            input: 'share',
            token: -284779174,
            position: 119,
            stem: false,
          },
        ],
        [
          {
            input: 'text',
            token: 999008199,
            position: 120,
            stem: false,
          },
        ],
        [
          {
            input: 'messag',
            token: -730385796,
            position: 121,
            stem: true,
          },
          {
            input: 'messaging',
            token: -300565919,
            position: 121,
            stem: false,
          },
        ],
        [
          {
            input: 'opt',
            token: -996304420,
            position: 122,
            stem: true,
          },
          {
            input: 'in',
            token: 1609338446,
            position: 122,
            stem: true,
          },
          {
            input: 'opt-in',
            token: 2068808234,
            position: 122,
            stem: false,
          },
        ],
        [
          {
            input: 'data',
            token: -1376521373,
            position: 123,
            stem: false,
          },
        ],
        [
          {
            input: 'consent',
            token: 1662126096,
            position: 124,
            stem: false,
          },
        ],
        [
          {
            input: 'inform',
            token: -872999858,
            position: 125,
            stem: true,
          },
          {
            input: 'information',
            token: 695801987,
            position: 125,
            stem: false,
          },
        ],
        [
          {
            input: 'third',
            token: 607264868,
            position: 126,
            stem: false,
          },
        ],
        [
          {
            input: 'parti',
            token: -1809686908,
            position: 127,
            stem: true,
          },
          {
            input: 'parties',
            token: 1130567685,
            position: 127,
            stem: false,
          },
        ],
        [
          {
            input: 'except',
            token: 1065421233,
            position: 128,
            stem: false,
          },
        ],
        [
          {
            input: 'when',
            token: 602410524,
            position: 129,
            stem: false,
          },
        ],
        [
          {
            input: 'necessari',
            token: -1353785820,
            position: 130,
            stem: true,
          },
          {
            input: 'necessary',
            token: -1292251584,
            position: 130,
            stem: false,
          },
        ],
        [
          {
            input: 'provid',
            token: -198469163,
            position: 131,
            stem: true,
          },
          {
            input: 'provide',
            token: 429356952,
            position: 131,
            stem: false,
          },
        ],
        [
          {
            input: 'messag',
            token: -730385796,
            position: 132,
            stem: true,
          },
          {
            input: 'messaging',
            token: -300565919,
            position: 132,
            stem: false,
          },
        ],
        [
          {
            input: 'servic',
            token: -1670858232,
            position: 133,
            stem: true,
          },
          {
            input: 'services',
            token: 1932714345,
            position: 133,
            stem: false,
          },
        ],
        [
          {
            input: 'aggreg',
            token: 1671483036,
            position: 134,
            stem: true,
          },
          {
            input: 'aggregators',
            token: 74391524,
            position: 134,
            stem: false,
          },
        ],
        [
          {
            input: 'servic',
            token: -1670858232,
            position: 135,
            stem: true,
          },
          {
            input: 'service',
            token: -509764910,
            position: 135,
            stem: false,
          },
        ],
        [
          {
            input: 'providers',
            token: -500837353,
            position: 136,
            stem: true,
          },
          {
            input: 'providers)',
            token: 327276530,
            position: 136,
            stem: false,
          },
        ],
        [
          {
            input: 'paid',
            token: -40981704,
            position: 137,
            stem: false,
          },
        ],
        [
          {
            input: 'visa',
            token: 380742408,
            position: 138,
            stem: false,
          },
        ],
        [
          {
            input: 'xxxx',
            token: 1813341303,
            position: 139,
            stem: true,
          },
          {
            input: '4696',
            token: -1076547093,
            position: 139,
            stem: true,
          },
          {
            input: 'xxxx-4696',
            token: 1307700196,
            position: 139,
            stem: false,
          },
        ],
        [
          {
            input: 'subtot',
            token: 2057079866,
            position: 140,
            stem: true,
          },
          {
            input: 'subtotal',
            token: -1197732220,
            position: 140,
            stem: false,
          },
        ],
        [
          {
            input: 'servic',
            token: -1670858232,
            position: 141,
            stem: true,
          },
          {
            input: 'service',
            token: -509764910,
            position: 141,
            stem: false,
          },
        ],
        [
          {
            input: 'fee',
            token: -1773574987,
            position: 142,
            stem: false,
          },
        ],
        [
          {
            input: 'deliveri',
            token: 708246644,
            position: 143,
            stem: true,
          },
          {
            input: 'delivery',
            token: 931261456,
            position: 143,
            stem: false,
          },
        ],
        [
          {
            input: 'fee',
            token: -1773574987,
            position: 144,
            stem: false,
          },
        ],
        [
          {
            input: 'total',
            token: -1037049506,
            position: 145,
            stem: false,
          },
        ],
        [
          {
            input: 'payment',
            token: 1831371789,
            position: 146,
            stem: false,
          },
        ],
        [
          {
            input: '144',
            token: 1081496055,
            position: 147,
            stem: true,
          },
          {
            input: '144.00',
            token: -1639945810,
            position: 147,
            stem: true,
          },
          {
            input: '$144.00',
            token: -1994650884,
            position: 147,
            stem: false,
          },
        ],
        [
          {
            input: '18',
            token: -1350128173,
            position: 148,
            stem: true,
          },
          {
            input: '18.60',
            token: -219513770,
            position: 148,
            stem: true,
          },
          {
            input: '$18.60',
            token: 423062984,
            position: 148,
            stem: false,
          },
        ],
        [
          {
            input: '0',
            token: -186917087,
            position: 149,
            stem: true,
          },
          {
            input: '0.00',
            token: 438520328,
            position: 149,
            stem: true,
          },
          {
            input: '$0.00',
            token: -922424371,
            position: 149,
            stem: false,
          },
        ],
        [
          {
            input: '162',
            token: -1692166592,
            position: 150,
            stem: true,
          },
          {
            input: '162.60',
            token: -1749957996,
            position: 150,
            stem: true,
          },
          {
            input: '$162.60',
            token: -2131910202,
            position: 150,
            stem: false,
          },
        ],
        [
          {
            input: 'plea',
            token: 696878056,
            position: 151,
            stem: true,
          },
          {
            input: 'please',
            token: -1710936086,
            position: 151,
            stem: false,
          },
        ],
        [
          {
            input: 'note',
            token: -809633260,
            position: 152,
            stem: false,
          },
        ],
        [
          {
            input: 'know',
            token: -1557210429,
            position: 153,
            stem: false,
          },
        ],
        [
          {
            input: 'excit',
            token: -1866623007,
            position: 154,
            stem: true,
          },
          {
            input: 'excited',
            token: 981630123,
            position: 154,
            stem: false,
          },
        ],
        [
          {
            input: 'rest',
            token: -49012272,
            position: 155,
            stem: false,
          },
        ],
        [
          {
            input: 'assur',
            token: -1592857288,
            position: 156,
            stem: true,
          },
          {
            input: 'assured',
            token: -626480276,
            position: 156,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 157,
            stem: false,
          },
        ],
        [
          {
            input: 'ticket',
            token: -1751077469,
            position: 158,
            stem: true,
          },
          {
            input: 'ticket(s',
            token: -121292020,
            position: 158,
            stem: false,
          },
        ],
        [
          {
            input: 'will',
            token: 501661262,
            position: 159,
            stem: false,
          },
        ],
        [
          {
            input: 'dispatch',
            token: -2045614502,
            position: 160,
            stem: true,
          },
          {
            input: 'dispatched',
            token: -150347779,
            position: 160,
            stem: false,
          },
        ],
        [
          {
            input: 'closer',
            token: -267126603,
            position: 161,
            stem: false,
          },
        ],
        [
          {
            input: 'event',
            token: 1001261735,
            position: 162,
            stem: false,
          },
        ],
        [
          {
            input: 'date',
            token: -1432471686,
            position: 163,
            stem: false,
          },
        ],
        [
          {
            input: 'addition',
            token: -353782887,
            position: 164,
            stem: true,
          },
          {
            input: 'additionally',
            token: -877576791,
            position: 164,
            stem: false,
          },
        ],
        [
          {
            input: 'plea',
            token: 696878056,
            position: 165,
            stem: true,
          },
          {
            input: 'please',
            token: -1710936086,
            position: 165,
            stem: false,
          },
        ],
        [
          {
            input: 'check',
            token: 1015983123,
            position: 166,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 167,
            stem: false,
          },
        ],
        [
          {
            input: 'spam',
            token: 1138425661,
            position: 168,
            stem: false,
          },
        ],
        [
          {
            input: 'junk',
            token: 117152825,
            position: 169,
            stem: false,
          },
        ],
        [
          {
            input: 'mailbox',
            token: -1499471349,
            position: 170,
            stem: false,
          },
        ],
        [
          {
            input: 'email',
            token: -409830284,
            position: 171,
            stem: false,
          },
        ],
        [
          {
            input: 'contain',
            token: 1274017736,
            position: 172,
            stem: true,
          },
          {
            input: 'containing',
            token: 1679545423,
            position: 172,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 173,
            stem: false,
          },
        ],
        [
          {
            input: 'ticket',
            token: -1751077469,
            position: 174,
            stem: true,
          },
          {
            input: 'tickets',
            token: 1413914100,
            position: 174,
            stem: false,
          },
        ],
        [
          {
            input: 'mai',
            token: -138018181,
            position: 175,
            stem: true,
          },
          {
            input: 'may',
            token: -361688545,
            position: 175,
            stem: false,
          },
        ],
        [
          {
            input: 'misclassifi',
            token: 1123456848,
            position: 176,
            stem: true,
          },
          {
            input: 'misclassified',
            token: -950259431,
            position: 176,
            stem: false,
          },
        ],
        [
          {
            input: 'email',
            token: -409830284,
            position: 177,
            stem: false,
          },
        ],
        [
          {
            input: 'confirm',
            token: -1881955516,
            position: 178,
            stem: true,
          },
          {
            input: 'confirms',
            token: 1781569825,
            position: 178,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 179,
            stem: false,
          },
        ],
        [
          {
            input: 'purcha',
            token: -1746637102,
            position: 180,
            stem: true,
          },
          {
            input: 'purchase',
            token: 1628950843,
            position: 180,
            stem: false,
          },
        ],
        [
          {
            input: 'will',
            token: 501661262,
            position: 181,
            stem: false,
          },
        ],
        [
          {
            input: 'receiv',
            token: -869490539,
            position: 182,
            stem: true,
          },
          {
            input: 'receive',
            token: 1869820209,
            position: 182,
            stem: false,
          },
        ],
        [
          {
            input: 'separ',
            token: -491501419,
            position: 183,
            stem: true,
          },
          {
            input: 'separate',
            token: -810837695,
            position: 183,
            stem: false,
          },
        ],
        [
          {
            input: 'email',
            token: -409830284,
            position: 184,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 185,
            stem: false,
          },
        ],
        [
          {
            input: 'ticket',
            token: -1751077469,
            position: 186,
            stem: true,
          },
          {
            input: 'tickets',
            token: 1413914100,
            position: 186,
            stem: false,
          },
        ],
        [
          {
            input: 'chosen',
            token: 294781498,
            position: 187,
            stem: false,
          },
        ],
        [
          {
            input: 'ticket',
            token: -1751077469,
            position: 188,
            stem: true,
          },
          {
            input: 'tickets',
            token: 1413914100,
            position: 188,
            stem: false,
          },
        ],
        [
          {
            input: 'deliv',
            token: -352577790,
            position: 189,
            stem: true,
          },
          {
            input: 'delivered',
            token: 1663731225,
            position: 189,
            stem: false,
          },
        ],
        [
          {
            input: 'not',
            token: 134610293,
            position: 190,
            stem: false,
          },
        ],
        [
          {
            input: 'receiv',
            token: -869490539,
            position: 191,
            stem: true,
          },
          {
            input: 'received',
            token: -915654201,
            position: 191,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 192,
            stem: false,
          },
        ],
        [
          {
            input: 'ticket',
            token: -1751077469,
            position: 193,
            stem: true,
          },
          {
            input: 'tickets',
            token: 1413914100,
            position: 193,
            stem: false,
          },
        ],
        [
          {
            input: '48',
            token: -755934826,
            position: 194,
            stem: false,
          },
        ],
        [
          {
            input: 'hours',
            token: -1977959027,
            position: 195,
            stem: false,
          },
        ],
        [
          {
            input: 'before',
            token: -667198034,
            position: 196,
            stem: false,
          },
        ],
        [
          {
            input: 'event',
            token: 1001261735,
            position: 197,
            stem: false,
          },
        ],
        [
          {
            input: 'plea',
            token: 696878056,
            position: 198,
            stem: true,
          },
          {
            input: 'please',
            token: -1710936086,
            position: 198,
            stem: false,
          },
        ],
        [
          {
            input: 'contact',
            token: 1281549880,
            position: 199,
            stem: false,
          },
        ],
        [
          {
            input: 'us',
            token: -627195958,
            position: 200,
            stem: false,
          },
        ],
        [
          {
            input: 'immedi',
            token: 1295261063,
            position: 201,
            stem: true,
          },
          {
            input: 'immediately',
            token: -274668265,
            position: 201,
            stem: false,
          },
        ],
        [
          {
            input: 'assistanc',
            token: 1095432470,
            position: 202,
            stem: true,
          },
          {
            input: 'assistance',
            token: 458196466,
            position: 202,
            stem: false,
          },
        ],
        [
          {
            input: 'your',
            token: -1732566604,
            position: 203,
            stem: false,
          },
        ],
        [
          {
            input: 'order',
            token: -181824616,
            position: 204,
            stem: false,
          },
        ],
        [
          {
            input: 'avail',
            token: -1794504150,
            position: 205,
            stem: true,
          },
          {
            input: 'available',
            token: -1517312891,
            position: 205,
            stem: false,
          },
        ],
        [
          {
            input: 'email',
            token: -409830284,
            position: 206,
            stem: true,
          },
          {
            input: 'emailing',
            token: 1587322774,
            position: 206,
            stem: false,
          },
        ],
        [
          {
            input: 'info',
            token: -880201385,
            position: 207,
            stem: true,
          },
          {
            input: 'example.com',
            token: -1225109831,
            position: 207,
            stem: true,
          },
          {
            input: 'info@example.com',
            token: 390993611,
            position: 207,
            stem: false,
          },
        ],
        [
          {
            input: 'mailto',
            token: 810002732,
            position: 208,
            stem: true,
          },
          {
            input: 'info',
            token: -880201385,
            position: 208,
            stem: true,
          },
          {
            input: 'example.com',
            token: -1225109831,
            position: 208,
            stem: true,
          },
          {
            input: 'mailto:info@example.com',
            token: -286643502,
            position: 208,
            stem: false,
          },
        ],
        [
          {
            input: 'thank',
            token: 1558786320,
            position: 209,
            stem: false,
          },
        ],
        [
          {
            input: 'choo',
            token: 1903892168,
            position: 210,
            stem: true,
          },
          {
            input: 'choosing',
            token: 2012965551,
            position: 210,
            stem: false,
          },
        ],
        [
          {
            input: 'ticketweb',
            token: 59292339,
            position: 211,
            stem: false,
          },
        ],
        [
          {
            input: 'http',
            token: -1753739854,
            position: 212,
            stem: true,
          },
          {
            input: 'email.t.ticketweb.com',
            token: -1776963108,
            position: 212,
            stem: true,
          },
          {
            input: 'c/14e9fff1-0cb6-419e-a998-6188a46d17fc',
            token: 1040107793,
            position: 212,
            stem: true,
          },
          {
            input:
              'http://email.t.ticketweb.com/c/14e9fff1-0cb6-419e-a998-6188a46d17fc',
            token: -493100521,
            position: 212,
            stem: false,
          },
        ],
      ],
    });
  });
});
