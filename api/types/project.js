const {GraphQLList, GraphQLObjectType, GraphQLString} = require("graphql");
const {RepoConfigurationType} = require("./repo");
const {PackageConfigurationType} = require("./package");

const ProjectConfiguration = new GraphQLObjectType({
    name: "ProjectConfiguration",
    fields: {
        name: {type: GraphQLString},
        id: {type: GraphQLString},
        repos: {type: new GraphQLList(RepoConfigurationType)},
        packages: { type: new GraphQLList(PackageConfigurationType)}
    }
})


module.exports = { ProjectConfiguration }
