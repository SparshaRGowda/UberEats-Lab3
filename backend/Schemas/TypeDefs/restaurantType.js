const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID } =
  graphql
const dishType = require('./dishType')

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    _id: { type: GraphQLString },
    restname: { type: GraphQLString },
    remail: { type: GraphQLString },
    rpassword: { type: GraphQLString },
    rlocation: { type: GraphQLString },
    rtype: { type: GraphQLString },
    rdtype: { type: GraphQLString },
    rimage: { type: GraphQLString },
    rest_menu: { type: new GraphQLList(dishType) },
  }),
})

module.exports = RestaurantType
