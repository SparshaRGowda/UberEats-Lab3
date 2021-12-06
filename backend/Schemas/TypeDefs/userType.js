const connectdb = require('../../config/db')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    userid: { type: GraphQLInt },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    address: { type: GraphQLString },
  }),
})

//module.exports = UserType
