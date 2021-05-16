axios = require('axios');
axios.defaults.baseURL = "http://localhost:5001/afry-test/europe-west1/api";

const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;

function stripResponseData(response) {
  let dataArray = response.data;
  let strippedData = dataArray.map(member => {
    delete member.id;
    delete member.createdAt;
    return member;
  });
  return strippedData;
}

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

    const postResult = await axios.post('/person', person1);
    const person1Id = postResult.data.id;
    await axios.post('/person', person2);

    let expectedResult = [person2, person1]
    let response = await axios.get('/people');
    expect(stripResponseData(response)).to.eql(expectedResult);

    const newCompanyID = 'companyId';
    const newPerson1 = {
      name: 'Kalle Kula',
      companyId: newCompanyID,
    };

    await axios.put(`/person/${person1Id}`, {companyId: newCompanyID});

    expectedResult = [person2, newPerson1]
    response = await axios.get('/people');
    expect(stripResponseData(response)).to.eql(expectedResult);

  });
}); 

describe('companies api', function() {
  it('responds with matching records', async function() {
    const company1 = {
      name: 'Super Company'
    };

    const company2 = {
      name: 'Not So Good Company'
    };

    await axios.post('/company', company1);
    await axios.post('/company', company2);

    let expectedResult = [company2, company1]
    let response = await axios.get('/companies');
    expect(stripResponseData(response)).to.eql(expectedResult);
  });
}); 