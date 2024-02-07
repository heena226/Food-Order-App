import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
})

function cartReducer(state, action) {

    if(action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        // Creating the copy of items to modify the data
        const updatedItems = [...state.items];

        // If item is not preset FindIndex will return -1
        if (existingCartItemIndex > -1) {
            // Item present already
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };

            // Add new updatedItem into the updatedItems array
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            // Item not present already
            updatedItems.push({...action.item, quantity: 1});
        }

        return { ...state, items: updatedItems }
    }

    if(action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity > 1) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.splice(existingCartItemIndex, 1);

        }

        return {...state, items: updatedItems}
    }

    return state;
}

export function CartContextProvider({children}) {

    // 2nd arg to func is the initialState for the Reducer
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({type: 'ADD_ITEM', item});
    }

    function removeItem(id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id})
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    }

    console.log(cartContext);

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;