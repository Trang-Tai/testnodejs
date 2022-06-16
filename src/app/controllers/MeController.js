const Course = require('../models/Courses');
const { multipleMongooseToObject } = require('../../util/mongoose');

class NewsController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let coursesQuery = Course.find({});

        if(req.query.hasOwnProperty('_sort')) {
            coursesQuery = coursesQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([coursesQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                })
            })
            .catch(next);

        /*
        Course.countDocumentsDeleted()
            .then((deletedCount) => {
                console.log(deletedCount)
            })
            .catch(next);

        Course.find({})
            .then(courses => {
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(err => next(err))
        */
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => {
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(err => next(err))
    }
}

module.exports = new NewsController();
