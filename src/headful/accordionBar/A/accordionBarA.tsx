'use client';
import styles from './accordionBarA.module.scss';
import React from 'react';
import classNames from 'classnames';
import accordion from '@/assets/images/accordion.png';

type Props = {
    title?: string;
    content?: React.ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
};

const AccordionBarA = ({ title, content, onToggle, isOpen }: Props) => {
    return (
        <div
            className={classNames(styles.container, {
                [styles.open]: isOpen,
            })}
            onClick={onToggle}
        >
            <div className={styles.TitleLine}>
                <div className={styles.TitleWrapper}>
                    <div className={styles.question}>Q</div>
                    <div className={styles.title}>{title}</div>
                </div>

                <div className={styles.toggleBox}>
                    <img src={accordion.src} alt="" className={styles.toggleImg} />
                </div>
            </div>

            {/* 💡 조건부 렌더링(isOpen && ...)을 제거하고 항상 렌더링, 클래스만 토글 */}
            <div className={classNames(styles.AnswerWrapper, { [styles.open]: isOpen })}>{content}</div>
        </div>
    );
};
export default AccordionBarA;
