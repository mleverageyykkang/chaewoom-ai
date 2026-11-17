import ScrTop from '../components/scrTop';
import { Eyebrow } from '../components/sectionHead';

// 5. 서류 준비 (M6): 휴대폰 캐러셀 + 제목 단어가 굴러 바뀜
const DOC_PHONES = [
    { pos: '0', name: '신분 서류', done: 2, items: ['주민등록등본', '주민등록초본', '가족관계증명서', '신분증 사본'] },
    {
        pos: '1',
        name: '소득 서류',
        done: 3,
        items: ['급여명세서', '원천징수영수증', '소득금액증명원', '건강보험 납부확인서'],
    },
    { pos: '2', name: '부채 서류', done: 1, items: ['부채증명서', '대출 거래내역', '카드 사용내역', '보증 내역'] },
    { pos: '3', name: '재산 서류', done: 2, items: ['재산 목록', '통장 거래내역', '자동차 등록원부', '임대차 계약서'] },
];
const ROLL_WORDS = ['신분 서류', '소득 서류', '부채 서류', '재산 서류', '제출 확인', '신분 서류'];

const Section5 = () => {
    return (
        <section className="section docs" data-docs>
            <div className="container">
                <div className="s-head reveal">
                    <div>
                        <Eyebrow num="05" label="서류 준비" />
                        <h2 className="s-title">
                            필요한 서류만
                            <br />
                            쉽고 빠르게{' '}
                            <span className="roll-word blue" data-roll>
                                <span className="roll-track">
                                    {ROLL_WORDS.map((w, i) => (
                                        <span key={i}>{w}</span>
                                    ))}
                                </span>
                            </span>
                        </h2>
                    </div>
                    <p className="s-desc">
                        등본부터 소득·부채 서류까지
                        <br />
                        무엇이 필요한지 하나씩 알려드려요
                    </p>
                </div>
                <div className="deck st0" aria-hidden="true">
                    {DOC_PHONES.map((p) => (
                        <div className="phone dphone" data-pos={p.pos} key={p.pos}>
                            <div className="scr-wrap">
                                <div className="scr">
                                    <ScrTop />
                                    <p className="scr-h">
                                        준비 서류
                                        <br />
                                        <span className="blue">{p.name}</span> {p.done} / 4
                                    </p>
                                    <div className="scr-bar">
                                        <i style={{ width: `${p.done * 25}%` }}></i>
                                    </div>
                                    <ul className="scr-card scr-check">
                                        {p.items.map((it, i) => (
                                            <li key={it} className={i < p.done ? 'done' : undefined}>
                                                {it}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="scr-btn">남은 서류 안내 받기</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="phone dphone" data-pos="L">
                        <div className="scr-wrap">
                            <div className="scr">
                                <ScrTop />
                                <p className="scr-h">
                                    제출 확인
                                    <br />
                                    <span className="blue">16개 중 8개</span> 완료
                                </p>
                                <div className="scr-bar">
                                    <i style={{ width: '50%' }}></i>
                                </div>
                                <div className="scr-card">
                                    {DOC_PHONES.map((p) => (
                                        <div className="scr-row" key={p.pos}>
                                            {p.name}
                                            <b>{p.done} / 4</b>
                                        </div>
                                    ))}
                                </div>
                                <div className="scr-btn">서류 제출하기</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section5;
