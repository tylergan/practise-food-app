import { useReducer, useEffect } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        )
        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;

        if (existingCartItem) { // item already exists in cart
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item) // concat returns a new array, updating the state immutably
        }
        
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    } else if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        )
        const existingCartItem = state.items[existingCartItemIndex]

        let updatedItems;
        if (existingCartItem.amount === 1) { // if there is only one item, remove it from the cart
            updatedItems = state.items.filter(item => item.id !== action.id) // return a new array without the item specified in the id
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 } // if there is more than one item, reduce the amount by 1
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }

        const updatedTotalAmount = state.totalAmount - existingCartItem.price

        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    } else if (action.type === 'REPLACE') {
        return {
            ...state,
            items: action.items,
            totalAmount: action.totalAmount,
        }
    } else if (action.type === 'CLEAR') {
        return defaultCartState
    }

    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    // load cart from local storage if it exists
    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        const storedCartParsed = JSON.parse(storedCart)
        if (storedCartParsed) {
            dispatchCartAction({
                type: 'REPLACE', 
                items: storedCartParsed.items, 
                totalAmount: storedCartParsed.totalAmount 
            })
        }
    }, [])

    // update local storage if cart items change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartState))
    }, [cartState])
    
    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item,
        })
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id,
        })
    }

    const clearCartHandler = () => {
        dispatchCartAction({
            type: 'CLEAR',
        })
    }
    
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider