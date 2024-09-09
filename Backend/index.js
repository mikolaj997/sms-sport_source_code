const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

//imports
const connectDb = require('./db.js')
const activityRoutes = require('./controllers/activity.controller.js')
const userRoutes = require('./controllers/user.controller.js')
const messageRoutes = require('./controllers/message.controller.js')

const messageTenis = require('./controllers/messageTenis.controller.js')
const messageBadminton = require('./controllers/messageBadminton.controller.js')
const messageSquash = require('./controllers/messageSquash.controller.js')
const messageRunning = require('./controllers/messageRunning.controller.js')
// const messageWalking = require('./controllers/messageWalking.controller.js')
const messagePadel = require('./controllers/messagePadel.controller.js')
const messageBiking = require('./controllers/messageBiking.controller.js')
const messageTableTenis = require('./controllers/messageTableTenis.controller.js')

const { errorHandler } = require('./middlewares/index.js')

const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use('/api/activity', activityRoutes)
app.use('/api/user', userRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/messagesBadminton', messageBadminton)
app.use('/api/messagesTenis', messageTenis)
app.use('/api/messagesPadel', messagePadel)
app.use('/api/messagesSquash', messageSquash)
// app.use('/api/messagesWalking', messageWalking)
app.use('/api/messagesRunning', messageRunning)
app.use('/api/messagesBiking', messageBiking)
app.use('/api/messagesTableTenis', messageTableTenis)

app.use(errorHandler)


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


connectDb()
    .then(()=> {console.log('db connection suceed')
    app.listen(3001, () =>console.log('server started at 3001'))
})
