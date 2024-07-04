import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidEmailFeild, checkValidPasswordFeild } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { LOGIN_BG } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [emailValidationErr, setEmailValidationErr] = useState(null);
  const [passValidationErr, setPassValidationErr] = useState(null);
  const [signinOrsignupErr, setsigninOrsignupErr] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  const handleButtonClick = () => {
    const emailErrMsg = checkValidEmailFeild(email.current.value);
    setEmailValidationErr(emailErrMsg);
    const passErrMsg = checkValidPasswordFeild(password.current.value);
    setPassValidationErr(passErrMsg);

    if (emailErrMsg || passErrMsg) return null;

    if (!isSignInForm) {
      // Signed up
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
          }).catch((error) => {
            setsigninOrsignupErr(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setsigninOrsignupErr(errorCode + "-" + errorMessage);
        });
    }
    else {
      // Signed in
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setsigninOrsignupErr(errorCode + "-" + errorMessage);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          src={LOGIN_BG} alt="bg-img" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='absolute w-3/12 p-12 my-28 mx-auto right-0 left-0 bg-black text-white bg-opacity-80'>
        <h1 className='font-bold text-3xl mb-5'>{isSignInForm ? "Sing In" : "Sign Up"}</h1>
        {!isSignInForm &&
          <input type="text" ref={name} className='w-full p-4 my-3 bg-black border border-gray-500 rounded-lg' placeholder='Full Name' />
        }

        <input type="text" ref={email} className='w-full p-4 my-3 bg-black border border-gray-500 rounded-lg' placeholder='Email' />
        <p className='text-sm ml-2 text-red-600'>{emailValidationErr}</p>
        <input type="password" ref={password} className='w-full p-4 my-3 bg-black border border-gray-500 rounded-lg' placeholder='password' />
        {passValidationErr && (
          <p className='text-sm ml-2 text-red-600'>password should contains atleast on capital-alphabate, number and speciala character</p>
        )}
        {signinOrsignupErr && (
          <p className='text-sm ml-2 text-red-600'>Invalid email or password</p>
        )}

        <button className='w-full p-3 bg-red-700 my-3 rounded-lg' onClick={() => handleButtonClick()}>{isSignInForm ? "Sing In" : "Sign Up"}</button>
        <p className='my-3'>{isSignInForm ? "New to Netflix?" : "Already member?"} <span className='font-bold cursor-pointer' onClick={toggleForm}>{isSignInForm ? "Sing up now." : "Sign in now."}</span></p>
      </form>
    </div>
  )
}

export default Login;