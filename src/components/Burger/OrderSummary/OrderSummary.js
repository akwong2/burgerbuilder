import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = ( props ) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .reduce( (acc, val) => {
            acc.push(
                <li key={val}>
                    <span style={{textTransform: 'capitalize'}}>{val}</span>: {props.ingredients[val]}
                </li>)
            return acc;
        }, []);

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
};

export default orderSummary;
