/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export namespace I18n {

  const baseTranslations:Record<string, string> = {
    'in %s year': null,
    'in %s years': null,
    'in %s month': null,
    'in %s months': null,
    'in %s day': null,
    'in %s days': null,
    'in %s hour': null,
    'in %s hours': null,
    'in %s minutes': null,
    'in a minute': null,
    'less than a minute ago': null,
    '%s minute ago': null,
    '%s minutes ago': null,
    '%s hour ago': null,
    '%s hours ago': null,
    '%s day ago': null,
    '%s days ago': null,
    '%s month ago': null,
    '%s months ago': null,
    '%s year ago': null,
    '%s years ago': null
  }

  let translations:Record<string, string>;

  export function reset():void {
    translations = { };

    for (let key in baseTranslations) {
      translations[key] = baseTranslations[key];
    }
  }

  reset();

  export function set(newTranslations:Record<string, string>):void {
    if (!newTranslations) {
      return;
    }

    for (let key in newTranslations) {
      translations[key] = newTranslations[key];
    }
  }

  function get(phrase:string):string {
    if (!translations[phrase]) {
      return phrase || '';
    }

    return translations[phrase] || '';
  }

  export function translate(phrase:string, value:string):string {
    let translatedPhrase:string = get(phrase);

    return translatedPhrase.replace('%s', value);
  }
}
