import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

const NavigationBar = () => {

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    });  
  }

  return (
    <div className='absolute w-screen bg-gradient-to-b from-black flex justify-between'>
      <div>
        <img className='w-44'
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
      </div>
      <div>
        <button className='font-bold text-white bg-red-700 p-2 mt-4 mr-10' onClick={handleSignOut}>Sign Out</button> {/* Remove the parentheses */}
      </div>
    </div>
  );
}

export default NavigationBar;
