'use client';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './BasicModal.module.scss';
import { HiXMark } from 'react-icons/hi2';
import Text from '@/ui-kit/src/components/contents/Text/Text';

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
                    <p>{title}</p>
                    <Text size={20} color="#fff" style={{ cursor: 'pointer' }}>
                        <HiXMark onClick={onClose} />
                    </Text>
                </div>
                <div className={styles.ModalContent}>{children}</div>
            </div>
        </div>,
        typeof window !== 'undefined' ? document.body : document.createElement('div')
    );
};

export default BasicModal;
