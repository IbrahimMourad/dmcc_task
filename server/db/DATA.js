const userData = [
  [
    '1',
    'mohamed',
    'mohamed@gmail.com',
    '13234',
    'phototext2',
    'USA',
    'DC',
    'En',
    'BA',
  ],
  [
    '2',
    'hema',
    'hema@gmail.com',
    '13234',
    'phototext2',
    'Egypt',
    'Giza',
    'AR',
    'BA',
  ],
  [
    '3',
    'ahmed',
    'ahmed@gmail.com',
    '13234',
    'phototext2',
    'KSA',
    'Jeddah',
    'AR',
    'Phd',
  ],
];
const categoryData = [
  ['1', 'engineer', 'asdasdasd', 'png'],
  ['2', 'graphics', 'asdasdasd', 'png'],
  ['3', 'language', 'asdasdasd', 'png'],
  ['4', 'software', 'asdasdasd', 'png'],
];

const userLogsData = [
  ['1', '123123123', 'login', '2', '2022-01-19 10:56:52'],
  ['10', '123123123', 'login', '2', '2022-01-19 10:57:22'],
  ['11', '192.168.1.98', 'login', '3', '2022-01-19 10:57:22'],
  ['12', '192.168.1.98', 'login', '3', '2022-01-19 10:57:22'],
  ['13', '192.168.1.9', 'login', '1', '2022-01-19 10:57:22'],
  ['14', '192.168.1.9', 'login', '1', '2022-01-19 10:57:22'],
  ['15', '123123123', 'logout', '2', '2022-01-19 11:02:06'],
  ['16', '123123123', 'logout', '2', '2022-01-19 11:02:06'],
  ['17', '123123123', 'logout', '2', '2022-01-19 11:02:06'],
  ['18', '192.168.1.98', 'logout', '3', '2022-01-19 11:02:06'],
  ['19', '192.168.1.98', 'logout', '3', '2022-01-19 11:02:06'],
  ['2', '123123123', 'login', '2', '2022-01-19 10:56:52'],
  ['20', '192.168.1.9', 'logout', '1', '2022-01-19 11:02:06'],
  ['21', '192.168.1.9', 'logout', '1', '2022-01-19 11:02:06'],
  ['22', '123123123', 'login', '2', '2022-01-19 11:46:58'],
  ['23', '123123123', 'login', '2', '2022-01-19 11:46:58'],
  ['24', '123123123', 'login', '2', '2022-01-19 11:46:58'],
  ['25', '192.168.1.98', 'login', '3', '2022-01-19 11:46:58'],
  ['26', '192.168.1.98', 'login', '3', '2022-01-19 11:46:58'],
  ['27', '192.168.1.9', 'login', '1', '2022-01-19 11:46:58'],
  ['28', '192.168.1.9', 'login', '1', '2022-01-19 11:46:58'],
  ['29', '123123123', 'login', '2', '2022-01-19 16:23:49'],
  ['3', '123123123', 'login', '2', '2022-01-19 10:56:52'],
  ['30', '123123123', 'login', '2', '2022-01-19 16:23:49'],
  ['31', '123123123', 'login', '2', '2022-01-19 16:23:49'],
  ['32', '192.168.1.98', 'login', '3', '2022-01-19 16:23:49'],
  ['33', '192.168.1.98', 'logout', '3', '2022-01-19 16:23:49'],
  ['34', '192.168.1.9', 'logout', '1', '2022-01-19 16:23:49'],
  ['35', '192.168.1.9', 'logout', '1', '2022-01-19 16:23:49'],
  ['36', '192.168.1.9', 'true', '1', '2022-01-19 17:24:26'],
  ['37', '192.168.1.9', 'true', '1', '2022-01-19 17:24:26'],
  ['4', '192.168.1.98', 'login', '3', '2022-01-19 10:56:52'],
  ['5', '192.168.1.98', 'login', '3', '2022-01-19 10:56:52'],
  ['6', '192.168.1.9', 'login', '1', '2022-01-19 10:56:52'],
  ['7', '192.168.1.9', 'login', '1', '2022-01-19 10:56:52'],
  ['8', '123123123', 'login', '2', '2022-01-19 10:57:22'],
  ['9', '123123123', 'login', '2', '2022-01-19 10:57:22'],
];

const tagData = [
  ['2', 'CSS'],
  ['3', 'ES6'],
  ['1', 'web'],
];
const courseData = [
  ['1', 'Javascript', 'ES6', 'phototext2', 'png', 'AR', '123', 'engineer'],
  [
    '2',
    'Full HTML Tutorial',
    'HTML',
    'phototext2',
    'png',
    'EN',
    '9853',
    'engineer',
  ],
  [
    '3',
    'Full Sass Tutorial',
    'CSS',
    'phototext2',
    'png',
    'AR',
    '1312',
    'engineer',
  ],
  [
    '4',
    'Full Testing Tutorial',
    'Testing',
    'phototext2',
    'png',
    'AR',
    '198',
    'graphics',
  ],
];
const coursetagsData = [
  ['1', 'web', '1'],
  ['2', 'ES6', '1'],
  ['3', 'web', '2'],
  ['4', 'web', '3'],
  ['5', 'CSS', '3'],
  ['6', 'ES6', '3'],
];
const userEnrolmentData = [
  ['1', '1', '1'],
  ['2', '2', '1'],
  ['3', '2', '1'],
  ['4', '3', '2'],
  ['5', '3', '3'],
  ['6', '2', '3'],
  ['7', '3', '4'],
];

module.exports = {
  userData,
  categoryData,
  userLogsData,
  tagData,
  courseData,
  coursetagsData,
  userEnrolmentData,
};
