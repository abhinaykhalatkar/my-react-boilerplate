import React from 'react';
import styles from './Modal.module.scss';
import { FaX } from "react-icons/fa6";
import { motion } from 'framer-motion';
import BackDrop from '../Backdrop/BackDrop';

export interface ModalProps {
    content?: JSX.Element;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    closeBtnText?:string;
}

const animationVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.5, 1.5, 0.3, 1.2],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
};

const Modal: React.FC<ModalProps> = ({ isModalOpen, setIsModalOpen, content=<h2>Vita Content Goes Here</h2> ,closeBtnText}) => {
    return (
        <>
            <BackDrop showBackdrop={isModalOpen} setShowBackdrop={setIsModalOpen}>
                <motion.div
                    className={styles.vitaModule}
                    variants={animationVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                       {closeBtnText && closeBtnText} <FaX />
                    </div>
                    {content}
                </motion.div>
            </BackDrop>
        </>
    );
};

export default Modal;