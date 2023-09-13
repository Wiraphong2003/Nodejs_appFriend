function getUserQuery() {
    return 'SELECT * FROM USER_F';
  }
  
  function loginQuery(username, password) {
    return `SELECT * FROM USER_F WHERE username = '${username}' AND password = '${password}'`;
  }
  function getuserfromname(username){
    return `SELECT * FROM USER_F WHERE username = '${username}'`;
  }
  
  module.exports = {
    getUserQuery,
    loginQuery,
    getuserfromname
  };
  