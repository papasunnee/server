const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express()

app.listen(9000, () => { console.log("Listening to request on port 9000")})
