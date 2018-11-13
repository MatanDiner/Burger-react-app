import React from 'react'
import classes from './Order.css'

const order = (props) =>{

const ingredients = [];
for(let ingredientName in props.ingredients){
    ingredients.push({
        name:ingredientName,
        value:props.ingredients[ingredientName]
    })
}

const ingredientsOutput = ingredients.map(ig=>{

    return <span 
                 style={{textTransform:'capitalize',
                         display:'inline-block',
                         margin:'0 8px',
                         border:'1px solid #ccc',
                         padding:'5px'                
                }}
                 key={ig.name}>{ig.name} ({ig.value})</span>
})


return(
<div className={classes.Order}>

<p>ingredients:{ingredientsOutput}</p>
<p>price: <strong>USD {props.price}</strong></p>
</div>

);

};
export default order;