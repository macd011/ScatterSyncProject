export const getFirebaseAuthErrorMessage = (code: string): string => {
    switch (code) {
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/email-already-in-use":
        return "This email is already associated with another account.";
      default:
        return "An unknown error occurred. Please try again.";
    }
  };
  