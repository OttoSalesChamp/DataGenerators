const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const Chance = require('chance');
const chance = new Chance();

// Define the CSV writer
const csvWriter = createObjectCsvWriter({
  path: 'dutch_addresses.csv',
  header: [
    { id: 'street', title: 'street' },
    { id: 'huisnummer', title: 'huisnummer' },
    { id: 'houseNumberAddition', title: 'house number addition' },
    { id: 'postcode', title: 'postcode' },
    { id: 'woonplaats', title: 'woonplaats' },
    { id: 'lon', title: 'lon' },
    { id: 'lat', title: 'lat' },
  ],
});

// Generate random Dutch addresses
const generateRandomDutchData = (count) => {
  return Array.from({ length: count }).map(() => ({
    street: chance.street(),
    huisnummer: chance.integer({ min: 1, max: 200 }),
    houseNumberAddition: chance.pickone(['', 'a', 'b', 'c', 'd']),
    postcode: chance.postal(),
    woonplaats: chance.city(),
    lon: chance.longitude({ min: 3.358, max: 7.227 }),
    lat: chance.latitude({ min: 50.753, max: 53.511 }),
  }));
};

// Adjust the number of records as needed
const numberOfRecords = 90_000;
const data = generateRandomDutchData(numberOfRecords);

// Write data to CSV
csvWriter
  .writeRecords(data)
  .then(() => console.log('CSV file was written successfully'))
  .catch(err => console.error('Error writing CSV file', err));
