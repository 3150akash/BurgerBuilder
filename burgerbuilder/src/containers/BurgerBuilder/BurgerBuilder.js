import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';

// const INGREDIENT_PRICE = {
//     salad: 0.5,
//     cheese: 0.4,
//     bacon: 0.6,
//     meat: 1.3
// };

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={...}
    // }
    state = {
        //ingredients: null,
        //totalPrice: 4,
        //purchasable: false,
        purchasing: false,
    }
    componentDidMount() {
        this.props.onInitingredients();
        // axios.get('https://react-my-burger-ff5f3.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data ,loading:false});
        //     })
        //     .catch(err =>{this.setState({error:err})});
    }
    updatePurchaseState(ingredients) {
        // const ingredients={
        //     ...this.state.ingredients
        // }
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
        //this.setState({ purchasable: sum > 0 });

    }
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const olderPrice = this.state.totalPrice;
    //     const newPrice = olderPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICE[type];
    //     const olderPrice = this.state.totalPrice;
    //     const newPrice = olderPrice - priceDeduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);

    // }
    purchaseHandler = () => {
        if(this.props.isAuthenticated)
        {
        this.setState({ purchasing: true });
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/Auth')
        }

    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });

    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        // this.setState({ loading: true });
        // //alert('You contiune');
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'nibedita',
        //         address: {
        //             street: 'teststreet',
        //             zipcode: '560102',
        //             country: 'India'
        //         },
        //         email: 'selly04@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(
        //         response => {
        //             console.log(response);
        //             this.setState({ loading: false, purchasing: false });
        //         }
        //     ).catch(error => {
        //         console.log(error);
        //         this.setState({ loading: false, purchasing: false });

        //     })
           // ;
        //    const queryParams=[];
        //    for (let i in this.state.ingredients){
        //        queryParams.push(encodeURIComponent(i)+ '='+encodeURIComponent(this.state.ingredients[i]))
        //    }
        //    queryParams.push('price='+ this.state.totalPrice);
        // const queryString=queryParams.join('&');
            // this.props.history.push(this.props.history.push({
            //     pathname:'/checkout',
            //     search:queryString
            // });
            this.props.history.push('/checkout')
    }
    render() {
        const disableInfo = {
            ...this.props.ing
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error?<p>ingredients cant be loaded</p>:<Spinner />;
        if (this.props.ing) {
            burger = (<Aux>
                <Burger ingredients={this.props.ing} />
                <BuildControls ingredientAdded={this.props.addIngredientHandler1}
                    ingredientRemoved={this.props.removeIngredientHandler1}
                    disabled={disableInfo}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState}
                    isAuth={this.props.isAuthenticated}
                    ordered={this.purchaseHandler}></BuildControls>
            </Aux>);
            orderSummary = <OrderSummary ingredients={this.props.ing}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}>
            </OrderSummary>;
        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

    }

}
const mapstateToProps = state =>{
    return{
        ing:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}
const mapdispatchToProps = dispatch =>{
    return{
        addIngredientHandler1:(ingName)=>dispatch(action.addIngredient(ingName)),
        removeIngredientHandler1:(ingName)=>dispatch(action.removeIngredient(ingName)),
        onInitingredients:() => dispatch(action.initIngredients()),
        onInitPurchase:() => dispatch(action.purchaseInit()),
        onSetAuthRedirectPath:(path) =>dispatch(action.setAuthRedirectPath(path))
    };
}
export default connect(mapstateToProps,mapdispatchToProps)(withErrorHandler(BurgerBuilder, axios));