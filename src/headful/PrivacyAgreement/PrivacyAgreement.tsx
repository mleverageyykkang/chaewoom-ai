'use client';
import { useState } from 'react';
import Text from '@/ui-kit/src/components/contents/Text/Text';
import { BoxSize, CSSPropertiesWithVars, FontSize, HexColor } from '@/ui-kit/src/types';
import Flex from '@/ui-kit/src/components/layouts/Flex/Flex';
import { dimensionToVariable } from '@/ui-kit/src/utils';
import BasicModal from './BasicModal/BasicModal';
import PrivacyPolicyText from './ModalContent/PrivacyContent';

interface PrivacyAgreementProps {
    color?: HexColor;
    trigger?: FontSize;
    boxSize?: BoxSize | string;
    title?: string;
    decoration?: 'none' | 'underline' | 'overline' | 'line-through';
}

const PrivacyAgreement = ({ trigger, boxSize, title, decoration, color }: PrivacyAgreementProps) => {
    const [open, setOpen] = useState(false);

    const cssVariables: CSSPropertiesWithVars = {
        '--box-size': dimensionToVariable(boxSize),
    };
    return (
        <Flex align="center" justify="space-between">
            <Text
                color={color}
                size={trigger}
                weight={400}
                decoration={decoration}
                onClick={() => setOpen(true)}
                style={{ cursor: 'pointer' }}
            >
                {title}
            </Text>
            <BasicModal isOpen={open} onClose={() => setOpen(false)} title="개인정보처리방침">
                <PrivacyPolicyText />
            </BasicModal>
        </Flex>
    );
};

export default PrivacyAgreement;
