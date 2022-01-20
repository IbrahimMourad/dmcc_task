const express = require('express');
const db_api = require('../db/index.js');
const seedDB = require('../db/seedDB');

const router = express.Router();

router.get('/tables_seed', async (req, res) => {
  try {
    // ******  Create Tables ********
    await seedDB.createTableUser();
    await seedDB.createTableCategory();
    await seedDB.createTableCourse();
    await seedDB.createTableUserLogs();
    await seedDB.createTableUserEnrolment();
    await seedDB.createTableTag();
    await seedDB.createTableCourseTags();
    // // insert data into DataBase
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
    console.log(err);
    res.sendStatus(500);
  }
});

router.get(
  '/getLogins/username/:name/start/:start/end/:end/', // :name  + username , :start start period time , :end end period time
  async (req, res) => {
    try {
      const { start, end, name } = req.params;
      let results = await db_api.getLoginsDate(start, end, name);
      res.status(200).json(results);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);

router.get('/most_active_user', async (req, res) => {
  // Get most active users
  try {
    let results = await db_api.getMostActiveUser();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/most_enrolled_categores', async (req, res) => {
  // Get most enrolled categories
  try {
    let results = await db_api.getMostEnrolledCategories();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.get('/get_course_by_tag/:tag', async (req, res) => {
  // Get course by tag name

  try {
    const { tag } = req.params;
    let results = await db_api.getCourseByTag();
    let courseList = [];

    /*
      handle the tags comming from database loop
    */
    for (const course of results) {
      if (course.course_tags_array.toLowerCase().includes(tag.toLowerCase())) {
        courseList.push({
          id: course.course_id_tags,
          name: course.course_title,
        });
      }
    }

    res.status(200).json(courseList);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
