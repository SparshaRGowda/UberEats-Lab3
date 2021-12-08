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
const RestaurantType = require('./TypeDefs/restaurantType')
const OrderType = require('./TypeDefs/orderType')
const Restaurant = require('../models/restaurantModel')
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

    createRestaurant: {
      type: RestaurantType,
      args: {
        restname: { type: GraphQLString },
        remail: { type: GraphQLString },
        rpassword: { type: GraphQLString },
        rlocation: { type: GraphQLString },
        rtype: { type: GraphQLString },
        rdtype: { type: GraphQLString },
        rimage: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const restaurantExists = await Restaurant.findOne({
          remail: args.remail,
        })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(args.rpassword, salt)

        const newRestaurant = await Restaurant.create({
          restname: args.restname,
          remail: args.remail,
          rpassword: hashedPassword,
          rlocation: args.rlocation,
          rtype: args.rtype,
          rdtype: args.rdtype,
          rimage: args.rimage,
        })

        return newRestaurant
      },
    },
  },
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
