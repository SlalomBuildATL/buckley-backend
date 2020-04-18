const {GraphQLList, GraphQLObjectType, GraphQLString} = require ("graphql");

const PackageCommandType = new GraphQLObjectType({
    name: "PackageCommandType",
    fields: {
        cmd: { type: GraphQLString },
        args: { type: new GraphQLList(GraphQLString)}
    }
})

const PackageConfigurationType = new GraphQLObjectType({
    name: "PackageConfigurationType",
    fields: {
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        script: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        testScript: { type: GraphQLString },
        command: { type: PackageCommandType}
    }
})

module.exports = { PackageConfigurationType, PackageCommandType }
