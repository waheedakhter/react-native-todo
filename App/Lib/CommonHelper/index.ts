import * as R from "ramda";

/**
 *
 * @description This file contains common functions used in the app.
 * like: Formats the date in the given format,
 * checking the Device size greater than 350,
 * checking strings if the string null
 */

export const isNilOrEmpty = R.either(R.isNil, R.isEmpty);
export const invokeOnPath = R.curry((path, item) => R.compose(R.ifElse(isNilOrEmpty, R.empty, R.call), R.path(path))(item));
