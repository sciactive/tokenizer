import { Tokenizer } from "./Tokenizer.mjs";

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

/*
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
*/

const tokenizer = new Tokenizer();
const detailed = tokenizer.detailedTokenize(input);
const tokens = tokenizer.tokenize(input);

console.log("Input:", input);
console.log("\nOriginal:", detailed.original.join(" "));
console.log("\nStemmed:", detailed.stemmed.join(" "));
console.log(
  "\nDetailed Tokens:\n ",
  detailed.tokens.map((tokenSet) => JSON.stringify(tokenSet)).join("\n  ")
);
console.log("\nTokens:", JSON.stringify(tokens));
