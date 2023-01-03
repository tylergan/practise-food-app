import { Fragment } from 'react'
import HeaderCartButton from './HeaderCartButton'
import mealsImage from '../../assets/meals.jpg'
import styles from './Header.module.css'

export default function Header(props) {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>{props.title}</h1>
                <HeaderCartButton onShowCart={props.onShowCart}/>
            </header>
            
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food" />
            </div>
        </Fragment>
    );
}