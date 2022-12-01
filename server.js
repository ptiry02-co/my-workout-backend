const app = require('./app')

const fs = require('fs')
const https = require('https')

const key = fs.readFileSync('/home/ubuntu/my-workout-backend/config/private.key')
const cert = fs.readFileSync('/home/ubuntu/my-workout-backend/config/certificate.crt')

const cred = {
  key,
  cert
}

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5006
/* const PORT = process.env.PORT || 80

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
}) */

const httpsServer = https.createServer(cred, app)
httpsServer.listen(443, () => {
  console.log(`Secure server listening on port: 443`)
})
