const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb://michael:arya1234@ds237713.mlab.com:37713/cinemaster');
mongoose.connection.once('open', () => {
    console.log('Connected to DB');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('GraphQL server listening on port 4000');
});
