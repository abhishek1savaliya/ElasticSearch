const express = require('express');
const { getStudents, getStudentsById, addStudent, addBulkStudents, updateStudentById, deleteStudentById, searchByWord } = require('../controller/students.controller');
const router = express.Router();

router.get('/students', getStudents)

router.get('/student/:id', getStudentsById)

router.post('/addstudent', addStudent);
router.post('/addstudents', addBulkStudents);

router.put('/update/:id', updateStudentById)

router.delete('/delete/:id', deleteStudentById)

router.get('/search/:word', searchByWord)

module.exports = router;