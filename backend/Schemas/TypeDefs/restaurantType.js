const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    restname: { type: GraphQLString },
    remail: { type: GraphQLString },
    rpassword: { type: GraphQLString },
    rlocation: { type: GraphQLString },
    rtype: { type: GraphQLString },
    rdtype: { type: GraphQLString },
    rimage: { type: GraphQLString },
    rest_menu: [
      {
        dishname: { type: GraphQLString },
        dishprice: { type: GraphQLInt },
        dishquant: { type: GraphQLInt },
        dishtype: { type: GraphQLString },
      },
    ],
  }),
})

module.exports = RestaurantType
