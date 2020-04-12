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

const getProjectConfig = name => promisify(callback =>
    dynamoDb.get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            "type": "PROJECT",
            "name": name
        },
    }, callback))
    .then(result => result.Item);

module.exports = {getProjectConfig}
