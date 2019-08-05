import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/NavigationItems'
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Aux';
const sideDrawer = (props) => {
    let attachedclasses=[classes.SideDrawer, classes.Close];
    if(props.open){
        attachedclasses=[classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedclasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </div>
        </Aux>
    );
}

export default sideDrawer;