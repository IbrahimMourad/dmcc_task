const mysql = require('mysql');
const DATA = require('./DATA');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: '1234',
  user: 'root',
  database: 'reportingapidb',
  host: 'localhost',
  port: '3306',
});

let seedDB = {};

// create user  table
seedDB.createTableUser = () => {
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

seedDB.createTableCourse = () => {
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
seedDB.createTableUserLogs = () => {
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
seedDB.createTableCategory = () => {
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
seedDB.createTableUserEnrolment = () => {
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
seedDB.createTableTag = () => {
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

seedDB.createTableCourseTags = () => {
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

seedDB.categorySeed = () => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO category (category_id, name, image, imageType) VALUES ?`;

    pool.query(sql, [DATA.categoryData], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

seedDB.userSeed = () => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO user (user_id, name, email, password,photo,country,city,language,education) VALUES ?`;

    pool.query(sql, [DATA.userData], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
seedDB.userLogsSeed = () => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO userlogs (userLogs_id, ip, loggedin, user_id,createdAt) VALUES ?`;

    pool.query(sql, [DATA.userLogsData], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

seedDB.tagSeed = () => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO tag (tag_id, name) VALUES ?`;

    pool.query(sql, [DATA.tagData], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

seedDB.courseSeed = () => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO course (course_id, title,subtitle,image,imageType,language,viewsCount,categoryName) VALUES ?`;

    pool.query(sql, [DATA.courseData], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

seedDB.courseTagsSeed = () => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO coursetags (courseTag_id, tag_name, coursename_id) VALUES ?`;

    pool.query(sql, [DATA.coursetagsData], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
seedDB.userEnrolment = () => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO userenrolment (userEnrolment_id, user_id, course_id) VALUES ?`;

    pool.query(sql, [DATA.userEnrolmentData], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

seedDB.createViewForTags = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE VIEW course_tags_summary AS
    SELECT
      course_id AS course_id_tags,
      max(title) AS course_title,
      cast(concat('[', group_concat(json_quote(name) ORDER BY name SEPARATOR ','), ']') as json) AS course_tags_array
    FROM
      course
      INNER JOIN coursetags
        ON course.course_id = coursetags.coursename_id
      INNER JOIN tag
        ON coursetags.tag_name = tag.name
    GROUP BY
      course_id`;

    pool.query(sql, [DATA.userEnrolmentData], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = seedDB;
