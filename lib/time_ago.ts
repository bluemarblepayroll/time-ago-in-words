/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { binarySearch, IEntry } from "./binary_search";
import { reset, set, translate } from "./i18n";

enum Unit {
  Years = "year",
  Months = "month",
  Days = "day",
  Hours = "hour",
  Minutes = "minute",
}

enum Tense {
  Past,
  Future,
}

class TimeSpan {
  public unit: Unit;
  public tense: Tense;
  public value: number;

  constructor(unit: Unit, tense: Tense, value: number) {
    this.unit = unit;
    this.tense = tense;
    this.value = value;
  }

  public template(): string {
    if (this.unit === Unit.Minutes && this.value === 0 && this.tense === Tense.Future) {
      return `in a minute`;
    } else if (this.unit === Unit.Minutes && this.value === 0 && this.tense === Tense.Past) {
      return `less than a minute ago`;
    } else if (this.tense === Tense.Past) {
      return `%s ${this.noun()} ago`;
    } else if (this.tense === Tense.Future) {
      return `in %s ${this.noun()}`;
    } else {
      throw new Error(`Tense cannot be handled: ${this.tense}`);
    }
  }

  private noun(): string {
    if (this.value > 1) {
      return `${this.unit}s`;
    }

    return this.unit;
  }
}

type ValueResolver = (minutes: number) => number;

interface IMinutesEntry extends IEntry {
  unit: Unit;
  tense: Tense;
  valueResolver: ValueResolver;
}

const minuteRanges: IMinutesEntry[] = [
  {
    key: Number.NEGATIVE_INFINITY,
    tense: Tense.Future,
    unit: Unit.Years,
    valueResolver: (m) => parseInt(Math.abs(m / 525960).toFixed(), 10),
  },
  {
    key: -529600,
    tense: Tense.Future,
    unit: Unit.Years,
    valueResolver: (_) => 1,
  },
  {
    key: -486400,
    tense: Tense.Future,
    unit: Unit.Months,
    valueResolver: (m) => parseInt(Math.abs(m / 43200).toFixed(), 10),
  },
  {
    key: -43200,
    tense: Tense.Future,
    unit: Unit.Months,
    valueResolver: (_) => 1,
  },
  {
    key: -41760,
    tense: Tense.Future,
    unit: Unit.Days,
    valueResolver: (m) => parseInt(Math.abs(m / 1440).toFixed(), 10),
  },
  {
    key: -1440,
    tense: Tense.Future,
    unit: Unit.Days,
    valueResolver: (_) => 1,
  },
  {
    key: -1380,
    tense: Tense.Future,
    unit: Unit.Hours,
    valueResolver: (m) => parseInt(Math.abs(m / 60).toFixed(), 10),
  },
  {
    key: -45,
    tense: Tense.Future,
    unit: Unit.Hours,
    valueResolver: (_) => 1 },
  {
    key: -44,
    tense: Tense.Future,
    unit: Unit.Minutes,
    valueResolver: (m) => parseInt(Math.abs(m).toFixed(), 10),
  },
  {
    key: -1,
    tense: Tense.Future,
    unit: Unit.Minutes,
    valueResolver: (_) => 0,
  },
  {
    key: 0,
    tense: Tense.Past,
    unit: Unit.Minutes,
    valueResolver: (_) => 0,
  },
  {
    key: 1,
    tense: Tense.Past,
    unit: Unit.Minutes,
    valueResolver: (_) => 1,
  },
  {
    key: 2,
    tense: Tense.Past,
    unit: Unit.Minutes,
    valueResolver: (m) => parseInt(m.toFixed(), 10),
  },
  {
    key: 45,
    tense: Tense.Past,
    unit: Unit.Hours,
    valueResolver: (_) => 1,
  },
  {
    key: 90,
    tense: Tense.Past,
    unit: Unit.Hours,
    valueResolver: (m) => parseInt((m / 60).toFixed(), 10),
  },
  {

    key: 1440,
    tense: Tense.Past,
    unit: Unit.Days,
    valueResolver: (_) => 1,
  },
  {
    key: 2880,
    tense: Tense.Past,
    unit: Unit.Days,
    valueResolver: (m) => parseInt((m / 1440).toFixed(), 10),
  },
  {
    key: 43200,
    tense: Tense.Past,
    unit: Unit.Months,
    valueResolver: (_) => 1,
  },
  {
    key: 86400,
    tense: Tense.Past,
    unit: Unit.Months,
    valueResolver: (m) => parseInt((m / 43200).toFixed(), 10),
  },
  {
    key: 529600,
    tense: Tense.Past,
    unit: Unit.Years,
    valueResolver: (_) => 1,
  },
  {
    key: 1051200,
    tense: Tense.Past,
    unit: Unit.Years,
    valueResolver: (m) => parseInt((m / 525960).toFixed(), 10),
  },
  {
    key: Number.MAX_VALUE,
    tense: null,
    unit: null,
    valueResolver: (_) => null,
  },
];

function getTimeSpan(from: Date, to: Date): TimeSpan {
  const minutes: number = (+to - +from) / 60000;

  const match: IMinutesEntry = binarySearch(minuteRanges, minutes) as IMinutesEntry;

  return new TimeSpan(match.unit, match.tense, match.valueResolver(minutes));
}

export function timeAgoInWords(from: Date, to: Date = new Date()): string {
  const timeSpan: TimeSpan = getTimeSpan(from, to);

  return translate(timeSpan.template(), timeSpan.value.toString());
}

export {
  reset as timeAgoReset,
  set as timeAgoSet,
};
