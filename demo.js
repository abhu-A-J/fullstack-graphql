const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

const typeDefs = gql`
  type User {
    email: String!
    avatar: String!
    friends: [User]!
  }

  interface Shoe {
    size: Int!
    brand: String!
  }

  type Sneakers implements Shoe {
    size: Int!
    brand: String!
    sport: String!
  }

  type Boots implements Shoe {
    size: Int!
    brand: String!
    hasGrip: Boolean!
  }

  type Query {
    me: User!
    shoes: [Shoe!]!
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

    shoes() {
      return [
        { brand: 'Nike', size: 10, sport: 'Basketball' },
        { brand: 'Adidas', size: 6, hasGrip: true },
      ];
    },
  },

  Shoe: {
    __resolveType(shoe) {
      if (shoe.hasGrip) {
        return 'Boots';
      }

      return 'Sneakers';
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
