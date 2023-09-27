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
  
  function getmemberfromnamegroup(groupname){
    return `SELECT      user_F.username,user_F.img,USER_F.name,USER_F.phone,memo,mood,lat,lng,statusdate
    FROM        GROUP_F,GROUP_MEMBER,user_F,STATUS
    WHERE       GROUP_F.groupid = GROUP_MEMBER.groupid
    AND         GROUP_MEMBER.username = USER_F.username
    AND         USER_F.username = STATUS.username
    AND         GROUP_F.name = '${groupname}'`;
  }

  function createGroup(namegroup,username){
    return `INSERT INTO GROUP_F (name,hostname) VALUES ('${namegroup}','${username}')`;
  }

  function registeruser(username, name, password, img, email, phone, facebook, ig) {
    return `INSERT INTO USER_F (username, name, password, img, email, phone, facebook, ig) VALUES ('${username}', '${name}', '${password}', '${img}', '${email}', '${phone}', '${facebook}', '${ig}');`;
  }

  function getnameGroup(namegroup){
    return `SELECT * FROM GROUP_F WHERE name = '${namegroup}'`
  }
  function addfriendfromGroup(groupname,usernameNew){
    return `INSERT INTO GROUP_MEMBER (groupid, username)
    SELECT GROUP_F.groupid, '${usernameNew}' 
    FROM GROUP_F
    WHERE GROUP_F.name = '${groupname}'`;
  }

  module.exports = {
    getUserQuery,
    loginQuery,
    getuserfromname,
    getGroupusername,
    getmemberfromnamegroup,
    registeruser,
    createGroup,
    getnameGroup,
    addfriendfromGroup
  };
  