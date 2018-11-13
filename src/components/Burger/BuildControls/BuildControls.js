import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
{label:"Salad",type:"salad"},
{label:"Bacon",type:"bacon"},
{label:"Cheese",type:"cheese"},
{label:"Meat",type:"meat"}
]

const buildControls = (props) =>(

<div className={classes.BuildControls}>
<p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
{controls.map(control=>(
<BuildControl
 key={control.label} 
 label={control.label}
 ingredientAdded={() => props.ingredientAdded(control.type)}
 ingredientRemoved={()=>props.ingredientRemoved(control.type)}
 disabled = {props.disabled[control.type]}
 />
))}
<button className={classes.OrderButton}
 disabled={!props.purchasable}
 onClick={props.showOrderSummary}>{props.isAuth?'Order Now':'SIGN UP TO ORDER'}</button>
</div>
);

export default buildControls;