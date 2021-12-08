const graphql = require('graphql')
const User = require('../models/userModel')
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = graphql

const bcrypt = require('bcryptjs')

const UserType = require('./TypeDefs/userType')
//import data

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
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
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(args.password, salt)

        const newUser = await User.create({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: hashedPassword,
          address: args.address,
        })

        return newUser
      },
    },
  },
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
