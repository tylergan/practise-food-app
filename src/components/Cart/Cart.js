import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import CartItem from './CartItem.js'
import styles from './Cart.module.css'

export default function Cart(props) {
    const cartCtx = useContext(CartContext)
    
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }

    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem 
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onRemove={cartItemRemoveHandler.bind(null, item.id)} // bind preconfigures the function to be called with the given arguments.
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        ))}
    </ul>

    return (
        <Modal onClose={props.onClose}>
            <h2>Your Shopping Cart</h2>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>${cartCtx.totalAmount.toFixed(2)}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    )
}