import * as actionTypes from '../actions/actiontypes';
import { updateObject } from '../utility';
const initialState = {
    ingredients: null,
    loading: false,
    error: false,
    totalPrice: 4,
    building:false
};
const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.6,
    meat: 1.3
};
const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientsName],
        building:true
    }
    return updateObject(state, updatedState);
}
const removeIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientsName],
        building:true

    }
    return updateObject(state, updatedState);
}
const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building:false

    });
}
const fecthIngredientfailed = (state, action) => {
    return updateObject(state, { error: true });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        //console.log("akash " + state.ingredients[action.ingredientsName])
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)

        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)

        case actionTypes.FETCH_INGREDIENTS_FAILED: return fecthIngredientfailed(state, action)

        default:
            return state;
    }
}
export default reducer;