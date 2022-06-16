const express = require('express');
const exhbs = require('express-handlebars');
const path = require('path');
// import { exhbs } from '../node_modules/express-handlebars/dist/index.d.ts';
const app = express();
const port = 3000;

// convert POST TO OTHERS
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Connect MongoDB
const db = require('./config/db');
db.connect();

// for morgan (http logger)
// const morgan = require('morgan');
// app.use(morgan('combined'));

// Xử lí static file
app.use(express.static(path.join(__dirname, 'public')));

// áp dụng middleware cho req.body
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// áp dụng custom middleware
const SortMiddleware = require('./app/middlewares/SortMiddleware');
app.use(SortMiddleware);

// áp dụng cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser('hehehi')); // (secure, options)
/*When secret is provided, this module will unsign 
 and validate any signed cookie values
 and move those name value pairs from req.cookies into req.signedCookies*/

// áp dụng session
const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { signed: true, },
    name: 'huhu',
}))

// áp dụng CLOUDINARY
/*
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dly4liyhf', 
    api_key: '313461533944396', 
    api_secret: 'FPxYQaRAG3_Q9CdbvwH0yQibRuU',
});
*/
// This npm package enables us to handle incoming requests using req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// template engine
app.engine('hbs', exhbs.engine({ 
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';

            const icons = {
                default: 'oi oi-elevator',
                asc: 'oi oi-sort-ascending',
                desc: 'oi oi-sort-descending',
            };
            const icon = icons[sortType];

            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc',
            }
            const type = types[sortType];

            return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
            </a>`
        }
    } 
})); // Lưu ý: tên 'hbs' phải trùng với tên của extname là .hbs
app.set('view engine', 'hbs'); // hbs này là tên của hbs của app.engine ở trên
app.set('views', path.join(__dirname, 'resources', 'views')); // set đường dẫn cho thư mục views folder // Link: https://github.com/ericf/express-handlebars/issues/147
// console.log(__dirname, path.join(__dirname, 'resources/views'));
// console.log(path);

// Nạp file index.js trong routes
const route = require('./routes');
route(app);

/*
app.get('/', (req, res) => {
  res.render('home');
});

// app.get('/news', (req, res) => {
//   res.render('new');
// });

app.get('/search', (req, res) => {
  console.log(req.query)
  res.render('search');
});

app.post('/search', (req, res) => {
  console.log(req.body)
  res.send('search');
});
*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
