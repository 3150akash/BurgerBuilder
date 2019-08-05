import React,{Component} from 'react';
import Aux from '../Auxiliary/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerclosedHandler =()=>{
        this.setState({showSideDrawer:false});
    }
    sidedrawerOpenHandler =() =>{
        this.setState((prevState) =>{ return{showSideDrawer: !prevState.showSideDrawer}});

    }
    render(){
        return(<Aux>
            <div>
                <Toolbar
                 openMenu={this.sidedrawerOpenHandler}
                 isAuth={this.props.isAuthenticated}
                 ></Toolbar>
                <SideDrawer 
                closed={this.sideDrawerclosedHandler}
                open={this.state.showSideDrawer}
                isAuth={this.props.isAuthenticated}
                />
            </div>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Aux>)
    }
}
const mapStateToProps =state =>{
    return{
        isAuthenticated:state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);