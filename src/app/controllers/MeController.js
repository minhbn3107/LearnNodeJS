const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongoose');

class MeController {
    // [GET] /me/stored/courses --> Failed because it counts number of document
    // storedCourses(req, res, next) {
    //     Promise.all([Course.find({}), Course.countDocumentsDeleted()])
    //     .then(([courses, deletedCount]) =>
    //         res.render('me/stored-courses', {
    //             courses: multipleMongooseToObject(courses),
    //             deletedCount,
    //         })
    //     )
    //     .catch(next);
    // }

    // [GET] /me/stored/courses --> Do this instead of method upon because plugin that failed
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.findDeleted({})])
            .then(([courses, deletedCourses]) => {
                const deletedCount = deletedCourses.filter(
                    (course) => course.deleted,
                ).length;

                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                    deletedCount,
                });
            })
            .catch(next);
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(
                        courses.filter((course) => course.deleted),
                    ),
                    //--> We have to do this because courses return number of document not deleted documents
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
