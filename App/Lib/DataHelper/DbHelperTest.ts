import {isResponseOk} from '../../Lib/DataHelper/index';

test('isOkResponse function should work as expected', () => {
  expect(isResponseOk({ok: true, data: {}})).toBeTruthy();
  expect(
    isResponseOk({ok: true, data: {error: 'An error occured'}}),
  ).toBeFalsy();
  expect(isResponseOk({ok: false, data: {}})).toBeFalsy();
});
