const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const exphbs = require('express-handlebars');


mongoose.promise = global.Promise;
app.use(morgan('dev'));
app.use(cors());
//api register
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

//passport
app.use(passport.initialize());
// app.use(passport.session());
//routes
const links = require('./routes/links');
const users = require('./routes/users');
const results = require('./routes/results');
const email = require('./routes/email')


require('./config/passport')(passport);

//mongo
mongoose.connect('mongodb://localhost/parser-dev', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => console.log(err));

//routes
app.use('/links', links);
app.use('/users', users);
app.use('/results', results);
app.use('/email', email);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is on port ${port}`)
});

