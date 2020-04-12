const {schema} = require("./buckleyGraphQL");
const { graphql } = require('graphql');

// We want to make a GET request with ?query=<graphql query>
module.exports.query = (event, context, callback) =>
    graphql(schema, event.queryStringParameters.query)
        .then(
            result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
            err => callback(err)
        );
