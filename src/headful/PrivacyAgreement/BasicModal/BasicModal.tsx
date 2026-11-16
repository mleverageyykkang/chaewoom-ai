'use client';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './BasicModal.module.scss';
import { IoClose } from 'react-icons/io5';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

const BasicModal = ({ isOpen, onClose, title, children }: Props) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={styles.ModalOverlay} onClick={handleBackdropClick}>
            <div className={styles.ModalContainer}>
                <div className={styles.ModalHeaderContent}>
                    <IoClose className={styles.close} onClick={onClose} />
                </div>
                <div className={styles.ModalContent}>
                    <div className={styles.title}>개인정보처리방침</div>
                    {children}
                </div>
            </div>
        </div>,
        typeof window !== 'undefined' ? document.body : document.createElement('div')
    );
};

export default BasicModal;
