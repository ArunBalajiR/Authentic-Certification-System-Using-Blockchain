const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const app = express()
const mongoose = require ('mongoose')
const transaction = require('./models/certauth.model');
const cors = require('cors')
const path = require('path')
//Config .env to ./config/config.env
require('dotenv').config({
    path:'./config/config.env'
})


//Connect to Database
const uri = process.env.MONGO_URI
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
    }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log ("MongoDB database connection established successfully");
})


//Use bodyParser
app.use(bodyparser.json())

//config for only development
if(process.env.NODE_ENV === 'development') {
  app.use(cors({
      origin: process.env.CLIENT_URL
  }))

  app.use(morgan('dev'))
}


app.post('/api/idfetch', (req, res, next) => {
  const usn = req.body.id
  //console.log(usn)
  transaction.findOne({
      usn
    }).exec((err, tid) => {
      return  res.send(tid)
  })
});

app.get('/api/getrapi', (req, res, next) => {
      return  res.send(process.env.INFURA_API_KEY)
});

app.get('/api/rdefault', (req, res, next) => {
  return  res.send(process.env.ROPSTEN_DEFAULT_ACCOUNT)
});



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
  app.use(cors());
}

const PORT = 5000

var listener = app.listen(PORT, function() {
    console.log(`App listening on port ${PORT}`); //Listening on port 8888
});
