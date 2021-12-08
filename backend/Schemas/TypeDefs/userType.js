const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: graphql.GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    address: { type: GraphQLString },
  }),
})

module.exports = UserType
