import Text from '@/ui-kit/src/components/contents/Text/Text';
import styles from './barC.module.scss';
import { ReactNode } from 'react';
import { getToday } from '@/libs/utils/getToday';

export type DataItem = {
    content1?: ReactNode;
    content2?: ReactNode;
    content3?: ReactNode;
};

type BarCProps = {
    data: DataItem[];
    style?: React.CSSProperties;
};

const BarC = ({ data, style }: BarCProps) => {
    return data.map((el, idx) => (
        <div key={idx} className={styles.contentWrap} style={{ ...style }}>
            <div>{el.content1}</div>
            <div>{el.content2}</div>
            <div>
                <Text size={18} weight={500} color="#B5B5B5">
                    {getToday()}
                </Text>
            </div>
        </div>
    ));
};
export default BarC;
