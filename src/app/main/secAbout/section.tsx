import { cssVar } from '@/libs/utils/cssVar';
import SectionHead from '../components/sectionHead';

// 3. 개인회생이란 (메뉴 "개인회생이란" 도착 지점) → 바로 아래 3가지 해결 방법으로 이어짐
const FACTS = [
    { img: 'scale', title: '법원이 인가하는 절차', desc: '법원이 변제 계획을 확인하고 인가해요' },
    { img: 'calendar', title: '원칙 3년 나눠 갚기', desc: '소득에 맞춘 금액을 3년(최장 5년) 동안 갚아요' },
    { img: 'check', title: '다 갚으면 남은 빚 면책', desc: '계획대로 갚으면 남은 빚은 면책돼요' },
];

const SectionAbout = () => {
    return (
        <section className="section about" id="about">
            <div className="container">
                <SectionHead
                    num="02"
                    label="개인회생이란"
                    title={
                        <>
                            <span className="grad-text">합법적 채무탕감</span>
                            <br />
                            어떻게 가능할까요?
                        </>
                    }
                    desc={
                        <>
                            개인회생 제도를 이용해
                            <br />
                            채무 조정을 도와드려요
                        </>
                    }
                />
                <div className="about-card reveal">
                    <span className="about-label">개인회생이란?</span>
                    <p className="about-def">
                        재정적 어려움에 직면한 개인채무자가 <em>채무를 원활하게 조정받아 구제받을 수 있도록</em> 돕는
                        법정 채무조정 제도입니다.
                    </p>
                    <ul className="about-facts">
                        {FACTS.map((f, i) => (
                            <li className="about-fact reveal" style={cssVar({ '--i': i })} key={f.title}>
                                <img src={`/assets/icons/${f.img}.svg`} alt="" />
                                <b>{f.title}</b>
                                <small>{f.desc}</small>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default SectionAbout;
