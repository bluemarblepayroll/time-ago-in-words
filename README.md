# Time Ago In Words

**Localizable relative time resolver**

[![Build Status](https://travis-ci.org/bluemarblepayroll/time-ago-in-words.svg?branch=master)](https://travis-ci.org/bluemarblepayroll/time-ago-in-words)

This library lets you easily convert a JavaScript Date object to a relative time span description.  For example, let's say the
current date and time is January 1, 2018 12:00:00 PM, then January 10, 2018 12:00:00 PM would resolve to: *in 9 days*.  More general examples:

| Date/Time                       | Relative Description |
| ------------------------------- | -------------------- |
| January 1, 2016 12:00:00 PM)    | 2 years ago          |
| November 1, 2018 12:00:00 PM)   | 2 months ago         |
| December 30, 2017 12:00:00 PM)  | 2 days ago           |
| January 1, 2018 4:00:00 AM)     | 8 hours ago          |
| January 1, 2018 11:00:00 AM)    | 1 hour ago           |
| January 1, 2018 11:50:00 AM)    | 10 minutes ago       |
| January 1, 2018 11:58:00 AM)    | 2 minutes ago        |
| January 1, 2018 11:59:01 AM)    | a minute ago         |
| January 1, 2018 12:00:01 PM)    | in a minute          |
| January 1, 2018 12:02:00 PM)    | in 2 minutes         |
| January 1, 2018 12:10:00 PM)    | in 10 minutes        |
| January 1, 2018 1:00:00 PM)     | in 1 hour            |
| January 1, 2018 8:00:00 PM)     | in 8 hours           |
| January 3, 2018 12:00:00 PM)    | in 2 days            |
| April 1, 2018 12:00:00 PM)      | in 2 months          |
| January 1, 2020 12:00:00 PM)    | in 2 years           |

Another important feature of this library is its ability to localize any of the relative expressions.  See examples below for more information.

## Credit

Rail's time_ago_in_words along with (this gist)[https://gist.github.com/boxnos/5896114] helped inspire this library's API and internal implementation.

## Installation

This library could be consumed as either a pure TypeScript library or as its trans-compiled ES2015 JavaScript counterpart.

To install through NPM:

````
npm install --save @bluemarblepayroll/time-ago-in-words
````

To install through Yarn:

````
yarn add @bluemarblepayroll/time-ago-in-words
````

## Examples

### A Basic Example

Suppose you just want to get the relative time between a Date and now (in our case lets use January 1, 2018 12:00:00 PM):

````
let from = new Date(2017, 11, 31, 23); # December 31, 2017 11:00:00 PM
let value = TimeAgo.inWords(from); # "13 hours ago"
````

It also works for future times as well:

````
let from = new Date(2020, 0, 1, 12); # January 1, 2020 12:00:00 PM
let value = TimeAgo.inWords(from); # "in 2 years"
````

### Explicit Time Span Example

You can also pass in each part of the time span (from and to).  Using the above examples, respectively, would become:

````
let from = new Date(2017, 11, 31, 23); # December 31, 2017 11:00:00 PM
let to = new Date(2018, 0, 1, 12); # January 1, 2018 12:00:00 PM
let value = TimeAgo.inWords(from, to); # "13 hours ago"
````

````
let from = new Date(2020, 0, 1, 12); # January 1, 2020 12:00:00 PM
let to = new Date(2018, 0, 1, 12); # January 1, 2018 12:00:00 PM
let value = TimeAgo.inWords(from, to); # "in 2 years"
````

### Custom Localization Example

It is also possible to define custom translations.  For all possible translations, see baseTranslations assignment within the file: ./lib/i18n.ts.

Based on our previous examples, let's say we wanted to localize the following phrases:

* "%s hours ago" => "hace %s horas"
* "in %s years" => "en %s años"

Based on our initial examples, respectively, we can achieve this like so:

````
TimeAgo.Translator.set({ '%s hours ago': 'hace %s horas' });
let from = new Date(2017, 11, 31, 23); # December 31, 2017 11:00:00 PM
let value = TimeAgo.inWords(from); # "hace 13 horas"
````

````
TimeAgo.Translator.set({ 'in %s years': 'en %s años' });
let from = new Date(2020, 0, 1, 12); # January 1, 2020 12:00:00 PM
let value = TimeAgo.inWords(from); # "en 2 años"
````

If you wish to revert back to default translations:

````
TimeAgo.Translator.reset()
````

## Contributing

### Development Environment Configuration

Basic steps to take to get this repository compiling:

1. Install [Node.js](https://nodejs.org) (check package.json for versions supported.)
2. Install Yarn package manager (npm install -g yarn)
3. Clone the repository (git clone git@github.com:bluemarblepayroll/time-ago-in-words.git)
4. Navigate to the root folder (cd time-ago-in-words)
5. Install dependencies (yarn)

### Compiling

To compile the TypeScript source down to native JavaScript, run:

````
npm run build
````

### Running Tests

To execute the test suite first compile the solution then run:

````
npm run test
````

## License

This project is MIT Licensed.
