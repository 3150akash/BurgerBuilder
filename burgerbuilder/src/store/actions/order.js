import * as actionTypes from '../actions/actiontypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess= (id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}
export const purchaseBurgerFail= (error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
}

export const purchaseBurgerStart = ()  =>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger =(orderData,token)=>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData)
        .then(
            response => {
                dispatch (purchaseBurgerSuccess(response.data.name,orderData));
            }
        ).catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    }
}

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart=()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }
}
export const fetchOrdersSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}
export const fetchOrderFail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}
export const fetchOrders=(token,userId)=>{

    return dispatch =>{
        dispatch(fetchOrdersStart());
        const quryParams = '?auth=' +token +'&orderBy="userId"&equalTo="'+ userId +'"';
        axios.get('/orders.json'+ quryParams)
        .then(response => {
            console.log(response.data);
            let fetchOrders=[];
            for( let key in response.data){
            fetchOrders.push({
                ...response.data[key],
                id:key
            });
            }
            dispatch(fetchOrdersSuccess(fetchOrders));
        })
        .catch(error => {
            dispatch(fetchOrderFail(error));
        });
    }
}