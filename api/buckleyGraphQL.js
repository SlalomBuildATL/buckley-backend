const {ProjectConfiguration} = require("./types/project");
const {GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList} =  require("graphql");
const {getProjectConfig, getGitAliasesConfig} = require("../db/dynamoDbQueries");
const { GitAliasConfigurationType } = require("./types/gitAliasConfig");

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType', // an arbitrary name
        fields: {
            projectConfiguration: {
                args: {name: {name: 'name', type: new GraphQLNonNull(GraphQLString)}},
                type: ProjectConfiguration,
                resolve: (parent, {name}) => getProjectConfig(name),
            },
            gitAliasesConfiguration: {
                type: new GraphQLList( GitAliasConfigurationType ),
                resolve: () => getGitAliasesConfig()
            }
        },
    })
})

module.exports = { schema }

