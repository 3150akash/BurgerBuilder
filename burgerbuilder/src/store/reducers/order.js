import * as actionTypes from '../actions/actiontypes';
import axios from '../../axios-order';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });


        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return updateObject(state, {loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true});
        case actionTypes.PURCHASE_BURGER_FAILED:
                return updateObject(state,{loading: false});
        case actionTypes.FETCH_ORDER_START:
                return updateObject(state,{loading: true});
        case actionTypes.FETCH_ORDER_SUCCESS:
                return updateObject(state,
               { orders: action.orders,
                loading: false
            });
        case actionTypes.FETCH_ORDER_FAIL:
                return updateObject(state,
                {loading: false});
        default:
            return state;
    }
}
export default reducer;