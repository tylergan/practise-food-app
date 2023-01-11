import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import styles from './HeaderCartButton.module.css'

export default function HeaderCartButton(props) {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const cartCtx = useContext(CartContext)
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return
        }
        setBtnIsHighlighted(true)

        const timer = setTimeout(() => { // reset the button animation after 300ms
            setBtnIsHighlighted(false)
        }, 200)

        return () => { // clean up function
            clearTimeout(timer) // reset the timer if the component is re-rendered
            // if we spam the add to cart button, the order of the state update is not guaranteed to be in order (since we are using a timing function)
            // so, sometimes, the button will not be highlighted since the setBtnIsHighlighted(false) is never called and will remain true.
        }
    }, [cartCtx.items])

    useEffect(() => { // thus, we need to use a second useEffect to reset the button animation; so, if the state remains true, we will reset the animation back to false
        if (btnIsHighlighted) {
            const timer = setTimeout(() => {
                setBtnIsHighlighted(false)
            }, 200)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [btnIsHighlighted])  // thus, spamming the add to cart button will not have any animation issues since we ensure that the state will always be reset to false

    return (
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    );
}