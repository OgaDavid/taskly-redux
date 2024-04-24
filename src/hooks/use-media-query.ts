import { useState, useEffect } from "react";

/**
 * A custom hook that returns a boolean value indicating whether the specified media query matches the current viewport.
 *
 * @param query - The media query string to match against the viewport.
 * @returns A boolean value indicating whether the media query matches the current viewport.
 */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a new MediaQueryList object based on the provided query
    const mediaQuery = window.matchMedia(query);

    // Define a callback function to handle changes in the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      // Update the matches state based on the new media query result
      setMatches(event.matches);
    };

    // Add an event listener to the media query object to listen for changes
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Set the initial matches state based on the media query result
    setMatches(mediaQuery.matches);

    // Clean up the event listener when the component unmounts or the query changes
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [query]);

  // Return the current matches state
  return matches;
}

export default useMediaQuery;
