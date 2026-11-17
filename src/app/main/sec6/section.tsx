import { cssVar } from '@/libs/utils/cssVar';
import SectionHead from '../components/sectionHead';

// 7. 채움과 함께하면 (M7): 진한 남색 둥근 띠 안에서 카드가 왼쪽으로 계속 흐름
const BENEFITS = [
    {
        bg: 'var(--card-coral)',
        label: '무료 진단',
        title: ['첫 진단과 상담은', '비용 없이 받아요'],
        img: 'diagnosis',
        d: '0s',
    },
    {
        bg: 'var(--card-green)',
        label: '비밀 보장',
        title: ['상담 내용은 사건 외에', '쓰지 않아요'],
        img: 'shield',
        d: '-1s',
    },
    {
        bg: 'var(--card-blue)',
        label: '비용 미리 안내',
        title: ['수임 전에 비용과', '납부 방법을 알려드려요'],
        img: 'wallet',
        d: '-2s',
    },
    {
        bg: 'var(--card-cream)',
        label: '변제 일정',
        title: ['매달 갚는 날을', '미리 알려드려요'],
        img: 'calendar',
        d: '-0.5s',
    },
    {
        bg: 'var(--card-sand)',
        label: '빠른 판단',
        title: ['개인회생이 맞는지', '먼저 알려드려요'],
        img: 'check',
        d: '-1.5s',
    },
];

const Section6 = () => {
    return (
        <section className="section benefits">
            <div className="band">
                <div className="container">
                    <SectionHead
                        num="06"
                        label="함께하면"
                        dark
                        title={
                            <>
                                채움과 함께하면
                                <br />
                                이런 점이 달라요
                            </>
                        }
                    />
                    <div className="flow st00 st0" data-flow aria-label="채움과 함께하면 달라지는 점">
                        <div className="flow-track">
                            {BENEFITS.map((b, i) => (
                                <article
                                    className="bcard"
                                    style={cssVar({ '--i': i }, { background: b.bg })}
                                    key={b.label}
                                >
                                    <small>{b.label}</small>
                                    <b>
                                        {b.title[0]}
                                        <br />
                                        {b.title[1]}
                                    </b>
                                    <img src={`/assets/icons/${b.img}.svg`} alt="" style={cssVar({ '--d': b.d })} />
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section6;
