const { json } = require('express');
const express = require('express');
const db = require('../db');

const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     let results = await db.all();
//     res.json(results);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     let results = await db.one(req.params.id);
//     res.json(results);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

router.get('/tables_seed', async (req, res) => {
  try {
    // // Create Tables
    // await db.createTableUser();
    // await db.createTableCategory();
    // await db.createTableCourse();
    // await db.createTableUserLogs();
    // await db.createTableUserEnrolment();
    // await db.createTableTag();
    // await db.createTableCourseTags();
    await db.test();

    console.log('Tables created');
    res.status(201).json({ message: `table created` });
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
      let results = await db.getLoginsDate(start, end, name);
      res.json(results);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);

router.get('/most_active_user', async (req, res) => {
  // most three active users
  try {
    let results = await db.getMostActiveUser();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/most_enrolled_categores', async (req, res) => {
  // most three active users
  try {
    let results = await db.getMostEnrolledCategories();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.get('/get_course_by_tag/:tag', async (req, res) => {
  // most three active users

  try {
    const { tag } = req.params;
    let results = await db.getCourseByTag();

    let courseList = [];
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
router.get('/test', async (req, res) => {
  // most three active users

  try {
    let results = await db.test();

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
