const climateService = require('./climateService');
test('get the list at least one item', () => {
  expect(climateService).toBeDefined();
});
test('find median', () => {
  const arr = [
    {
        "urbanName": "Toronto",
        "climateIdentifier": "6158355",
        "dist": 1.3405449523176116,
        "mean": "-10.2"
    },
    {
        "urbanName": "Montréal",
        "climateIdentifier": "7024745",
        "dist": 0.6191811619941483,
        "mean": "-16.9"
    },
    {
        "urbanName": "Vancouver",
        "climateIdentifier": "1108446",
        "dist": 5.110873557653034,
        "mean": "3.1"
    }];
  expect(climateService.findMedian(arr)).toBe(-8);
});