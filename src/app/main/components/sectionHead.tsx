import type { ReactNode } from 'react';

/** 섹션 머리: 번호 배지 + 작은 제목(eyebrow) → 큰 제목 → 설명 (시안 2 공통) */
type Props = {
    num: string;
    label: string;
    title: ReactNode;
    desc?: ReactNode;
    dark?: boolean;
};

export const Eyebrow = ({ num, label, dark }: { num: string; label: string; dark?: boolean }) => (
    <p className={`eyebrow${dark ? ' on-dark' : ''}`}>
        <b>{num}</b>
        {label}
    </p>
);

const SectionHead = ({ num, label, title, desc, dark }: Props) => (
    <div className="s-head reveal">
        <div>
            <Eyebrow num={num} label={label} dark={dark} />
            <h2 className="s-title">{title}</h2>
        </div>
        {desc && <p className="s-desc">{desc}</p>}
    </div>
);

export default SectionHead;
