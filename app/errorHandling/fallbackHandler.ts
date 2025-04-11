const fallbackHandler = (error: Error, context?: string) => {
    console.error(`Unexpected error${context ? ` in ${context}` : ''}:`, error);
    // Optionally, you could add:
    // - Logging to a service
    // - User-friendly error notification
    // - Potential error recovery mechanism
  };
  
  export { fallbackHandler };
  export default fallbackHandler;