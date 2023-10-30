function insertuserhomecoming(firstName,lastName,nickName,type,Drinking,Food_allergy){
  return `INSERT INTO userhomecoming (firstName,lastName,nickName,[type],Drinking,Food_allergy) VALUES ('${firstName}','${lastName}','${nickName}','${type}','${Drinking}','${Food_allergy}')`
}


// ===============================================================


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
    return `select  GROUP_F.groupid,GROUP_F.name
    from    GROUP_MEMBER,USER_F,GROUP_F
    where   USER_F.username = GROUP_MEMBER.username
    and     GROUP_MEMBER.groupid = GROUP_F.groupid
    and     USER_F.username = '${username}'`;
  }
  
  function getmemberfromnamegroup(memid){
    // return `SELECT      user_F.username,user_F.img,USER_F.name,USER_F.phone,memo,mood,lat,lng,statusdate
    // FROM        GROUP_F,GROUP_MEMBER,user_F,STATUS
    // WHERE       GROUP_F.groupid = GROUP_MEMBER.groupid
    // AND         GROUP_MEMBER.username = USER_F.username
    // AND         USER_F.username = STATUS.username
    // AND         GROUP_F.name = '${groupname}'
    // AND         GROUP_F.groupid = ${memid}`;


    // return `select  GROUP_MEMBER.username,USER_F.name,USER_F.img,USER_F.phone,USER_F.facebook,USER_F.ig
    // from    GROUP_MEMBER,USER_F
    // WHERE   GROUP_MEMBER.username = USER_F.username
    // AND     groupid = ${memid}`;

    return `SELECT  GROUP_MEMBER.username,USER_F.name,USER_F.img,USER_F.phone,USER_F.email,USER_F.facebook,USER_F.ig,memo,mood,lat,lng,statusdate
    FROM    STATUS,USER_F,GROUP_MEMBER
    WHERE   USER_F.username = STATUS.username
    AND     USER_F.username = GROUP_MEMBER.username
    AND     GROUP_MEMBER.groupid = ${memid}`
  }

  function createGroup(namegroup,username){
    return `INSERT INTO GROUP_F (name,username) VALUES ('${namegroup}','${username}')`;
  }

  function registeruser(username, name, password, img, email, phone, facebook, ig) {
    return `INSERT INTO USER_F (username, name, password, img, email, phone, facebook, ig) VALUES ('${username}', '${name}', '${password}', '${img}', '${email}', '${phone}', '${facebook}', '${ig}');`;
  }

  function getnameGroup(namegroup){
    return `SELECT * FROM GROUP_F WHERE name = '${namegroup}'`
  }
  function addfriendfromGroup(usernameNew,memid){
    return `INSERT INTO GROUP_MEMBER (groupid, username)
    SELECT  GROUP_F.groupid, '${usernameNew}' 
    FROM    GROUP_F
    WHERE   GROUP_F.groupid = ${memid}`;
  }

  function getmemberid(groupname,username){
    return `select  GROUP_MEMBER.groupid
    from    GROUP_F ,GROUP_MEMBER
    WHERE   GROUP_F.groupid = GROUP_MEMBER.groupid
    AND     NAME = '${groupname}'
    AND     GROUP_MEMBER.username = '${username}'`;
  }

  function getstatus(username){
    return `SELECT  memo,mood,lat,lng,statusdate
    FROM    STATUS
    WHERE   username = '${username}'`
  }

  function getmemberinfroup(gid){
    return `SELECT  GROUP_MEMBER.username,USER_F.name,USER_F.img,USER_F.phone,USER_F.email,USER_F.facebook,USER_F.ig
    FROM    GROUP_MEMBER,USER_F
    WHERE   GROUP_MEMBER.username = USER_F.username
    AND     groupid = '${gid}'`;
  }
  module.exports = {
    insertuserhomecoming,
    // =====================================
    getUserQuery,
    loginQuery,
    getuserfromname,
    getGroupusername,
    getmemberfromnamegroup,
    registeruser,
    createGroup,
    getnameGroup,
    addfriendfromGroup,
    getmemberid,
    getstatus,
    getmemberinfroup
  };
  