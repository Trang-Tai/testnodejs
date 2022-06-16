const Course = require('../models/Courses');

class SiteController {
    // [GET] /
    index(req, res, next) {
        // Course.find({}, function (err, docs) {
        //     if(!err) res.json(docs);
        //     else {
        //         next(err);
        //         // res.status(400).json({ error: 'ERROR!!!!!!'})
        //     }
        // });

        Course.find({}) // có 3 cách để get json object thay vì mongoose object: 1:lean(), 2:_doc., 3:toObject()
            .then(docs => {
                /*res.json(docs) dùng test*/
                // docs = docs.map(course => course.toObject());
                res.render('home', {
                    courses: docs
                })
            })
            .catch(err => next(err))
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
