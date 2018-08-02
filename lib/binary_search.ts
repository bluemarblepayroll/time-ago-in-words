/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export namespace BinarySearch {

  export interface Entry {
    key:number;
  }

  function innerSearch(array:Array<Entry>, value:number, lower:number, pos:number, upper:number):Entry {
    if (array[pos].key <= value && value < array[pos + 1].key) {
      return array[pos];
    } else if (value < array[pos].key) {
      return innerSearch(array, value, lower, Math.floor((lower + pos - 1) / 2), pos - 1);
    }

    return innerSearch(array, value, pos + 1, Math.floor((pos + 1 + upper) / 2), upper);
  }

  export function search(array:Array<Entry>, value:number):Entry {
    return innerSearch(array, value, 0, Math.floor((array.length - 1) / 2), array.length - 1);
  }
}
