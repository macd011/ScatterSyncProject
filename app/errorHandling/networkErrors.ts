const handleNetworkError = (error: any) => {
    console.error('Network Error:', error);
    
    if (!navigator.onLine) {
      return 'No internet connection. Please check your network.';
    }
  
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }
  
    return 'Network error. Please try again later.';
  };
  
  export { handleNetworkError };
  export default handleNetworkError;