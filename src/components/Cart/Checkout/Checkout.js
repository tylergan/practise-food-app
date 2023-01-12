import CheckoutInput from './CheckoutInput'
import useFormInput from '../../../hooks/use-form-input'
import styles from './Checkout.module.css'

const isEmpty = (value) => value.trim() !== ''
const isFourChars = (value) => value.trim().length === 4

const Checkout = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useFormInput(isEmpty)

    const {
        value: enteredStreet,
        isValid: enteredStreetIsValid,
        hasError: streetInputHasError,
        valueChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurHandler,
        reset: resetStreetInput
    } = useFormInput(isEmpty)

    const {
        value: enteredPostal,
        isValid: enteredPostalIsValid,
        hasError: postalInputHasError,
        valueChangeHandler: postalChangeHandler,
        inputBlurHandler: postalBlurHandler,
        reset: resetPostalInput
    } = useFormInput(isFourChars)

    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        hasError: cityInputHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        reset: resetCityInput
    } = useFormInput(isEmpty)

    const confirmHandler = (event) => {
        event.preventDefault()

        // if we confirm the form, it is automatically considered as "touched"; the blur handlers only set fields to "touched"
        nameBlurHandler()
        streetBlurHandler()
        postalBlurHandler()
        cityBlurHandler()

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid

        if (!formIsValid) {
            return
        }

        const userData = {
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        }

        // send the data to database
        props.onConfirm(userData)

        resetNameInput()
        resetStreetInput()
        resetPostalInput()
        resetCityInput()
    };

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <CheckoutInput label="Your Name" isValid={!nameInputHasError} input={{
                id: 'name',
                type: 'text',
                onChange: nameChangeHandler,
                onBlur: nameBlurHandler,
            }}/>

            <CheckoutInput label="Street" isValid={!streetInputHasError} input={{
                id: 'street',
                type: 'text',
                onChange: streetChangeHandler,
                onBlur: streetBlurHandler,
            }}/>

            <CheckoutInput label="Postal Code" isValid={!postalInputHasError}  input={{
                id: 'postal',
                type: 'text',
                onChange: postalChangeHandler,
                onBlur: postalBlurHandler,
            }}/>

            <CheckoutInput label="City" isValid={!cityInputHasError}  input={{
                id: 'city',
                type: 'text',
                onChange: cityChangeHandler,
                onBlur: cityBlurHandler,
            }}/>

            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>
                Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout