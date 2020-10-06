import React from "react";
//

import Search from "../../components/Search/index";

const SearchModal = data => {
  const { posts, isVisible } = data;

  return isVisible ? (
    <>
      <div>
        <Search posts={posts} />
      </div>
    </>
  ) : null;
};

export default SearchModal;
