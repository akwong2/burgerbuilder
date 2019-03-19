import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    const igKeys = Object.keys(props.ingredients)
    let transformedIngredients = igKeys.reduce( (acc, val) => {
        for (let i = 0; i < props.ingredients[val]; i++) {
            acc.push(<BurgerIngredient key={val + i} type={val}/>)
        }
        return acc;
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
