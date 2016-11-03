const merge = (...args) => Object.assign({}, ...args)
const find = (array, f) => array.filter(f)[0]

module.export = {merge, find}

const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    } = require('graphql');

module.exports.Schema = (...args) => new GraphQLSchema(...args)
module.exports.ObjectType = (...args) => new GraphQLObjectType(...args)
module.exports.NonNull = (...args) => new GraphQLNonNull(...args)
module.exports.List = (...args) => new GraphQLList(...args)
module.exports.String = GraphQLString
module.exports.Int = GraphQLInt
