/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import { I18n } from "./i18n";
 import { BinarySearch } from "./binary_search";

export namespace TimeAgo {

  enum Unit {
    Years = 'year',
    Months = 'month',
    Days = 'day',
    Hours = 'hour',
    Minutes = 'minute'
  }

  enum Tense {
    Past,
    Future
  }

  class TimeSpan {
    unit:Unit;
    tense:Tense;
    value:number;

    constructor(unit:Unit, tense:Tense, value:number) {
      this.unit = unit;
      this.tense = tense;
      this.value = value;
    }

    template():string {
      if (this.unit === Unit.Minutes && this.value === 0 && this.tense === Tense.Future) {
        return `in a minute`;
      } else if (this.unit === Unit.Minutes && this.value === 0 && this.tense === Tense.Past) {
        return `less than a minute ago`;
      } else if (this.tense === Tense.Past) {
        return `%s ${this.noun()} ago`;
      } else if (this.tense == Tense.Future) {
        return `in %s ${this.noun()}`;
      } else {
        throw `Tense cannot be handled: ${this.tense}`;
      }
    }

    private noun():string {
      if (this.value > 1) {
        return `${this.unit}s`;
      }

      return this.unit;
    }
  }

  interface ValueResolver {
    (minutes:number):number;
  }

  interface MinutesEntry extends BinarySearch.Entry {
    unit:Unit;
    tense:Tense;
    valueResolver:ValueResolver;
  }

  const minuteRanges:Array<MinutesEntry> = [
    { key: Number.NEGATIVE_INFINITY, unit: Unit.Years,    tense: Tense.Future, valueResolver: m => parseInt(Math.abs(m / 525960).toFixed(), 10) },
    { key: -529600                 , unit: Unit.Years,    tense: Tense.Future, valueResolver: _ => 1 },
    { key: -486400                 , unit: Unit.Months,   tense: Tense.Future, valueResolver: m => parseInt(Math.abs(m / 43200).toFixed(), 10) },
    { key: -43200                  , unit: Unit.Months,   tense: Tense.Future, valueResolver: _ => 1 },
    { key: -41760                  , unit: Unit.Days,     tense: Tense.Future, valueResolver: m => parseInt(Math.abs(m / 1440).toFixed(), 10) },
    { key: -1440                   , unit: Unit.Days,     tense: Tense.Future, valueResolver: _ => 1 },
    { key: -1380                   , unit: Unit.Hours,    tense: Tense.Future, valueResolver: m => parseInt(Math.abs(m / 60).toFixed(), 10) },
    { key: -45                     , unit: Unit.Hours,    tense: Tense.Future, valueResolver: _ => 1 },
    { key: -44                     , unit: Unit.Minutes,  tense: Tense.Future, valueResolver: m => parseInt(Math.abs(m).toFixed(), 10) },
    { key: -1                      , unit: Unit.Minutes,  tense: Tense.Future, valueResolver: _ => 0 },
    { key: 0                       , unit: Unit.Minutes,  tense: Tense.Past,   valueResolver: _ => 0 },
    { key: 1                       , unit: Unit.Minutes,  tense: Tense.Past,   valueResolver: _ => 1 },
    { key: 2                       , unit: Unit.Minutes,  tense: Tense.Past,   valueResolver: m => parseInt(m.toFixed(), 10) },
    { key: 45                      , unit: Unit.Hours,    tense: Tense.Past,   valueResolver: _ => 1 },
    { key: 90                      , unit: Unit.Hours,    tense: Tense.Past,   valueResolver: m => parseInt((m / 60).toFixed(), 10) },
    { key: 1440                    , unit: Unit.Days,     tense: Tense.Past,   valueResolver: _ => 1 },
    { key: 2880                    , unit: Unit.Days,     tense: Tense.Past,   valueResolver: m => parseInt((m / 1440).toFixed(), 10) },
    { key: 43200                   , unit: Unit.Months,   tense: Tense.Past,   valueResolver: _ => 1 },
    { key: 86400                   , unit: Unit.Months,   tense: Tense.Past,   valueResolver: m => parseInt((m / 43200).toFixed(), 10) },
    { key: 529600                  , unit: Unit.Years,    tense: Tense.Past,   valueResolver: _ => 1 },
    { key: 1051200                 , unit: Unit.Years,    tense: Tense.Past,   valueResolver: m => parseInt((m / 525960).toFixed(), 10) },
    { key: Number.MAX_VALUE        , unit: null,          tense: null,         valueResolver: _ => null }
  ];

  function getTimeSpan(from:Date, to:Date):TimeSpan {
    let minutes:number = (+to - +from) / 60000;

    let match:MinutesEntry = BinarySearch.search(minuteRanges, minutes) as MinutesEntry;

    return new TimeSpan(match.unit, match.tense, match.valueResolver(minutes));
  }

  export function inWords(from:Date, to:Date = new Date()):string {
    let timeSpan:TimeSpan = getTimeSpan(from, to);

    return I18n.translate(timeSpan.template(), timeSpan.value.toString());
  }

  export const Translator = {
    reset: I18n.reset,
    set: I18n.set
  }
}
