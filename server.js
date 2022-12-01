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
/* const HTTP_PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
}) */

const HTTPS_PORT = process.env.HTTPS_PORT

const httpsServer = https.createServer(cred, app)
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`Secure server listening on port: ${HTTPS_PORT}`)
})
