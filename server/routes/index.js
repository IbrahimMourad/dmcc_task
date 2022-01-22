const express = require('express');
const db_api = require('../db/index.js');
const seedDB = require('../db/seedDB');
require('dotenv').config('../.env');

const router = express.Router();

const handleErr = (results, res) => {
  // handle Error function
  if (results.length > 0) {
    res.json(results);
  } else {
    res.json({ message: 'no data found ' });
  }
};

router.get('/tables_seed', async (req, res) => {
  try {
    /* 
          ***************
          Could not use Pormise.all() here cuz sequence matter in creation of tables and relationships
          so i used sequential approach
          *************** 
    */

    // ***************  Create Tables ***************
    await seedDB.createTableUser();
    await seedDB.createTableCategory();
    await seedDB.createTableCourse();
    await seedDB.createTableUserLogs();
    await seedDB.createTableUserEnrolment();
    await seedDB.createTableTag();
    await seedDB.createTableCourseTags();
    // // *************** insert data into DataBase ***************
    await seedDB.userSeed();
    await seedDB.categorySeed();
    await seedDB.userLogsSeed();
    await seedDB.tagSeed();
    await seedDB.courseSeed();
    await seedDB.courseTagsSeed();
    await seedDB.userEnrolment();
    await seedDB.createViewForTags();

    console.log('Tables created');
    res.status(201).json({ message: `tables created and seeded` });
  } catch (err) {
    console.log(err.sqlMessage);
    res.status(500).json({
      message: 'Something went wrong',
      sqlMessage: err.sqlMessage,
      code: err.code,
    });
  }
});

router.get(
  '/getLogins/username/:name/start/:start/end/:end/', // :name  + username , :start start period time , :end end period time
  async (req, res) => {
    try {
      const { start, end, name } = req.params;
      let results = await db_api.getLoginsDate(start, end, name);
      res.status(200);
      // handle error if no data found with the entered params
      handleErr(results, res);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Something went wrong',
        sqlMessage: err.sqlMessage,
        code: err.code,
      });
    }
  }
);

router.get('/most_active_user', async (req, res) => {
  // Get most active users
  try {
    let results = await db_api.getMostActiveUser();
    res.status(200);
    handleErr(results, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong',
      sqlMessage: err.sqlMessage,
      code: err.code,
    });
  }
});

router.get('/most_enrolled_categores', async (req, res) => {
  // Get most enrolled categories
  try {
    let results = await db_api.getMostEnrolledCategories();
    res.status(200);
    handleErr(results, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong',
      sqlMessage: err.sqlMessage,
      code: err.code,
    });
  }
});
router.get('/get_course_by_tag/:tag', async (req, res) => {
  // Get course by tag name

  try {
    const { tag } = req.params;
    let results = await db_api.getCourseByTag();
    let courseList = [];

    /*
      handle the tags comming from database using forEach Method
    */
    results.forEach((course) => {
      if (course.course_tags_array.toLowerCase().includes(tag.toLowerCase())) {
        courseList.push({
          id: course.course_id_tags,
          name: course.course_title,
        });
      }
    });
    handleErr(courseList, res);

    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong',
      sqlMessage: err.sqlMessage,
      code: err.code,
    });
  }
});

module.exports = router;
