import * as actionType from '../actions/actionType'
import {updateObject} from '../utility'

const intialState = {
    ingredients :null,
    totalPrice:4,
    error:false,
    building:false
};


const INGREDIENTS_PRICES = {

    salad:0.5,
    meat:1.3,
    bacon:0.6,
    cheese:0.4
};


const addIngredient = (state,action) =>{

    const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updateState = {
      ingredients: updatedIngredients,
      totalPrice:state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
      building:true
    }
    return updateObject(state,updateState);

    /*return{
   ...state,
   ingredients:{
       ...state.ingredients,
       [action.ingredientName]:state.ingredients[action.ingredientName] + 1
   },
   totalPrice:state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
  };*/
}

const removeIngredient = (state,action) =>{
    const updatedIng = {[action.ingredientName]:state.ingredients[action.ingredientName] - 1};
    const updatedIngs = updateObject(state.ingredients,updatedIng);
    const updateSt = {
      ingredients: updatedIngs,
      totalPrice:state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
      building:true
    }
    return updateObject(state,updateSt);
    /*return{
     ...state,
     ingredients:{
         ...state.ingredients,
         [action.ingredientName]:state.ingredients[action.ingredientName] - 1,
     },
     totalPrice:state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
     };*/
}

const setIngredients = (state,action) =>{
    return updateObject(state,{
        ingredients:action.ingredients,
        totalPrice:4,
        error:false,
        building:false
     });
    /* return{
        ...state,
        ingredients:action.ingredients,
        totalPrice:4,
        error:false
     };*/

}

const fetchIngredientsFail = (state,action) =>{
    return updateObject(state,{ error:true});
    /* return{
      ...state,
      error:true
     };*/

}

const reducer = (state = intialState,action)=>{

switch(action.type){

case actionType.ADD_INGREDIENT:return addIngredient(state,action);
case actionType.REMOVE_INGREDIENT:return removeIngredient(state,action); 
case actionType.SET_INGREDIENTS:return setIngredients(state,action); 
case actionType.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFail(state,action);
default:return state;
}

}

export default reducer;