import { createSelector } from 'reselect';

// input selector
const selectCart = state => state.cart;

// output selectors
export const selectCartHidden = createSelector(
	[selectCart],
	cart => cart.hidden
);

export const selectCartItems = createSelector(
	[selectCart],
	cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	cartItems => cartItems.reduce(
		(accumulatedQuanity, cartItem) => accumulatedQuanity + cartItem.quantity, 
		0
	)
);

export const selectCartTotal = createSelector(
	[selectCartItems],
	cartItems => cartItems.reduce(
		(accumulatedTotal, cartItem) => accumulatedTotal + (cartItem.quantity * cartItem.price),
		0
	)
);