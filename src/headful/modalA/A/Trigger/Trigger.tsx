import Modal from '@/headless/Modal/Modal';
import React, { HTMLAttributes } from 'react';

type TriggerProps = HTMLAttributes<HTMLSpanElement> & {
    children: React.ReactNode;
};

const Trigger = ({ children, ...props }: TriggerProps) => {
    return <Modal.Trigger {...props}>{children}</Modal.Trigger>;
};

export default Trigger;
