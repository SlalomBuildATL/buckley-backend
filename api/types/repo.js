const {GraphQLBoolean, GraphQLObjectType, GraphQLString} = require("graphql");

const RepoConfigurationType = new GraphQLObjectType({
    name: "RepoConfigurationType",
    fields: {
        name: {type: GraphQLString},
        url: {type: GraphQLString},
        private: {type: GraphQLBoolean},
        sshRequired: {type: GraphQLBoolean}
    }
})

module.exports = { RepoConfigurationType }

