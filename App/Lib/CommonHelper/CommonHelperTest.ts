import {invokeOnPath} from '../../Lib/CommonHelper/index';

test('Invoke a function on specified path', () => {
  const obj = {
    action: {
      meta: {
        onSuccess: () => 'abc',
      },
    },
  };

  expect(invokeOnPath(['action', 'meta', 'onSuccess'], obj)).toEqual('abc');
  expect(invokeOnPath(['action', 'meta2', 'onSuccess'], obj)).toBeUndefined();
});
