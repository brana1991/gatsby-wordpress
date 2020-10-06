import React, { useState, useEffect } from "react";

const Search = props => {
  console.log(props);

  const [searchState, setSearchCriteria] = useState({
    searchIndex: props.posts,
    searchTerm: "",
  });

  const handleChange = e => {
    setSearchCriteria({ ...searchState, searchTerm: e.target.value });
    console.log("fds", searchState.searchTerm);
  };

  const Result = props => {
    if (!searchState.searchTerm) return null;
    return props.result.map(post => <p key={post.id}>{post.title}</p>);
  };

  const { searchIndex, searchTerm } = searchState;
  const filteredResults = searchIndex.filter(term =>
    term.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="search your term"
      />
      <Result result={filteredResults} />
    </div>
  );
};

export default Search;
