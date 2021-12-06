const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = graphql

const userType = require('./TypeDefs/userType')
//import data

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllUsers: {
      type: new GraphQLList(userType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return mysql
      },
    },
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType,
      args: {
        firstname: { type: GraphQLString },
        lasttname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve(parent, args) {
        mysql.push({
          id: mysql.length + 1,
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
          address: args.address,
        })
        return args
      },
    },
  },
})

//module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
