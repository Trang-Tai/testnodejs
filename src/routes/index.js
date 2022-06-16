const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./courses');
const meRouter = require('./me');
const userRouter = require('./user');
const imageRouter = require('./image-handle');
const RESTRouter = require('./rest');

const cloudinary = require('../config/cloudinary/index')
var cors = require('cors');

function route(app) {
    // app.get('/news', (req, res) => {
    //     res.render('new');
    // });
    app.use('/news', newsRouter);
    app.use('/courses', courseRouter);
    app.use('/me', meRouter);
    app.use('/user', userRouter);
    app.use('/image', imageRouter);
    app.use(cors());
    app.use('/app', RESTRouter);
    
    // COOKIE
    /*
    app.get('/cookie', function(req, res){
        res.cookie('name1', 'freetuts.net', { expires: new Date(Date.now() + 900000), signed: true }); //signed	| Boolean | Indicates if the cookie should be signed.
        res.send('success') 
    });
    app.get('/getCookie', function(req, res){
        if (req.signedCookies.name1) // Signed cookies that fail signature validation will have the value false instead of the tampered value
            res.send(`Cookie name co gia tri la ${req.signedCookies.name1}`)
        res.send('Khong the tim lay cookie co ten la name')
    });
    app.get('/deleteCookie', function(req, res){
        res.clearCookie('name1');
        res.send('Da xoa cookie')
    });
    */

    
    // SESSION
    //set session
    /*
    app.get('/set_session', (req, res) => {
        //set a object to session
        req.session.User = {
            website: 'anonystick.com',
            type: 'blog javascript',
            like: '4550'
        }
        return res.status(200).json({status: 'success'})
    })
    //get session
    app.get('/get_session', (req, res) => {
        //check session
        console.log(req.session)
        if(req.session.User){
            return res.status(200).json({status: 'success', session: req.session.User})
        }
        return res.status(200).json({status: 'error', session: 'No session'})
    })
    //destroy session
    app.get('/destroy_session', (req, res) => {
        //destroy session
        req.session.destroy(function(err) {
            return res.status(200).json({status: 'success', session: 'cannot access session here'})
        })
    })
    */

    /*
    // UPLOAD IMAGES
    app.post("/upload-image", (request, response) => {
        // collected image from a user
        const data = {
            image: request.body.image,
        }
  
        // upload image here
        cloudinary.uploader.upload(data.image, { folder: 'test', })
            .then((result) => {
                response.status(200).send({
                    message: "success",
                    result,
                });
            })
            .catch((error) => {
                response.status(500).send({
                    message: "failure",
                    error,
                });
            });
    });
    // Send via POSTMAN by follow JSON data:
    // {
    //     "image": "src/images/f8.png"
    // }
    */

    // app.get('/search', (req, res) => {
    //     console.log(req.query);
    //     res.render('search');
    // });

    // app.post('/search', (req, res) => {
    //     console.log(req.body);
    //     res.send('search');
    // });

    // app.get('/', (req, res) => {
    //     res.render('home');
    // });

    app.use(function(req, res, next) {
        if(req.cookies.username) {
            res.locals.username = req.cookies.username;
        }
        next();
    })
    app.use('/', siteRouter); // Phương thức render home và search bao gồm trong file site.js
}

module.exports = route;
