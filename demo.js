const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

const typeDefs = gql`
  type User {
    email: String!
    avatar: String!
    friends: [User]!
  }

  type Query {
    me: User!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        email: 'abhu@gmail.com',
        avatar: 'https://via.placeholder.com/150',
        friends: [],
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// The `listen` method launches a web server.
server.listen(4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
