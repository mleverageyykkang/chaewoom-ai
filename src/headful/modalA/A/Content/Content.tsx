import styles from './Content.module.scss';
import { HTMLAttributes } from 'react';
import classNames from 'classnames';
// import X from '../../../../../assets/images/x.svg';
import Modal from '@/headless/Modal/Modal';
import { HiXMark } from 'react-icons/hi2';
import { CSSPropertiesWithVars, HexColor } from '@/ui-kit/src/types';
import { dimensionToVariable } from '@/ui-kit/src/utils';
import Box from '@/ui-kit/src/components/layouts/Box/Box';
import Flex from '@/ui-kit/src/components/layouts/Flex/Flex';

type ContentProps = HTMLAttributes<HTMLDivElement> & {
    title: string;
    width?: string;
    height?: string;
    backgroundColor?: HexColor;
    children: React.ReactNode;
};

const Content = ({ width = '40%', height = 'auto', backgroundColor, title, children, ...props }: ContentProps) => {
    const combinedStyle = classNames(styles.Content, props.className);

    const contentVariables: CSSPropertiesWithVars = {
        '--width': dimensionToVariable(width),
        '--height': dimensionToVariable(height),
    };

    const headerVariables: CSSPropertiesWithVars = {
        '--header-color': backgroundColor,
    };

    return (
        <Modal.Content {...props} className={combinedStyle} style={{ ...contentVariables }}>
            <div className={styles.Body}>{children}</div>
        </Modal.Content>
    );
};

export default Content;
