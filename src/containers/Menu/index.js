import React, { useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import MenuItem from "../../components/Menu-item/index";
//
import "./index.scss";
//
import Logo from "../../../static/img/svg/icon-logo.svg";
import CloseIcon from "../../../static/img/svg/icon-close-menu.svg";

const MENU_QUERY = graphql`
  fragment MenuItem on WPGraphQL_MenuItem {
    id
    label
    url
    title
    target
  }

  query GETMAINMENU {
    wpcontent {
      menuItems(where: { location: MENU_1 }) {
        nodes {
          ...MenuItem
          icons {
            categoryIcons {
              sourceUrl
            }
          }
        }
      }
      generalSettings {
        url
      }
    }
  }
`;

const Menu = (pageUri) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  return (
    <>
      <button
        className="btn btn-rectangle uppercase"
        onClick={() => setMenuVisibility(!menuVisibility)}
      >
        menu
      </button>
      {menuVisibility ? (
        <div className="menu-modal text-center">
          <StaticQuery
            query={MENU_QUERY}
            render={data => {
              if (data.wpcontent.menuItems) {
                const menuItems = data.wpcontent.menuItems.nodes;
                const wordPressUrl = data.wpcontent.generalSettings.url;
                
                return (
                  <>
                    <button
                      className="btn"
                      onClick={() => setMenuVisibility(!menuVisibility)}
                    >
                      <CloseIcon className="icon-close" />
                    </button>
                    <Link className="menu-logo" to="/">
                      <Logo />
                    </Link>
                    <ul>
                      {menuItems &&
                        menuItems.map(menuItem => (
                          <MenuItem
                            key={menuItem.id}
                            menuItem={menuItem}
                            wordPressUrl={wordPressUrl}
                            pageUri ={pageUri}
                          />
                        ))}
                    </ul>
                  </>
                );
              }
              return null;
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default Menu;
