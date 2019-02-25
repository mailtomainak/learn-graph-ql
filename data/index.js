const axios = require("axios");
const getUsersById = id =>
  axios
    .get(`http://localhost:3000/users/${id}`)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });

const getCompanyById = id =>
  axios
    .get(`http://localhost:3000/companies/${id}`)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });

exports.getUsersById = getUsersById;
exports.getCompanyById = getCompanyById;
