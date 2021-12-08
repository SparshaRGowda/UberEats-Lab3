const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
} = graphql
const RestaurantType = require('./restaurantType')

const DishType = new GraphQLObjectType({
  name: 'Dish',
  fields: () => ({
    _id: { type: GraphQLID },
    restid: { type: GraphQLID },
    dishname: { type: GraphQLString },
    dishprice: { type: GraphQLFloat },
    dishtype: { type: GraphQLString },
    dishCategory: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  }),
})

module.exports = DishType
