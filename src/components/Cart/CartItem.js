import styles from './CartItem.module.css'

export default function CartItem(props) {
    const price = `$${props.price.toFixed(2)}`

    return (
        <li id={props.id} className={styles['cart-item']}>
            <div>
                <h2>{props.name}</h2>
                <div className={styles.summary}>
                    <span className={styles.price}>{price}</span>
                    <span className={styles.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={props.onRemove}>−</button>
                <button onClick={props.onAdd}>+</button>
            </div>
        </li>
    )
}