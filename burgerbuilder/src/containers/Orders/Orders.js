import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        // axios.get('/orders.json')
        //     .then(response => {
        //         console.log(response.data);
        //         let fetchOrders=[];
        //         for( let key in response.data){
        //         fetchOrders.push({
        //             ...response.data[key],
        //             id:key
        //         });
        //         }
        //         this.setState({loading: false,orders:fetchOrders })
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false })
        //     });
        this.props.fetchOrders(this.props.token,this.props.userId);
    }
    render() {
        let order = <Spinner />
        if (!this.props.loading) {
            order =
                (
                    this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    ))
                )
        }
        return (
            <div>
                {order}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapdispatchToProps = dispatch => {
    return {
        fetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(withErrorHandler(Orders, axios));