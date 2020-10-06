import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
//
import Menu from "../../containers/Menu/index";
import SearchMagnifier from "../../../static/img/svg/icon-search.svg";
import SearchModal from "../Search-Modal/index";
import Logo from "../../../static/img/svg/icon-logo.svg";
//
import "./_header-home.scss";

const Header = ({ siteTitle, posts, isHome, pageUri }) => {
  const [searchModalVisibility, setSearchModalVisibility] = useState(false);

  return (
    <header className="header-home">
      <div className="buttons-wrapper">
        <Menu pageUri={pageUri} />
        <span className="divider-vertical">|</span>
        <button
          className="btn btn-rectangle"
          onClick={() => setSearchModalVisibility(!searchModalVisibility)}
        >
          <SearchMagnifier className="icon" />
        </button>
      </div>
      <SearchModal posts={posts} isVisible={searchModalVisibility} />
      <Link className="logo" to="/">
        <Logo />
      </Link>
      <Link to="#" className="uppercase">
        njuzletter
      </Link>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
