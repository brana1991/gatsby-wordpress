// src/components/MenuItem.js
import React from "react";
import { createLocalLink } from "../../utils/index";
import { Link } from "gatsby";

const MenuItem = ({ menuItem, wordPressUrl, pageUri }) => {
  const categoriIcon = menuItem.icons.categoryIcons
    ? menuItem.icons.categoryIcons.sourceUrl
    : "";

  const style = { "--bg-image": `url("${categoriIcon}")` };
  const LocalLink = createLocalLink(menuItem, wordPressUrl);
  //
  let activeClass = pageUri.pageUri == LocalLink ? "active" : "";

  return (
    <li style={style}>
      <Link
        className={`uppercase menu-link ${activeClass}`}
        to={createLocalLink(menuItem, wordPressUrl)}
      >
        {menuItem.label}
      </Link>
    </li>
  );
};

export default MenuItem;
