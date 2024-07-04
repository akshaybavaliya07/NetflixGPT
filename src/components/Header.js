import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { NETFLIX_LOGO } from '../utils/constants';
import { toggleGPTSearchView } from '../utils/gptSlice'
import { SUPPORTED_LANGUAGE } from '../utils/languageConstants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // const uid = user.uid;
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate('/browse');
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  }

  const handleGptSearchClick = () => {
    // toggle GPT Search
    dispatch(toggleGPTSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='absolute w-screen bg-gradient-to-b from-black flex flex-col md:flex-row justify-between z-10'>
      <div>
        <img className='mx-auto md:mx-0 w-44'
          src={NETFLIX_LOGO} alt="logo" />
      </div>
      { user && 
        <div className='mx-[33px] md:mx-0'>
          <button 
            className='bg-green-600 text-white rounded-md py-2 px-4 mt-4 mr-2 hover:bg-green-400' 
            onClick={handleGptSearchClick}>
              { showGPTSearch ? 'Home' : 'GPT Search'}
            </button>
          { showGPTSearch && 
            <select className='bg-gray-700 text-white rounded-md m-4 py-2 px-4' onChange={handleLanguageChange}>
            { SUPPORTED_LANGUAGE.map( lang => 
              <option key={lang.identifier} value={lang.identifier}>{ lang.name } </option>
            )}
            </select>}
          <button 
            className='font-bold text-white bg-red-700 rounded-md py-2 px-4 md:px-6 mt-4 mr-6 hover:bg-red-500' 
            onClick={handleSignOut}>
              Sign Out
          </button>
      </div>}
    </div>
  )
}

export default Header;