function getUserQuery() {
    return `select      USER_F.*,memo,mood,lat,lng,statusdate
            FROM        USER_F,STATUS
            WHERE       USER_F.username = STATUS.username`;
  }
  
  function loginQuery(username, password) {
    return `SELECT * FROM USER_F WHERE username = '${username}' AND password = '${password}'`;
  }
  function getuserfromname(username){
    return `SELECT * FROM USER_F WHERE username = '${username}'`;
  }
  function getGroupusername(username){
    return `select  GROUP_F.name
    from    GROUP_MEMBER,USER_F,GROUP_F
    where   USER_F.username = GROUP_MEMBER.username
    and     GROUP_MEMBER.groupid = GROUP_F.groupid
    and     USER_F.username = '${username}'`;
  }
  
  module.exports = {
    getUserQuery,
    loginQuery,
    getuserfromname,
    getGroupusername
  };
  