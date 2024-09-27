const { faker } = require('@faker-js/faker');

exports.generateStudentData = async (numStudents) => {
    const students = [];

    for (let i = 0; i < numStudents; i++) {
        const student = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            age: faker.number.int({ min: 18, max: 30 }),
            gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
            bio: faker.lorem.sentence()
        };
        students.push(student);
    }

    return students;
};