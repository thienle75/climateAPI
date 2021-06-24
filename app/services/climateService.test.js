const climateService = require('./climateService');
test('get the list at least one item', () => {
  expect(climateService).toBeDefined();
});
test('find median', () => {
  const arr = [{mean:1},{mean:2},{mean:2},{mean:3}];
  expect(climateService.findMedian(arr)).toBe(2);
});