const handleFirebaseError = (error: any) => {
  const errorCode = error.code;
  let userMessage = 'An unexpected error occurred';

  switch (errorCode) {
    case 'auth/invalid-email':
      userMessage = 'Invalid email address';
      break;
    case 'auth/user-disabled':
      userMessage = 'This account has been disabled';
      break;
    case 'auth/user-not-found':
      userMessage = 'No user found with this email';
      break;
    case 'auth/wrong-password':
      userMessage = 'Incorrect password';
      break;
    case 'auth/email-already-in-use':
      userMessage = 'Email is already registered';
      break;
    case 'auth/weak-password':
      userMessage = 'Password is too weak';
      break;
    default:
      console.error('Firebase Error:', error);
  }

  return userMessage;
};

export { handleFirebaseError };
export default handleFirebaseError;