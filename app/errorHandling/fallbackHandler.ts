const fallbackHandler = (error: Error, context?: string) => {
    console.error(`Unexpected error${context ? ` in ${context}` : ''}:`, error);
  };
  
  export { fallbackHandler };
  export default fallbackHandler;