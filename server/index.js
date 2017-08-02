const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const socket = require('socket.io');

// Connect to mongoDB
const config = require('./config/mongo');
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database', config.database);
});

// Server setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
const users = require('./routes/users');
const debates = require('./routes/debates');
app.use('/users', users);
app.use('/debates', debates);

app.get('*', (req, res) => {
  res.send('hello');
});

// Start server
const server = app.listen(port, () => {
  console.log('Server started on port ', port);
});

// Start socket listerner
const io = socket(server);
let connectionsCount = 0;

io.on('connection', (socket) => {
  console.log('New socket connected:', ++connectionsCount, socket.id);
  
  socket.on('disconnect', () => {
    console.log('Socket disconnected', --connectionsCount);
  });
  
  socket.on('chat', (data) => {
    console.log(`Received message: ${data.message} from ${data.username}`);
    io.sockets.emit('chat', data);
  });
});




