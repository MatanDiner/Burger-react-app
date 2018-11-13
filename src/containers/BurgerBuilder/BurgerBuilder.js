import React,{Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../WithErrorHandler/WithErrorHandler'

import {connect} from 'react-redux'
import * as action from '../../store/actions/index'


export class BurgerBuilder extends Component{

    /*constractor(props){
        super(props);
        this.state = {...};
  
    }*/

    state ={

        purchasing:false,
    }
    

    componentDidMount(){
       this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients){

     const sum = Object.keys(ingredients).map(IgKey=>{
    
    return ingredients[IgKey];
     }
     ).reduce((sum,el)=>{return sum + el;},0)
  
     return sum>0;
    }




    purchaseHandler = () =>{
        if(this.props.isAuthenticated){
        this.setState({purchasing:true});
        }
        else{
         this.props.onSetAuthRedirectPath('/Checkout')   
         this.props.history.push('/auth') ;
        }
    }

    purchaseCancelHandler = () =>{

        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{
        this.props.onPurchasedInit();   
        this.props.history.push('/Checkout') ;
    }

render(){

    const disabledInfo = {...this.props.ings};
    for(let key in disabledInfo){

        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let burger = this.props.error?<p>ingredients cannot be loaded!</p>:<Spinner/>
    let orderSummary = null;
    if(this.props.ings){
     burger = (

        <Aux>
           <Burger ingredients={this.props.ings}/>
           <BuildControls
             totalPrice = {this.props.price}
             ingredientAdded={this.props.onIngredientAdded}
             ingredientRemoved = {this.props.onIngredientRemoved}
             disabled = {disabledInfo}
             isAuth = {this.props.isAuthenticated}
             purchasable={this.updatePurchaseState(this.props.ings)}
             showOrderSummary={this.purchaseHandler}
           />
        </Aux>
    );

    orderSummary = <OrderSummary ingredients = {this.props.ings}
    totalPrice = {this.props.price}
    purchaseCancelled = {this.purchaseCancelHandler}  
    purchaseContinue = {this.purchaseContinueHandler}    />

    }

    return(
    
<Aux>
    <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
     {orderSummary}
    </Modal>
    {burger}
</Aux>

    );
}
    
}

const mapStateToProps = state =>{
return{
ings:state.burgerBuilder.ingredients,
price:state.burgerBuilder.totalPrice,
error:state.burgerBuilder.error,
isAuthenticated:state.auth.token !== null
};
}

const mapDispatchToProps = dispatch =>{
return{

    onIngredientAdded : (IgName) => dispatch(action.addIngredient(IgName)),
    onIngredientRemoved: (IgName) =>dispatch(action.removeIngredient(IgName)),
    onInitIngredients: ()=> dispatch(action.initIngredients()),
    onPurchasedInit : ()=>dispatch(action.purchasedInit()),
    onSetAuthRedirectPath : (path)=>dispatch(action.setAuthRedirectPath(path))
};
    
}


export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));