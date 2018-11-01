/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect } from "chai";
import { timeAgoInWords, timeAgoReset, timeAgoSet } from "../lib/time_ago";

describe("when using custom translations", () => {

  beforeEach( () => {
    timeAgoReset();
  });

  it("should correctly translate: less than a minute ago", () => {

    timeAgoSet({ "less than a minute ago": "abc" });

    const from = new Date(2017, 11, 31, 23, 59, 1);
    const to = new Date(2018, 0);

    const result = timeAgoInWords(from, to);
    expect(result).to.equal("abc");
  });

  it("should correctly translate: in a minute", () => {

    timeAgoSet({ "in a minute": "abc" });

    const from = new Date(2018, 0, 1, 0, 0, 1);
    const to = new Date(2018, 0);

    const result = timeAgoInWords(from, to);
    expect(result).to.equal("abc");
  });

});

describe("TimeAgo#inWords", () => {

  beforeEach( () => {
    timeAgoReset();
  });

  it("when from date is more than 2 years back in the past", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(1805, 0),  to, "213 years ago" ],
      [ new Date(1905, 0),  to, "113 years ago" ],
      [ new Date(1975, 0),  to, "43 years ago" ],
      [ new Date(1995, 0),  to, "23 years ago" ],
      [ new Date(2000, 0),  to, "18 years ago" ],
      [ new Date(2005, 0),  to, "13 years ago" ],
      [ new Date(2010, 0),  to, "8 years ago" ],
      [ new Date(2015, 0),  to, "3 years ago" ],
      [ new Date(2016, 0),  to, "2 years ago" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when from date is more than 1 but less than 2 years back in the past", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2016, 1),  to, "1 year ago" ],
      [ new Date(2016, 2),  to, "1 year ago" ],
      [ new Date(2016, 3),  to, "1 year ago" ],
      [ new Date(2016, 4),  to, "1 year ago" ],
      [ new Date(2016, 5),  to, "1 year ago" ],
      [ new Date(2016, 6),  to, "1 year ago" ],
      [ new Date(2016, 7),  to, "1 year ago" ],
      [ new Date(2016, 8),  to, "1 year ago" ],
      [ new Date(2016, 9),  to, "1 year ago" ],
      [ new Date(2016, 10), to, "1 year ago" ],
      [ new Date(2016, 11), to, "1 year ago" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when from date is less than 1 year back in the past", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2017, 0),      to, "12 months ago" ],
      [ new Date(2017, 1),      to, "11 months ago" ],
      [ new Date(2017, 2),      to, "10 months ago" ],
      [ new Date(2017, 3),      to, "9 months ago" ],
      [ new Date(2017, 4),      to, "8 months ago" ],
      [ new Date(2017, 5),      to, "7 months ago" ],
      [ new Date(2017, 6),      to, "6 months ago" ],
      [ new Date(2017, 7),      to, "5 months ago" ],
      [ new Date(2017, 8),      to, "4 months ago" ],
      [ new Date(2017, 9),      to, "3 months ago" ],
      [ new Date(2017, 10),     to, "2 months ago" ],
      [ new Date(2017, 11),     to, "1 month ago" ],
      [ new Date(2017, 11, 0),  to, "1 month ago" ],
      [ new Date(2017, 11, 1),  to, "1 month ago" ],
      [ new Date(2017, 11, 2),  to, "1 month ago" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when from date is less than 1 month back in the past", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2017, 11, 3),      to, "29 days ago" ],
      [ new Date(2017, 11, 6),      to, "26 days ago" ],
      [ new Date(2017, 11, 9),      to, "23 days ago" ],
      [ new Date(2017, 11, 12),     to, "20 days ago" ],
      [ new Date(2017, 11, 15),     to, "17 days ago" ],
      [ new Date(2017, 11, 18),     to, "14 days ago" ],
      [ new Date(2017, 11, 21),     to, "11 days ago" ],
      [ new Date(2017, 11, 24),     to, "8 days ago" ],
      [ new Date(2017, 11, 27),     to, "5 days ago" ],
      [ new Date(2017, 11, 28),     to, "4 days ago" ],
      [ new Date(2017, 11, 29),     to, "3 days ago" ],
      [ new Date(2017, 11, 30),     to, "2 days ago" ],
      [ new Date(2017, 11, 31),     to, "1 day ago" ],
      [ new Date(2017, 11, 31, 0),  to, "1 day ago" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when from date is less than 1 day back up until 15 minutes in the past", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2017, 11, 31, 1),      to, "23 hours ago" ],
      [ new Date(2017, 11, 31, 4),      to, "20 hours ago" ],
      [ new Date(2017, 11, 31, 7),      to, "17 hours ago" ],
      [ new Date(2017, 11, 31, 10),     to, "14 hours ago" ],
      [ new Date(2017, 11, 31, 13),     to, "11 hours ago" ],
      [ new Date(2017, 11, 31, 16),     to, "8 hours ago" ],
      [ new Date(2017, 11, 31, 19),     to, "5 hours ago" ],
      [ new Date(2017, 11, 31, 22),     to, "2 hours ago" ],
      [ new Date(2017, 11, 31, 23),     to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 0),  to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 1),  to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 2),  to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 3),  to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 4),  to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 5),  to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 6),  to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 7),  to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 8),  to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 9),  to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 10), to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 11), to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 12), to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 13), to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 14), to, "1 hour ago" ],
      [ new Date(2017, 11, 31, 23, 15), to, "1 hour ago" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when from date is less than 45 minutes in the past", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2017, 11, 31, 23, 16), to, "44 minutes ago" ],
      [ new Date(2017, 11, 31, 23, 17), to, "43 minutes ago" ],
      [ new Date(2017, 11, 31, 23, 18), to, "42 minutes ago" ],
      [ new Date(2017, 11, 31, 23, 19), to, "41 minutes ago" ],
      [ new Date(2017, 11, 31, 23, 20), to, "40 minutes ago" ],
      [ new Date(2017, 11, 31, 23, 25), to, "35 minutes ago" ],
      [ new Date(2017, 11, 31, 23, 30), to, "30 minutes ago" ],
      [ new Date(2017, 11, 31, 23, 40), to, "20 minutes ago" ],
      [ new Date(2017, 11, 31, 23, 50), to, "10 minutes ago" ],
      [ new Date(2017, 11, 31, 23, 58), to, "2 minutes ago" ],
      [ new Date(2017, 11, 31, 23, 59), to, "1 minute ago" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when the from date is less an 1 minute in the past", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2017, 11, 31, 23, 59, 1),  to, "less than a minute ago" ],
      [ new Date(2017, 11, 31, 23, 59, 10), to, "less than a minute ago" ],
      [ new Date(2017, 11, 31, 23, 59, 20), to, "less than a minute ago" ],
      [ new Date(2017, 11, 31, 23, 59, 30), to, "less than a minute ago" ],
      [ new Date(2017, 11, 31, 23, 59, 40), to, "less than a minute ago" ],
      [ new Date(2017, 11, 31, 23, 59, 50), to, "less than a minute ago" ],
      [ new Date(2017, 11, 31, 23, 59, 58), to, "less than a minute ago" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when the from date is less than 1 minute in the future", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2018, 0, 1, 0, 0, 1),  to, "in a minute" ],
      [ new Date(2018, 0, 1, 0, 0, 2),  to, "in a minute" ],
      [ new Date(2018, 0, 1, 0, 0, 10), to, "in a minute" ],
      [ new Date(2018, 0, 1, 0, 0, 20), to, "in a minute" ],
      [ new Date(2018, 0, 1, 0, 0, 30), to, "in a minute" ],
      [ new Date(2018, 0, 1, 0, 0, 40), to, "in a minute" ],
      [ new Date(2018, 0, 1, 0, 0, 50), to, "in a minute" ],
      [ new Date(2018, 0, 1, 0, 0, 59), to, "in a minute" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when the from date is more than 1 minute in the future", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2018, 0, 1, 0, 2),   to, "in 2 minutes" ],
      [ new Date(2018, 0, 1, 0, 3),   to, "in 3 minutes" ],
      [ new Date(2018, 0, 1, 0, 4),   to, "in 4 minutes" ],
      [ new Date(2018, 0, 1, 0, 5),   to, "in 5 minutes" ],
      [ new Date(2018, 0, 1, 0, 10),  to, "in 10 minutes" ],
      [ new Date(2018, 0, 1, 0, 20),  to, "in 20 minutes" ],
      [ new Date(2018, 0, 1, 0, 30),  to, "in 30 minutes" ],
      [ new Date(2018, 0, 1, 0, 40),  to, "in 40 minutes" ],
      [ new Date(2018, 0, 1, 0, 40),  to, "in 40 minutes" ],
      [ new Date(2018, 0, 1, 0, 41),  to, "in 41 minutes" ],
      [ new Date(2018, 0, 1, 0, 42),  to, "in 42 minutes" ],
      [ new Date(2018, 0, 1, 0, 43),  to, "in 43 minutes" ],
      [ new Date(2018, 0, 1, 0, 44),  to, "in 44 minutes" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when the from date is more than 45 minutes and less than 1 day in the future", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2018, 0, 1, 0, 45),   to, "in 1 hour" ],
      [ new Date(2018, 0, 1, 0, 46),   to, "in 1 hour" ],
      [ new Date(2018, 0, 1, 0, 47),   to, "in 1 hour" ],
      [ new Date(2018, 0, 1, 0, 48),   to, "in 1 hour" ],
      [ new Date(2018, 0, 1, 0, 49),   to, "in 1 hour" ],
      [ new Date(2018, 0, 1, 0, 50),   to, "in 1 hour" ],
      [ new Date(2018, 0, 1, 0, 55),   to, "in 1 hour" ],
      [ new Date(2018, 0, 1, 0, 59),   to, "in 1 hour" ],
      [ new Date(2018, 0, 1, 1, 0),    to, "in 1 hour" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when the from date is more than 1 hour and less than 1 day in the future", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2018, 0, 1, 2),   to, "in 2 hours" ],
      [ new Date(2018, 0, 1, 3),   to, "in 3 hours" ],
      [ new Date(2018, 0, 1, 4),   to, "in 4 hours" ],
      [ new Date(2018, 0, 1, 5),   to, "in 5 hours" ],
      [ new Date(2018, 0, 1, 6),   to, "in 6 hours" ],
      [ new Date(2018, 0, 1, 7),   to, "in 7 hours" ],
      [ new Date(2018, 0, 1, 8),   to, "in 8 hours" ],
      [ new Date(2018, 0, 1, 9),   to, "in 9 hours" ],
      [ new Date(2018, 0, 1, 10),  to, "in 10 hours" ],
      [ new Date(2018, 0, 1, 20),  to, "in 20 hours" ],
      [ new Date(2018, 0, 1, 23),  to, "in 23 hours" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when the from date is 1 or more months and less than 1 year in the future", () => {
    const to = new Date(2018, 0);

    const tests = [
      [ new Date(2018, 1),  to, "in 1 month" ],
      [ new Date(2018, 2),  to, "in 2 months" ],
      [ new Date(2018, 3),  to, "in 3 months" ],
      [ new Date(2018, 4),  to, "in 4 months" ],
      [ new Date(2018, 5),  to, "in 5 months" ],
      [ new Date(2018, 10), to, "in 10 months" ],
      [ new Date(2018, 11), to, "in 11 months" ],
    ];

    tests.forEach((x) => {
      const result = timeAgoInWords(x[0] as Date, x[1] as Date);
      expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
    });
  });

  it("when the from date is 1 or more years in the future", () => {
      const to = new Date(2018, 0);

      const tests = [
        [ new Date(2019, 0),  to, "in 1 year" ],
        [ new Date(2020, 0),  to, "in 2 years" ],
        [ new Date(2021, 0),  to, "in 3 years" ],
        [ new Date(2022, 0),  to, "in 4 years" ],
        [ new Date(2023, 0),  to, "in 5 years" ],
        [ new Date(2033, 0),  to, "in 15 years" ],
        [ new Date(2133, 0),  to, "in 115 years" ],
        [ new Date(2233, 0),  to, "in 215 years" ],
      ];

      tests.forEach((x) => {
        const result = timeAgoInWords(x[0] as Date, x[1] as Date);
        expect(result).to.equal(x[2], `Failed on: ${x[0]}`);
      });
  });
});
