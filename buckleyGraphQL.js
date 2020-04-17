const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLSchema
} = require('graphql')
const  { getProjectConfig } = require('./dynamoDbQueries')

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

const RepoConfigurationType = new GraphQLObjectType({
    name: "RepoConfigurationType",
    fields: {
        name: {type: GraphQLString},
        url: {type: GraphQLString},
        private: {type: GraphQLBoolean},
        sshRequired: {type: GraphQLBoolean}
    }
})

const ProjectConfiguration = new GraphQLObjectType({
    name: "ProjectConfiguration",
    fields: {
        name: {type: GraphQLString},
        id: {type: GraphQLString},
        repos: {type: new GraphQLList(RepoConfigurationType)},
        packages: { type: new GraphQLList(PackageConfigurationType)}
    }
})

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

