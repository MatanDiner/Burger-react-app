import React,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../WithErrorHandler/WithErrorHandler'
import * as action from '../../../store/actions/index'
class ContactData extends Component{

state={

    orderForm:{
        name:{

            elementType:'input',
            elementConfig:{
                  type:'text',
                  placeHolder:'Name'
         },
         value:'',
         validation:{
             required:true
         },
         valid:false,
         touched:false
        },
        street:{
            elementType:'input',
            elementConfig:{
                 type:'text',
                 placeHolder:'Street'
        },
        value:'',
        validation:{
            required:true
        },
        valid:false,
        touched:false
        },
        zipCode:{
            elementType:'input',
            elementConfig:{
                 type:'text',
                 placeHolder:'zip code'
         },
         value:'',
         validation:{
            required:true,
            minLength:5,
            maxLength:5
        },
        valid:false,
        touched:false
        },
        country:{
            elementType:'input',
            elementConfig:{
                 type:'text',
                 placeHolder:'Country'
             },
             value:'',
             validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        email:{
            elementType:'input',
            elementConfig:{
                 type:'text',
                 placeHolder:'Email'
             },
             value:'',
             validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        deliveryMethod:{
            elementType:'select',
            elementConfig:{
                 options:[
                     {value:'fastest',displayValue:'Fastest'},
                     {value:'cheapest',displayValue:'Cheapest'}
                 ]
             },
             value:'fastest',
             validation:{},
             valid:true
        }    
    },
        formIsValid:false
}


orderHandler = (event) =>{ //submit can be done also from onClick event on the button 

    event.preventDefault();

    this.setState({loading:true})
       // alert('continue');
       const formData = {};
       for(let formElementIdentifier in this.state.orderForm){
           formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
       }
       const order = {
           ingredients:this.props.ings,
           price:this.props.price,
           orderDataForm:formData,
           userId:this.props.userId
       }
       this.props.onOrderBurger(order,this.props.token);

}

checkValidation(value,rules){

    if(!rules){
        return;
    }

    let isValid = true;
    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
    }


inputChangeHandler = (event,elementId) =>{

    const orderForm = {...this.state.orderForm};
    orderForm[elementId].value = event.target.value;
    orderForm[elementId].valid = this.checkValidation(orderForm[elementId].value,orderForm[elementId].validation);
    orderForm[elementId].touched = true;
    //console.log(orderForm[elementId]);

    let formIsValid = true;
    for(let i in orderForm){
        formIsValid = orderForm[i].valid && formIsValid;
    }

    this.setState({orderForm:orderForm,
                   formIsValid:formIsValid
                 })

}

render(){

const formElementsArray = [];
for(let key in this.state.orderForm){

    formElementsArray.push({
        id:key,
        formElement:this.state.orderForm[key]
       /* elementType:this.state.orderForm[key].elementType,
        elementConfig:this.state.orderForm[key].elementConfig,
        value:this.state.orderForm[key].value,
        */
    }) 
}

let form = (
<form onSubmit={this.orderHandler}>
    {formElementsArray.map(element=>{

      return <Input key={element.id}
                    elementType={element.formElement.elementType}
                    elementConfig={element.formElement.elementConfig}
                    value={element.formElement.value} 
                    isValid = {element.formElement.valid}
                    shouldValid={element.formElement.validation}
                    touched={element.formElement.touched}
                    changed={(event)=>this.inputChangeHandler(event,element.id)}/>
    })}
    <Button disabled={!this.state.formIsValid} btnType="Success">Order</Button>
</form>);

if(this.props.loading){
    form = <Spinner/>;
}

return(

<div className={classes.ContactData}>
    <h4>enter your contact data</h4>
    {form}
</div>

);

}


}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    };
}

const mapDispatchToProps = dispatch =>{
    return{
    onOrderBurger : (orderData,token)=>dispatch(action.purchaseBurger(orderData,token))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));