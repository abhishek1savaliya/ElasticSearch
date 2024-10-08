const esClient = require('../elasticsearch');
const { generateStudentData } = require('../utils/logic');

const getStudents = async (req, res) => {
    try {
        const result = await esClient.search({
            index: 'students',
            body: {
                query: {
                    match_all: {},
                }
            },
        });

        const students = result.hits.hits.map((hit) => {
            hit._source["id"] = hit._id
            return hit._source
        });

        res.json(students);

    } catch (error) {
        console.error('Error fetching students:', error.message);
        res.status(500).json({ error: 'Failed to retrieve students' });
    }
};

const getStudentsById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await esClient.get({
            index: 'students',
            id: id
        });

        if (!result.found) {
            return res.status(404).json({ message: 'Student not found' });
        }

        result._source["id"] = result._id

        res.json(result._source);

    } catch (error) {
        console.error(`Error fetching student by ID (${req.params.id}):`, error.message);
        res.status(500).json({ error: 'Failed to fetch student data' });
    }
};

const addStudent = async (req, res) => {
    try {
        const { firstName, lastName, age, gender, bio } = req.body;

        if (!firstName || !lastName || !age || !gender) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const result = await esClient.index({
            index: 'students',
            body: {
                firstName,
                lastName,
                age,
                gender,
                bio
            }
        });

        res.status(201).json({
            message: 'Student added successfully',
            studentId: result._id,
        });

    } catch (error) {
        console.error('Error adding student:', error.message);
        res.status(500).json({ error: 'Failed to add student' });
    }
};

const addBulkStudents = async (req, res) => {
    try {
        const students = await generateStudentData(50000);
         
         console.log(students)

        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ error: 'Students array is required' });
        }

        const bulkBody = students.flatMap(student => [
            { index: { _index: 'students' } },
            {
                firstName: student.firstName,
                lastName: student.lastName,
                age: student.age,
                gender: student.gender,
                bio: student.bio,
                phone: student.phone,
                email: student.email,
                address: student.address,
                dateOfBirth: student.dateOfBirth,
                studentID: student.studentID,
                course: student.course,
                enrollmentYear: student.enrollmentYear,
                GPA: student.GPA,
                isInternationalStudent: student.isInternationalStudent,
                emergencyContact: student.emergencyContact,
                hobbies: student.hobbies,
                dormitory: student.dormitory,
                favoriteSubjects: student.favoriteSubjects,
                bankDetails: {
                    bankName: student.bankDetails.bankName,
                    accountNumber: student.bankDetails.accountNumber,
                    cardNumber: student.bankDetails.cardNumber,
                    cardType: student.bankDetails.cardType,
                    expirationDate: student.bankDetails.expirationDate,
                    cvv: student.bankDetails.cvv,
                }
            }
        ]);


        const result = await esClient.bulk({ body: bulkBody });

        if (result.errors) {
            const errorDetails = result.items.filter(item => item.index && item.index.error);
            console.error('Bulk insertion errors:', errorDetails);
            return res.status(500).json({ error: 'Bulk insertion failed', details: errorDetails });
        }

        res.status(201).json({
            message: 'Bulk students added successfully',
            addedCount: result.items.length
        });

    } catch (error) {
        console.error('Error adding bulk students:', error.message);
        res.status(500).json({ error: 'Failed to add students in bulk' });
    }
};

const updateStudentById = async (req, res) => {
    const { id } = req.params;  // The student's _id from the URL
    const updatedFields = req.body;  // Fields to update from the request body

    try {
        // Update the student by id
        const result = await esClient.update({
            index: 'students',
            id: id,  // Document ID
            body: {
                doc: updatedFields  // Only update specified fields
            }
        });

        res.json({
            message: `Student with ID ${id} updated successfully.`,
            result
        });
    } catch (error) {
        console.error('Elasticsearch update error:', error);
        res.status(500).json({ error: 'Failed to update student' });
    }
};

const deleteStudentById = async (req, res) => {
    const { id } = req.params;

    try {

        const result = await esClient.delete({
            index: 'students',
            id: id
        });

        res.json({
            message: `Student with ID ${id} deleted successfully.`,
            result
        });
    } catch (error) {
        console.error('Elasticsearch delete error:', error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
};

const searchByWord = async (req, res) => {
    const { word } = req.params;

    try {
        const result = await esClient.search({
            index: 'students',
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                prefix: {
                                    firstName: word
                                }
                            },
                            {
                                prefix: {
                                    lastName: word
                                }
                            },
                            {
                                match: {
                                    firstName: {
                                        query: word,
                                        fuzziness: "AUTO" // Fuzzy search for firstName
                                    }
                                }
                            },
                            {
                                match: {
                                    lastName: {
                                        query: word,
                                        fuzziness: "AUTO" // Fuzzy search for lastName
                                    }
                                }
                            }
                        ]
                    }
                },
                size: 10
            }
        });

        const studentsName = result.hits.hits.map((student) => {
            return {
                id: student._id,
                name: `${student._source.firstName} ${student._source.lastName}`
            }
        });

        res.json({
            success: true,
            totalStudents: studentsName.length,
            studentsName: studentsName
        });

    } catch (error) {
        console.error('Elasticsearch search error:', error);
        res.status(500).json({ error: 'Failed to search students' });
    }
};


module.exports = { getStudents, getStudentsById, addStudent, addBulkStudents, updateStudentById, deleteStudentById, searchByWord };


