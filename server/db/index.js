const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  password: process.env.password,
  user: process.env.user,
  database: process.env.database,
  host: process.env.host,
  port: process.env.DBport,
});

const getCourseByTag = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM test.course_tags_summary`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const getLoginsDate = (start, end, name) => {
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

const getMostActiveUser = () => {
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

const getMostEnrolledCategories = () => {
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

module.exports = {
  getMostActiveUser,
  getMostEnrolledCategories,
  getLoginsDate,
  getCourseByTag,
};
