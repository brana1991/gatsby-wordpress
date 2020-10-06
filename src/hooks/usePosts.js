import { useState } from 'react';
import Globals from "../../global-variable"


export const usePosts = (postArray) => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  let numberOfLoads = 0;
  
  const loadMore = () => {
    let currentPostNumber = Globals.offset + Globals.PostPerPage * numberOfLoads;

    setFilteredPosts(postArray.slice(currentPostNumber, currentPostNumber + Globals.PostPerPage));
    numberOfLoads++
  }

  return {
    filteredPosts,
    setFilteredPosts,
    loadMore,
  };
};

export default usePosts;
