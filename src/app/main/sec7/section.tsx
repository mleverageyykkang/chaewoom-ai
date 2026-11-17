import { Eyebrow } from '../components/sectionHead';

// 8. 자주 묻는 질문: 왼쪽 제목·안내·버튼 / 오른쪽 목록
const FAQ = [
    {
        q: '회사에 알려지나요?',
        a: '법원이 신청 사실을 회사에 따로 알리지는 않습니다. 다만 소득 확인 서류가 필요하고, 사건에 따라 예외가 있을 수 있어 상담에서 자세히 안내해 드립니다.',
    },
    { q: '얼마 동안 갚게 되나요?', a: '변제 기간은 원칙적으로 3년이며, 사정에 따라 최장 5년까지 정해질 수 있습니다.' },
    {
        q: '신용카드는 계속 쓸 수 있나요?',
        a: '신청하면 기존 신용카드는 대부분 사용이 정지됩니다. 체크카드 사용은 상담에서 안내해 드립니다.',
    },
    {
        q: '집이나 차가 있어도 신청할 수 있나요?',
        a: '재산이 있어도 신청할 수 있습니다. 다만 재산 가치가 변제 금액에 반영되므로 상담에서 함께 계산해 봅니다.',
    },
    { q: '상담 비용이 드나요?', a: '첫 상담은 무료입니다. 수임하게 되면 비용과 납부 방법을 먼저 안내해 드립니다.' },
];

const Section7 = () => {
    return (
        <section className="section faq" id="faq">
            <div className="container faq-grid">
                <div className="faq-head reveal">
                    <Eyebrow num="07" label="궁금한 점" />
                    <h2 className="s-title">자주 묻는 질문</h2>
                    <p className="s-desc">
                        더 궁금한 점은
                        <br />
                        무료 상담에서 물어보세요
                    </p>
                    <a className="pill pill-sm" href="#consult">
                        무료 진단 신청
                    </a>
                </div>
                <div className="faq-list reveal">
                    {FAQ.map((f, i) => (
                        // name: 같은 이름끼리 하나만 열리는 아코디언 (브라우저 기본 기능)
                        <details key={f.q} {...{ name: 'faq' }} open={i === 0}>
                            <summary>{f.q}</summary>
                            <p>{f.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Section7;
