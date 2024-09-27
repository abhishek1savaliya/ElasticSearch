const { faker } = require('@faker-js/faker');

exports.generateStudentData = async (numStudents) => {
    const students = [];

    for (let i = 0; i < numStudents; i++) {
        const student = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            age: faker.number.int({ min: 18, max: 30 }),
            gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
            bio: faker.lorem.sentence(),
            phone: faker.phone.number({ style: 'national' }),
            email: faker.internet.email(),
            address: {
                street: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                country: faker.location.country(),
                postalCode: faker.location.zipCode(),
            },
            dateOfBirth: faker.date.birthdate({ min: 18, max: 30, mode: 'age' }),
            studentID: faker.string.alphanumeric(10),
            course: faker.helpers.arrayElement(['Engineering', 'Medicine', 'Arts', 'Science', 'Law']),
            enrollmentYear: faker.date.past(5).getFullYear(),  // Random enrollment year in the last 5 years
            GPA: faker.number.float({ min: 2.0, max: 4.0, precision: 0.01 }),
            isInternationalStudent: faker.datatype.boolean(),
            emergencyContact: {
                name: faker.person.fullName(),
                phone: faker.phone.number({ style: 'national' }),
                relationship: faker.helpers.arrayElement(['Parent', 'Sibling', 'Guardian', 'Spouse']),
            },
            hobbies: faker.helpers.arrayElements(['Reading', 'Sports', 'Music', 'Traveling', 'Gaming', 'Cooking'], 2),
            dormitory: faker.helpers.arrayElement(['Dorm A', 'Dorm B', 'Off-campus']),
            favoriteSubjects: faker.helpers.arrayElements(['Math', 'Physics', 'Biology', 'History', 'Computer Science'], 3),
            bankDetails: {
                bankName: faker.company.name(),
                accountNumber: faker.string.numeric(10), // Generate a numeric string as an account number
                cardNumber: faker.finance.creditCardNumber(),
                cardType: faker.helpers.arrayElement(['Visa', 'MasterCard', 'American Express', 'Discover']),
                expirationDate: faker.date.future(1, new Date()).toISOString().slice(0, 10), // One year from now
                cvv: faker.finance.creditCardCVV(),
            }
        };
        students.push(student);
    }

    return students;
};
