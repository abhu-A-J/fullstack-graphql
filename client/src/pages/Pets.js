import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PetsList from '../components/PetsList';
import NewPetModal from '../components/NewPetModal';
import Loader from '../components/Loader';

const PETS_FIELD = gql`
  fragment PetsFields on Pet {
    id
    name
    type
    img
    vaccinated @client
    owner {
      id
      age @client
    }
  }
`;

const ALL_PETS = gql`
  ${PETS_FIELD}

  query AllPets {
    pets {
      ...PetsFields
    }
  }
`;

const CREATE_PET = gql`
  ${PETS_FIELD}
  mutation createPet($petDetails: NewPetInput!) {
    addPet(input: $petDetails) {
      ...PetsFields
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false);

  const { data, loading, error } = useQuery(ALL_PETS);

  const [createPet, newPet] = useMutation(CREATE_PET, {
    // Optimistic UI updates
    // optimisticResponse: {},

    // update the cache with the latest returned results from server
    update(cache, { data: { addPet } }) {
      // get all pets first
      const { pets } = cache.readQuery({ query: ALL_PETS });

      // add the new pet returned from database to cache directly (stops refetch)
      cache.writeQuery({
        query: ALL_PETS,
        data: {
          pets: [addPet, ...pets],
        },
      });
    },
  });

  const onSubmit = (input) => {
    setModal(false);
    createPet({
      variables: { petDetails: input },
      // optimisticResponse: {
      //   // overall operation
      //   __typename: 'Mutation',

      //   // details for mutation
      //   addPet: {
      //     __typename: 'Pet',
      //     id: Date.now(),
      //     name: input.name,
      //     type: input.type,
      //     img: 'https://via.placeholder.com/300',
      //   },
      // },
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error || newPet.error) {
    return <p>Error</p>;
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>Add pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  );
}
