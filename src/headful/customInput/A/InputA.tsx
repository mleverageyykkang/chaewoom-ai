'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './InputA.module.scss';
import classNames from 'classnames';
import { dimensionToString, dimensionToVariable, spacingToSpace, spacingToString, toFont } from '@/ui-kit/src/utils';
import { BoxSize, ContentSize, CSSPropertiesWithVars, FontSize, PaddingSize } from '@/ui-kit/src/types';

type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
type InputAProps = BaseInputProps & {
    size?: ContentSize;
    full?: boolean;
    width?: BoxSize | number | string;
    height?: BoxSize | number | string;
    padding?: PaddingSize | number;
    fontSize?: FontSize | number;
    s?: boolean;
    unit?: string;
};

const CustomInputA = forwardRef<HTMLInputElement, InputAProps>(
    ({ size, full, className, style, s, fontSize, padding, width, height, unit, ...props }, ref) => {
        const cssVariables: CSSPropertiesWithVars = {
            '--font-size': s ? dimensionToString(fontSize) : toFont(fontSize),
            '--padding': s ? spacingToString(padding) : spacingToSpace(padding),
            '--width': s ? dimensionToString(width) : dimensionToVariable(width),
            '--height': s ? dimensionToString(height) : dimensionToVariable(height),
        };

        const containerClasses = classNames(styles.InputWrapper, className, {
            [styles.Full]: full,
            [styles.Disabled]: props.disabled,
            [styles.Filled]: props.value && props.value !== '',
        });

        const inputClasses = classNames(styles.InputA, {
            [styles.Xxs]: size === '2xs',
            [styles.Xs]: size === 'xs',
            [styles.Sm]: size === 'sm',
            [styles.Md]: size === 'md',
            [styles.Lg]: size === 'lg',
        });

        return (
            <div className={containerClasses} style={{ ...style, ...cssVariables }}>
                <input ref={ref} {...props} className={inputClasses} />
                {unit && <span className={styles.Unit}>{unit}</span>}
            </div>
        );
    }
);

export default CustomInputA;
