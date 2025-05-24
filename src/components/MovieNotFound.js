import React from 'react';
import { Link } from 'react-router-dom';

const MovieNotFound = () => {
  return (
    <div className="text-center py-16 text-white bg-black">
      <h2 className="text-xl md:text-2xl mb-2 text-red-500">Movie Not Found</h2>
      <p className="text-sm text-gray-400 mb-4">
        Sorry, we couldn’t find the movie you’re looking for.
      </p>
      <Link
        to="/"
        className="inline-block text-sm px-4 py-1 bg-red-600 hover:bg-red-700 transition rounded"
      >
        Go Home
      </Link>
    </div>
  );
};

export default MovieNotFound;