const apiKeyService = require('./apikeyService');
test('enter correct key', () => {
  expect(apiKeyService.validateAPIKey('thisisatestfortealbook')).toBe(true);
});
test('enter not correct key', () => {
  expect(apiKeyService.validateAPIKey('tealbook')).toBe(false);
});