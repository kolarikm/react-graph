const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb://michael:iloveArya1@ds223763.mlab.com:23763/kilograms');
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
