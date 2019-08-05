import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../../src/axios-order';
import Spinner from '../../../components/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 10,
                    minLength: 5
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your address'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 10,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 10,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                },
                value: 'fastest',
                valid: true,
                validation: {}
            }
        },
        formIsValid: false,
        // loading: false
    }
    checkValidation = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    orderHandler = (event) => {
        //alert("AAAAA");
        event.preventDefault();
        //this.setState({ loading: true });
        //alert('You contiune');
        const formData = {};
        for (let formelementIdentifier in this.state.orderForm) {
            formData[formelementIdentifier] = this.state.orderForm[formelementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ing,
            price: this.props.totalPrice,
            orderData: formData,
            userId:this.props.userId
        
        }
        this.props.onOrderBurger(order,this.props.token);
        // axios.post('/orders.json', order)
        //     .then(
        //         response => {
        //             console.log(response);
        //             this.setState({ loading: false });
        //             this.props.history.push('/');
        //         }
        //     ).catch(error => {
        //         console.log(error);
        //         this.setState({ loading: false });

        //     });
            
    }
    inputChangedHandler = (event, inputIdentifier) => {
        //alert('Akash');
        console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormelement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormelement.value = event.target.value;
        updatedFormelement.valid = this.checkValidation(updatedFormelement.value, updatedFormelement.validation);
        updatedFormelement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormelement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }
    render() {
        const elementArray = [];
        for (let key in this.state.orderForm) {
            elementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {elementArray.map(element => (
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        changed={(event) => { this.inputChangedHandler(event, element.id) }}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact data</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        ing:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId

    };
}

const mapDispatchToProps = dispatch =>{
    return {

    onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));