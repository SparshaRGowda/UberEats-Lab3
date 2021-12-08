const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    userid: { type: GraphQLString },
    restid: { type: GraphQLString },
    orderstatus: { type: GraphQLString },
    ordertotal: { type: GraphQLString },
    order_details: [
      {
        dishname: { type: GraphQLString },
        dishprice: { type: GraphQLInt },
        dishquant: { type: GraphQLInt },
        dishtype: { type: GraphQLString },
      },
    ],
  }),
})

module.exports = OrderType
