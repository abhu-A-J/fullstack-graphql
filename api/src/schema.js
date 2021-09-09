const { gql } = require('apollo-server');

/**
 * Type Definitions for our Schema using the SDL.
 */

const typeDefs = gql`
  """
  This can be used for documentation and shows up on tools
  """
  enum PetType {
    DOG
    CAT
  }

  type User {
    id: ID!
    username: String!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: PetType!
    img: String!
  }

  # input type for creating a pet
  input PetInput {
    type: PetType
    name: String
  }

  input NewPetInput {
    type: PetType!
    name: String!
  }

  type Query {
    pets(input: PetInput): [Pet]!
    pet(input: PetInput): Pet
  }

  type Mutation {
    addPet(input: NewPetInput!): Pet!
  }
`;

module.exports = typeDefs;
