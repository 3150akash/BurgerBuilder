import React from 'react';
 import classes from './DrawerToggle.module.css';
// import Logo from '../../Logo/Logo';
// import NavigationItems from '../Navigationitems/NavigationItems';
const drawerToggle = (props) => (
  <div onClick={props.clicked} className={classes.DrawerToggle}>
  <div></div>
  <div></div>
  <div></div>
  </div>

)

export default drawerToggle;