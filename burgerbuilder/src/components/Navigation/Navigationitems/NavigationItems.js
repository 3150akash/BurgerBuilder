import React from 'react';
import classes from './NavigatinItems.module.css';
 import NavigationItem  from './NavigationItem/NavigationItem';
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact >Burger Builder</NavigationItem>
    { props.isAuthenticated ?
    <NavigationItem link="/Orders" >Orders</NavigationItem>:null}
   { !props.isAuthenticated 
   ? <NavigationItem link="/Auth" >Authenticate</NavigationItem>
   : <NavigationItem link="/Logout" >Logout</NavigationItem>
   }

    </ul>
)

export default navigationItems;