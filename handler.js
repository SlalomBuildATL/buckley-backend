const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const promisify = foo => new Promise((resolve, reject) => {
    foo((error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result);
        }
    });
});

const getProjectRepos = name => promisify(callback =>
    dynamoDb.get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: {name},
    }, callback))
    .then((result) => {
        if (!result.Item) {
            return name;
        }
        return result.Item.repos;
    })
    .then(name => `Hello, ${name}.`);

const getGreeting = firstName => promisify(callback =>
    dynamoDb.get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: {firstName},
    }, callback))
    .then((result) => {
        if (!result.Item) {
            return firstName;
        }
        return result.Item.nickname;
    })
    .then(name => `Hello, ${name}.`);

const changeNickname = (firstName, nickname) => promisify(callback =>
    dynamoDb.update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: {firstName},
        UpdateExpression: 'SET nickname = :nickname',
        ExpressionAttributeValues: {
            ':nickname': nickname,
        },
    }, callback))
    .then(() => nickname);

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        repos: {type: GraphQLList}
    })
});

const getProject = name => promisify(callback => {
    dynamoDb.get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: {name},
    }, callback))
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType', // an arbitrary name
        fields: {
            project: {
                args: {name: {name: 'name', type: new GraphQLNonNull(GraphQLString)}},
                type: ProjectType,
                resolve: (parent, args) => getProject(args.name),
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType', // an arbitrary name
        fields: {
            changeNickname: {
                args: {
                    firstName: {name: 'firstName', type: new GraphQLNonNull(GraphQLString)},
                    nickname: {name: 'nickname', type: new GraphQLNonNull(GraphQLString)},
                },
                type: GraphQLString,
                resolve: (parent, args) => changeNickname(args.firstName, args.nickname),
            },
        },
    }),
});

// We want to make a GET request with ?query=<graphql query>
// The event properties are specific to AWS. Other providers will differ.
module.exports.query = (event, context, callback) =>
    graphql(schema, event.queryStringParameters.query)
        .then(
            result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
            err => callback(err)
        );
