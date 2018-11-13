import * as actionType from './actionType'
import axios from '../../axios-order'

export const addIngredient = (name) =>{

    return{
        type:actionType.ADD_INGREDIENT,
        ingredientName:name
    };
};

export const removeIngredient = (name) =>{
    return{
        type:actionType.REMOVE_INGREDIENT,
        ingredientName:name
    };
};



const setIngredients = (ingredients) =>{
    return{
        type:actionType.SET_INGREDIENTS,
        ingredients:ingredients  
    }
}

const fetchIngredientsFailed = () =>{
    return{
       type:actionType.FETCH_INGREDIENTS_FAILED,
};
};

export const initIngredients = () =>{

return dispatch =>{
    axios.get('ingredients.json')
    .then(response=>{
        dispatch(setIngredients(response.data));
    })  
    .catch(error=>{
        dispatch(fetchIngredientsFailed());
    })     
};

};

