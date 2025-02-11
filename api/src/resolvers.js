/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

const { models, db } = require('./db');

module.exports = {

  Query: {
    pets(_, arguments, context,info) {

      const {input}=arguments;
      const { models } = context;

      return models.Pet.findMany(input);
    },

     pet(_, arguments, context,info) {

      const {input}=arguments;
      const { models } = context;

      return models.Pet.findOne(input);
    },


  },

  Pet: {
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300';
    },

    owner(pet,_,{models}){
      // console.log('Pet which is getting resolved',pet)
      return models.User.findOne()
    }
  },

  User:{
    pets(user,_,{models}){
      return models.Pet.findMany({id:user.petId})
    }
  },

   Mutation:{
    addPet(_,arguments,context){
      const {input}=arguments;
      const {models}=context;

      const createdPet=models.Pet.create(input);

      return createdPet;

    }
   }
};
