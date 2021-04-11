const express = require('express');
const appDebug = require('debug')('app:debug')
const logDebug = require('debug')('app:log')
const morgan = require('morgan')
var bodyParser = require('body-parser')
const comics_router = require('./routers/comics')
const port = process.env.PORT || 3005
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

if(app.get('env') === 'development'){
    logDebug('Log is active')
    app.use(morgan('dev'))
}
    
app.use('/api/comics',comics_router)
app.get(['','/index','/'], (req,res)=>{
    res.send('<h1> Welcome to the comics API made by MUSTAPHA GHERIBI </h1>')
});

app.listen(port, ()=> appDebug(`Server on ${port}....`));
