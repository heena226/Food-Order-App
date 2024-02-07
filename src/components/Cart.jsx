import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {

    const cartCxt = useContext(CartContext);

    const userProgressCxt = useContext(UserProgressContext);

    const cartTotal = cartCxt.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price, 
        0
    );

    function handleCloseCart() {
        userProgressCxt.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCxt.showCheckout();
    }

    // console.log(cartCxt.items)

    return (
        <Modal 
            className="cart" 
            open={userProgressCxt.progress === 'cart'}
            onClose={handleCloseCart}>
            <h2>Your Cart</h2>
            <ul>
                {cartCxt.items.map((item) => (
                    <CartItem 
                        key={item.id} 
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCxt.addItem(item)}
                        onDecrease={() => cartCxt.removeItem(item.id)}
                    />    
                ))}
            </ul>
            <p className="cart-total">
                {currencyFormatter.format(cartTotal)}
            </p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {(cartCxt.items.length > 0) && 
                    <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
                }
            </p>
        </Modal>
    )
}