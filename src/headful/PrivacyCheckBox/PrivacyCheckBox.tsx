'use client';
import styles from './PrivacyCheckBox.module.scss';
import { CSSPropertiesWithVars, FontSize, HexColor } from '@/ui-kit/src/types';
import Flex from '@/ui-kit/src/components/layouts/Flex/Flex';
import Text from '@/ui-kit/src/components/contents/Text/Text';
import Item from '@/ui-kit/src/components/layouts/Item/Item';

interface PrivacyCheckBoxProps {
    fixed?: boolean;
    color?: HexColor;
    size?: FontSize;
    checked: boolean;
    boxSize?: FontSize;
    onChange: (checked: boolean) => void;
    style?: React.CSSProperties; //
}

const PrivacyCheckBox = ({ checked, onChange, size, color, boxSize, style, fixed = false }: PrivacyCheckBoxProps) => {
    const cssVariables: CSSPropertiesWithVars = {
        '--box-size': typeof boxSize === 'number' ? `${boxSize}px` : boxSize,
    };
    return (
        <Flex align="center" style={{ ...style }}>
            <label className={`${styles.CheckboxWrapper} ${styles.Privacy} ${fixed ? styles.Fixed : ''}`}>
                <input type="checkbox" checked={checked} onChange={() => onChange(!checked)} />
                <span style={cssVariables} className={styles.CustomCheckbox}>
                    <i className="xi-check"></i>
                </span>
                {fixed ? (
                    <Text size={size} color="#fff" weight={400}>
                        개인정보 수집 및 이용 안내 동의(필수)
                    </Text>
                ) : (
                    <>
                        <Item desktop>
                            <Text size={size} color={color} weight={400}>
                                개인정보 수집 및 이용 안내 동의(필수)
                            </Text>
                        </Item>

                        <Item mobile>
                            <Text size={size} color={color} weight={400}>
                                개인정보 수집 / 이용 동의
                            </Text>
                        </Item>
                    </>
                )}
            </label>
        </Flex>
    );
};

export default PrivacyCheckBox;
