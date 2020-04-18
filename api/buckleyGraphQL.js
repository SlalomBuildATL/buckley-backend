const {ProjectConfiguration} = require("./types/project");
const {GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} =  require("graphql");
const {getProjectConfig} = require("../db/dynamoDbQueries");

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType', // an arbitrary name
        fields: {
            projectConfiguration: {
                args: {name: {name: 'name', type: new GraphQLNonNull(GraphQLString)}},
                type: ProjectConfiguration,
                resolve: (parent, {name}) => getProjectConfig(name),
            },
        },
    })
})

module.exports = { schema }

