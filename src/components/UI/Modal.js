import { Fragment } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'
import FocusTrap from 'focus-trap-react'

function ModalContent(props) {
    return (  // more on FocusTrap found here: https://github.com/focus-trap/focus-trap-react
        <FocusTrap>
            <div>
                <div className={styles.backdrop} onClick={props.onClose} />
                <div className={styles.modal}>
                    <div className={styles.content}>{props.children}</div>
                </div>
            </div>
        </FocusTrap>
    )
}

export default function Modal(props) {
    const portalElement = document.getElementById('overlays')

    return (
        <Fragment>
            {createPortal(<ModalContent onClose={props.onClose}>{props.children}</ModalContent>, portalElement)}
        </Fragment>
    )
}