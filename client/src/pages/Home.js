// Integrate Apollo Hooks
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
// importing the useQuery hook. This will allow us to make requests to graphql server.
import ThoughtList from '../components/ThoughtList';


const Home = () => {
  // use useQuery hook to make query request
  // optional changing negates the need to check if an object even exists before acccessing its properites
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // if data exists then store it in thoughts constant. if no data exists store into an empty array.
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ): (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..."/>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
