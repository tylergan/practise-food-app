import { Fragment } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

function Backdrop(props) {
    return <div className={styles.backdrop} onClick={props.onClose} />
}

function ModalOverlay(props) {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
}

export default function Modal(props) {
    const portalElement = document.getElementById('overlays')

    return (
        <Fragment>
            {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}