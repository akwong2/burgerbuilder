import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../hoc/axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.reduce( (acc, val) => {
				acc += ingredients[val]
				return acc;
			}, 0);
		this.setState({purchasable: sum > 0})
	}

	addIngredientHandler = (type) => {
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = this.state.ingredients[type] + 1;
		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		this.setState( {totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = oldCount - 1;
		const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
		this.setState( {totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Alvin Kwong",
				address: {
					street: "Test Street",
					zipCode: "12345"
				},
				email: "test@test.com"
			},
			deliveryMethod: "fastest"
		}
		axios.post('/orders.json', order)
			.then( (response) => {
				console.log(response)
			})
			.catch( (err) => {
				console.log(err)
			})
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary 
						ingredients={this.state.ingredients}
						burgerPrice={this.state.totalPrice}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinue={this.purchaseContinueHandler}/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
