const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: '1234',
  user: 'root',
  database: 'test',
  host: 'localhost',
  port: '3306',
});

let dmccDB = {};

// user.all = () => {
//   return new Promise((resolve, reject) => {
//     pool.query(`SELECT * FROM user`, (err, result) => {
//       if (err) return reject(err);
//       return resolve(result);
//     });
//   });
// };

// user.one = (id) => {
//   return new Promise((resolve, reject) => {
//     pool.query(`SELECT * FROM user WHERE username = ?`, id, (err, result) => {
//       if (err) return reject(err);
//       return resolve(result[0]);
//     });
//   });
// };

// create user  table
dmccDB.createTableUser = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE user (
    user_id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    photo VARCHAR(255),
    country VARCHAR(255),
    city VARCHAR(255),
    language VARCHAR(255),
    education VARCHAR(255)
    )`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

// create course table

dmccDB.createTableCourse = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE course (
      course_id VARCHAR(255) NOT NULL PRIMARY KEY,
      title VARCHAR(255),
      subtitle VARCHAR(255),
      image VARCHAR(255),
      imageType VARCHAR(255),
      language VARCHAR(255),
      viewsCount VARCHAR(255),
      categoryName VARCHAR(255),
      INDEX categoryIdx(categoryName),
      CONSTRAINT fk_category_course FOREIGN KEY (categoryName) REFERENCES category(name) ON UPDATE CASCADE
      )`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
// create user logs table
dmccDB.createTableUserLogs = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE userLogs (
      userLogs_id VARCHAR(255) NOT NULL PRIMARY KEY,
      ip VARCHAR(16),
      loggedin VARCHAR(255),
      user_id VARCHAR(255),
      createdAt TIMESTAMP default NOW(),
      INDEX userIdx(user_id),
      CONSTRAINT fk_user_userlogs FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE 
      )`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
// create category table
dmccDB.createTableCategory = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE category (
        category_id VARCHAR(255) NOT NULL ,
        name VARCHAR(255) PRIMARY KEY,
        image VARCHAR(255),
        imageType VARCHAR(255)
        )`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

// create user enrolment table
dmccDB.createTableUserEnrolment = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE userEnrolment (
      userEnrolment_id VARCHAR(255) NOT NULL PRIMARY KEY,
      user_id VARCHAR(255),
      course_id VARCHAR(255),    
      INDEX user_idx2(user_id),
      INDEX course_idx(course_id),
      CONSTRAINT fk_user_userEnrol FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE ,
      CONSTRAINT fk_course_userEnrol FOREIGN KEY (course_id) REFERENCES course(course_id) ON UPDATE CASCADE 
      )`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

// create tag tables
dmccDB.createTableTag = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE tag (
      tag_id VARCHAR(255) ,
      name VARCHAR(255) NOT NULL PRIMARY KEY
      )`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

dmccDB.createTableCourseTags = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE courseTags (
        courseTag_id VARCHAR(255) NOT NULL PRIMARY KEY ,
        tag_name VARCHAR(255),
        coursename_id VARCHAR(255) ,
        CONSTRAINT fk_courseTags_tag FOREIGN KEY (tag_name) REFERENCES tag(name) ON UPDATE CASCADE ,
        CONSTRAINT fk_courseTag_course FOREIGN KEY (coursename_id) REFERENCES course(course_id) ON UPDATE CASCADE 
        )`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

dmccDB.selectTagsView = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM db.course_tags_summary`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

dmccDB.getLoginsDate = (start, end, name) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
    user.name,
    userlogs.loggedin,
    userlogs.userLogs_id,
    userlogs.createdAt,
    userlogs.user_id
FROM
    user
        LEFT JOIN
    userlogs ON user.user_id = userlogs.user_id
WHERE
    createdAt >= ? AND createdAt <= ?
	AND user.name = ? AND userlogs.loggedin='login'
ORDER BY loggedin DESC`;
    pool.query(sql, [start, end, name], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

dmccDB.getMostActiveUser = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT userlogs.user_id,user.name, user.email, COUNT(userlogs.user_id) AS number_of_login 
    FROM userlogs,user
    where user.user_id=userlogs.user_id AND userlogs.loggedin = "login"
    GROUP BY userlogs.user_id 
    ORDER BY number_of_login desc
   `;
    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

dmccDB.getMostEnrolledCategories = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT course.categoryName, count(course.categoryName) as mostEnrolledCategories from course
    INNER JOIN userenrolment on course.course_id = userenrolment.course_id
    group by categoryName 
    order by mostEnrolledCategories desc
   `;
    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

dmccDB.test = () => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO coursetags VALUES (1, web, 1),(2, ES6, 1),(3, web, 2insert into user values (1, mohamed, mohamed@gmail.com, 13234, phototext2, USA, DC, En, BA),(2, hema, hema@gmail.com, 13234, phototext2, Egypt, Giza, AR, BA),(3, ahmed, ahmed@gmail.com, 13234, phototext2, KSA, Jeddah, AR, Phd)`;
    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
module.exports = dmccDB;
