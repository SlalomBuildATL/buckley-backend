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

const getGitAliasesConfig = name => promisify(callback =>
    dynamoDb.get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            "type": "GIT",
            "name": "aliases"
        },
    }, callback))
    .then(result => result.Item);

const getProjectConfig = name => promisify(callback =>
    dynamoDb.get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            "type": "PROJECT",
            "name": name
        },
    }, callback))
    .then(result => result.Item);

module.exports = {getProjectConfig, getGitAliasesConfig}
