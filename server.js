const port = process.env.PORT || 5000
const express = require('express')
const serveStatic = require('serve-static')
const app = express()
const bodyParser = require('body-parser')
const client = require('instagram-private-api').V1
const fs = require('fs')
const helpers = require('./helpers')

var session
var challenges = {}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(serveStatic(__dirname + "/dist"))

//TODO: Refactor routes into a separate file
app.post('/login', (req, res) => {
  //TODO: 
  //  Handle expired cookie, if already exists on server
  //  Use bcrypt to hash/sync sensitive info
  if (!session) {
    let username = req.body.username
    let password = req.body.password
    let proxyUrl = req.body.proxyUrl
    let device = new client.Device(username)

    fs.stat(__dirname + `/cookies/${username}.json`, (err) => {
      if (err == null) {
        console.log('File exists');
      } else if(err.code == 'ENOENT') {
        console.log('File does not exist, creating now')
        fs.writeFile(__dirname + `/cookies/${username}.json`);
      } else {
        console.log('Some other error: ', err.code);
      }
      const storage = new client.CookieFileStorage(__dirname + `/cookies/${username}.json`)
      client.Session.create(device, storage, username, password, proxyUrl)
        .then((sesh) => {
          session = sesh
          console.log('Challenge not required')
          return res.status(200).json({ 'challengeId': '' })
        })
        .catch(client.Exceptions.CheckpointError, (err) => {
          return client.Web.Challenge.resolveHtml(err, 'phone')
            .then(function (challenge) {
              if (challenge.type !== 'phone') {
                console.log('SMS challenge not set up')
                res.status(200).json({ 'challengeId': 'notSetUp' })
              }
              let challengeId = Math.floor((Math.random() * 100) + 1);
              challenges[challengeId] = challenge;
              console.log(`Challenge required: username=${username} challengeId=${challengeId}`)
              res.status(200)
              res.json({ 'challengeId': challengeId })
              return null
            });
        })
    })
  }
})

app.post('/login-challenge', (req, res) => {
  let challengeId = req.body.challengeId
  let code = req.body.code
  challenges[challengeId].code(code)
    .then(() => {
      delete challenges[challengeId]
      res.status(200).json({ 'error': '' })
    })
    .catch((ex) => {
      res.status(401).json({ 'error': ex })
    })
})

app.get('/chats', (req, res) => {
  helpers.getChats(session)
    .then((chats) => {
      res.status(200).json({ 'chats': chats })
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({ 'timeout': 60000 })
    })
})

app.listen(port)
console.log('Server listening on port '+ port)