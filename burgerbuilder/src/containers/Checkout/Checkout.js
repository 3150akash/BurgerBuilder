import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from '../Checkout/ContactData/ContactData';
import * as action from '../../store/actions/index';
class Checkout extends Component {

    // componentWillMount (){
    //     this.props.onInitPurchase();
    // }
    // state = {
    //     ingredients: null,
    //     price:0
    // }
    // componentWillMount(){
    //     const query= new URLSearchParams(this.props.location.search);
    //     let ingredients={};
    //     let price=0;
    //     for(let param of  query.entries()){
    //         if(param[0] === 'price'){
    //         price = param[1];
    //         }
    //         else{
    //             ingredients[param[0]]=+param[1];
    //         }
    //     }
    //     console.log(JSON.stringify(ingredients)+"-----"+ price);
    //     this.setState({ingredients:ingredients,price:price});
    // }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchaseRedirect =this.props.purchased? <Redirect to="/" />:null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutCancelled={this.checkoutCancelledHandler}
                        onCheckoutcontinue={this.checkoutContinueHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}
const mapDispatchToProps = dispatch =>{
 return {
    onInitPurchase:() => dispatch(action.purchaseInit())
 };
}
export default connect(mapStatetoProps,mapDispatchToProps)(Checkout);