const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	{ graphqlExpress } = require('apollo-server-express'),
	schema = require('./schema');

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log('GraphQL API listening on port:' + PORT));
