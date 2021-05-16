axios = require('axios');
axios.defaults.baseURL = "http://localhost:5001/afry-test/europe-west1/api";

const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;

describe('people api', function() {
  it('responds with matching records', async function() {
    const expectedResult = [
      {
        name: 'Kalle Kula',
        companyId: null,
        createdAt: '2021-05-11T19:17:41.123Z'
      },
      {
        name: 'John Doe',
        companyId: 'cmpdEbj9Ssax8vGSr9el',
        createdAt: '2021-05-11T19:16:41.123Z'
      }
    ]
    const response = await axios.get('/people');
    const people = response.data;
    const peopleWithoutId = people.map(person => {
      delete person.personId;
      return person;
    });
    expect(peopleWithoutId).to.eql(expectedResult);
  });
}); 