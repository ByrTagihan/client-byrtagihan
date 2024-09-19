import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CBadge } from "@coreui/react";
import PropTypes from "prop-types";
import { API_DUMMY } from "../utils/baseURL";
import axios from "axios";

export const AppSidebarNav = ({ items, userRoles }) => {
  const location = useLocation();
  const [notifCount, setNotifCount] = useState(0);
  useEffect(() => {
    const fetchNotifCount = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/member/notif`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        const { data } = response;
        const unreadNotifications = data.data.filter((notif) => !notif.readed);
        setNotifCount(unreadNotifications.length);
        console.log("notif length: ", unreadNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifCount();
  }, []);

  const navLink = (name, icon, badge, isInbox) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {isInbox ? (
          <CBadge color="danger" className="ms-auto">
            {notifCount}
          </CBadge>
        ) : (
          badge && (
            <CBadge color={badge.color} className="ms-auto">
              {badge.text}
            </CBadge>
          )
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, roles, ...rest } = item;
    const Component = component;

    if (roles && !roles.includes(userRoles)) {
      return null;
    }

    const isInbox = name === "Notifikasi";

    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}>
        {navLink(name, icon, badge, isInbox)}
      </Component>
    );
  };

  const navGroup = (item, index) => {
    const { component, name, icon, to, roles, ...rest } = item;
    const Component = component;
    if (roles && !roles.includes(userRoles)) {
      return null;
    }

    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}>
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    );
  };

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
