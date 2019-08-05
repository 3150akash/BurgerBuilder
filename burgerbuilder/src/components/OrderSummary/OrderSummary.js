import React from 'react';
import Burger from '../../Burger/Burger';

const orderSummary =(props)=>{
return(
    <div>
        <h1> We hope it tastes well !</h1>
        <div style={{width:'300px',height:'300px',margin:'auto'}}>
            <Burger  ingredients/>
        </div>
    </div>
);
}
export default orderSummary;