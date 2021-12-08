const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLID,
} = graphql

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    _id: { type: GraphQLID },
    userid: { type: GraphQLString },
    restid: { type: GraphQLString },
    orderstatus: { type: GraphQLString },
    ordertotal: { type: GraphQLString },
    order_details: {
      type: new GraphQLList({
        dishname: { type: GraphQLString },
        dishprice: { type: GraphQLFloat },
        dishquant: { type: GraphQLInt },
        dishtype: { type: GraphQLString },
      }),
    },
  }),
})

module.exports = OrderType
