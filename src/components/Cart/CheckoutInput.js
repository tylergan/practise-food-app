import styles from "./Checkout.module.css"

const CheckoutInput = (props) => {
    const controlStyle = `${styles.control} ${!props.isValid ? styles.invalid : ""}`

    return (
        <div className={controlStyle}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input}/>
            {!props.isValid && <p>Please enter a valid {props.label.toLowerCase()}.</p>}
        </div>
    )
}

export default CheckoutInput