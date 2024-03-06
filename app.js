const express = require('express');
const app = express();
const port = 8080;
const hbs = require('hbs');
const bodyParser = require('body-parser');
const path = require('path');

const store = { 
    username: 'admin',
    password: 'password'
};

const partialsPath = path.join(__dirname, './views/partials');
const viewsPath = path.join(__dirname, './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { username , password } = req.body;
    if (username === store.username && password === store.password) {
        res.redirect('/nextpage'); 
    } else {
        res.send('<script>alert("Invalid credentials. Please enter valid input."); window.location="/";</script>'); 
    }
});


app.get('/nextpage', (req, res) => {
   res.render('landing')
});

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});
