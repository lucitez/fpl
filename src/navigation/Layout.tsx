import React, { FC, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ENTER,
  Layout as MDLayout,
  LayoutCloseNavigationButton,
  useCrossFade,
  useLayoutNavigation,
} from 'react-md';
import App from '../App';
import navItems from './navItems';

const Layout: FC = () => {
  const { pathname } = useLocation();
  const [, transitionProps, dispatch] = useCrossFade();

  const prevPathname = useRef(pathname);
  if (pathname !== prevPathname.current) {
    prevPathname.current = pathname;
    dispatch(ENTER);
  }

  return (
    <MDLayout
      treeProps={useLayoutNavigation(navItems, pathname, Link)}
      title='FPL Player Statistics'
      mainProps={transitionProps}
      desktopLayout='temporary'
      navProps={{
        children: <LayoutCloseNavigationButton />,
      }}
    >
      <App />
    </MDLayout>
  );
};

export default Layout;
