import * as actionType from '../actions/actionType'
import {updateObject} from '../utility'

const initialState = {

    orders:[],
    loading:false,
    purchased:false
};


const purhaseInit = (state,action) =>{
    return updateObject(state,{purchased:false})
    /*return{
        ...state,
        purchased:false
    };*/   
}

const purchaseBurgerStart = (state,action)=>{
    return updateObject(state,{loading:true});
    /*return{
        ...state,
        loading:true
    };*/ 
}

const purchaseBurgerSuccess = (state,action) =>{
  const order = updateObject(action.orderData,action.id);
  return updateObject(state,{
    loading:false,
    purchased:true,
    orders:state.orders.concat(order)
  });
  /*const order = {
      ...action.orderData,
      id:action.id
  } 
    return{
    ...state,
    loading:false,
    purchased:true,
    orders:state.orders.concat(order)  
  };*/
}

const purchaseBurgerFail = (state,action) =>{
    return updateObject(state,{loading:false});
    /*return{
      ...state,
      loading:false
    };*/
}


const fetchOrdersStart = (state,action) =>{
    return updateObject(state,{loading:true});
  /*return{
    ...state,
    loading:true
  };*/  
}

const fetchOrdersSuccess = (state,action) =>{
    return updateObject(state,{
        orders:action.orders,
        loading:false
      });
      /*return{
        ...state,
        orders:action.orders,
        loading:false
      };*/
}

const fetchOrdersFail = (state,action) =>{
    return updateObject(state,{loading:false});
    /*return{
      ...state,
      loading:false
    };*/
}

const reducer = (state = initialState,action) =>{

switch(action.type){
case actionType.PURCHASE_INIT:return purhaseInit(state,action);
case actionType.PURCHASE_BURGER_START:return purchaseBurgerStart(state,action);
case actionType.PURCHASE_BURGER_SUCCESS:return purchaseBurgerSuccess(state,action);
case actionType.PURCHASE_BURGER_FAIL:return purchaseBurgerFail(state,action);
case actionType.FETCH_ORDERS_START:return fetchOrdersStart(state,action);
case actionType.FETCH_ORDERS_SUCCESS:return fetchOrdersSuccess(state,action);
case actionType.FETCH_ORDERS_FAIL:return fetchOrdersFail(state,action);
default:return state;

}

}

export default reducer; 