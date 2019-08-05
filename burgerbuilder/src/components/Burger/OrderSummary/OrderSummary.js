import React ,{Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Aux';
import Button from '../../UI/Button/Button';

class  OrderSummary extends Component {
    //this can  be  a functional component
    // componentDidUpdate(){
    //     console.log("did update");
    // }
    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalized' }}>{igKey}:</span>{this.props.ingredients[igKey]}
            </li>
        });
        return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicius burger with the  following ingredients:</p>
            <ul>
            {ingredientsSummary}
            </ul>
            <p><strong>Total Price:</strong>{this.props.price.toFixed(2)}</p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
        </Aux>
        );
    }
}
       

export default OrderSummary;