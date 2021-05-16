axios = require('axios');
axios.defaults.baseURL = "http://localhost:5001/afry-test-xxx/europe-west1/api";

describe('#find()', function() {
  it('responds with matching records', async function() {
    const people = await axios.get('/people');
    users.should.have.length(3);
  });
});