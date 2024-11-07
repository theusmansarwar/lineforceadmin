// src/hooks/useLoading.js

import { useState, useEffect } from "react";

/**
 * Custom hook to manage loading state and display a loader.
 * @param {React.Component} LoaderComponent - The loader component to display.
 * @param {number} delay - The delay time before loading is set to false.
 * @returns {object} - An object with loading state and the loader component.
 */
const useLoading = (LoaderComponent, delay = 2000) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [delay]);

  const Loader = loading ? <LoaderComponent /> : null;

  return { loading, Loader };
};

export default useLoading;
