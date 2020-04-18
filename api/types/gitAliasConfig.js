const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require("graphql");

const GitAliasConfigurationType = new GraphQLObjectType({
    name: "GitAliasConfigurationType",
    fields: {
        action: {type: GraphQLString},
        aliases: {type: new GraphQLList(GraphQLString)},
        description: {type: GraphQLString}
    }
})

module.exports = {GitAliasConfigurationType};
