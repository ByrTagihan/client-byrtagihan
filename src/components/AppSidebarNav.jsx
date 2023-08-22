import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { CBadge } from "@coreui/react";
import PropTypes from "prop-types";

export const AppSidebarNav = ({ items, userRoles }) => {
  const location = useLocation();

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, roles, ...rest } = item;
    const Component = component;

    // Periksa apakah role pengguna saat ini diizinkan untuk melihat menu ini
    if (roles && !roles.includes(userRoles)) {
      return null; // Jika tidak diizinkan, menu ini tidak ditampilkan
    }

    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };

  const navGroup = (item, index) => {
    const { component, name, icon, to, roles, ...rest } = item;
    const Component = component;

    // Periksa apakah role pengguna saat ini diizinkan untuk melihat menu ini
    if (roles && !roles.includes(userRoles)) {
      return null; // Jika tidak diizinkan, menu ini tidak ditampilkan
    }

    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    );
  };

  //console.log(userRoles);

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  userRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
