const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose') 
const cors = require('cors')
const port = process.env.PORT || 9000

const app = express()

mongoose.connect('mongodb://myserver:myserver1234@ds159459.mlab.com:59459/myserver') ;
mongoose.connection.once('open', () => {
    console.log('Connected to database') ;
}) ;

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}))

app.listen(port, () => { console.log(`Listening to request on port ${port}`)})
