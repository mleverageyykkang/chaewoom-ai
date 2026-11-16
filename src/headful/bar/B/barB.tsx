import React from 'react';
import styles from './barB.module.scss';

type barBProps = {
    title?: React.ReactNode;
    content?: React.ReactNode;
    amount?: React.ReactNode;
    current?: React.ReactNode;
    bgColor?: string;
};

const BarB = ({ title, content, amount, current, bgColor = '#fff' }: barBProps) => {
    return (
        <div className={styles.container} style={{ '--bgColor': bgColor } as React.CSSProperties}>
            <div className={styles.contentWrap}>
                <div className={styles.titleWrap}>{title}</div>
                <div className={styles.line} />
                {content}
            </div>
            <div className={styles.currentWrap}>
                {amount}
                {current}
            </div>
        </div>
    );
};
export default BarB;
