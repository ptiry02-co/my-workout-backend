const app = require('./app')

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5006
const PORT = process.env.HTTP_PORT || 8080

app.listen(PORT, () => {
  console.log(`Server enabled! listening on port: ${PORT}`)
})
