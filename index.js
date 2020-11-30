const express = require('express')
const path = require('path')

let app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running by port ${PORT}`)
})
