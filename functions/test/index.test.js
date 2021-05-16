axios = require('axios');
axios.defaults.baseURL = "http://localhost:5001/afry-test/europe-west1/api";

const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;

describe('people api', function() {
  it('responds with matching records', async function() {
    const person1 = {
      name: 'Kalle Kula',
      companyId: null,
    };

    const person2 = {
      name: 'John Doe',
      companyId: 'cmpdEbj9Ssax8vGSr9el',
    };

    axios.post('/person', person1);
    axios.post('/person', person2);

    const expectedResult = [person1, person2]
    const response = await axios.get('/people');
    const people = response.data;
    const strippedPeople = people.map(person => {
      delete person.personId;
      delete person.createdAt;
      return person;
    });
    expect(strippedPeople).to.eql(expectedResult);
  });
}); 