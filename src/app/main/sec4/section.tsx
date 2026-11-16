import { cssVar } from '@/libs/utils/cssVar';

// 4. 얼마나 달라지는지 (M5): 카드가 하나씩 튀어나오며 그래프가 차오름
// A씨는 가상 인물. 실제 의뢰인 사례로 바꾸려면 본인 동의와 광고 심의가 필요
const Section4 = () => {
    return (
        <section className="section analysis" id="analysis">
            <div className="container">
                <h2 className="s-title center reveal">
                    매달 갚는 돈이 얼마나 달라지는지
                    <br />
                    한눈에 볼 수 있어요
                </h2>
                <div className="case reveal">
                    <div className="case-chip">
                        <span className="case-avatar" aria-hidden="true">
                            A
                        </span>
                        <span>
                            <b>34세 직장인 A씨의 변제 현황</b>
                            <small>
                                채무 5,000만 원 · 변제 1년 차<span className="tbd">가상 예시</span>
                            </small>
                        </span>
                    </div>
                </div>
                <div className="fan reveal" data-fan>
                    <div className="acard" data-chart="bars" style={cssVar({ '--d': '0s' }, { left: '3%', top: 120 })}>
                        <small>월 상환액</small>
                        <b>
                            매달 80만 원
                            <br />
                            줄었어요
                        </b>
                        <div className="mini-bars">
                            <i data-h="100%" style={{ height: '100%', background: 'var(--gray-300)' }}></i>
                            <i data-h="42%" style={{ height: '42%', background: 'var(--primary)' }}></i>
                        </div>
                        <div className="mini-legend cols">
                            <span>
                                회생 전
                                <br />
                                138만
                            </span>
                            <span>
                                회생 후
                                <br />
                                58만
                            </span>
                        </div>
                    </div>
                    <div
                        className="acard"
                        data-chart="donut"
                        style={cssVar({ '--d': '-1.2s' }, { left: '21%', top: 40 })}
                    >
                        <small>원금</small>
                        <b>약 58% 감면</b>
                        <div className="donut" data-p="58" style={cssVar({ '--p': 58 })} aria-hidden="true"></div>
                        <div className="mini-legend" style={{ justifyContent: 'center' }}>
                            5,000만 → 2,088만 원
                        </div>
                    </div>
                    <div className="acard" style={cssVar({ '--d': '-2.5s' }, { left: '21%', top: 290 })}>
                        <small>신청 자격</small>
                        <b>
                            꾸준한 월급이
                            <br />
                            있어요
                        </b>
                        <span className="a-chip">✓ 급여소득자</span>
                    </div>
                    <div
                        className="acard"
                        data-chart="ring"
                        style={cssVar({ '--d': '-0.6s' }, { left: '40%', top: 0 })}
                    >
                        <small>변제 기간</small>
                        <b>36회 중 12회 납부</b>
                        <div className="ring" data-p="33" aria-hidden="true">
                            <span data-count="12" data-suffix="/36">
                                12/36
                            </span>
                        </div>
                    </div>
                    <div className="acard" style={cssVar({ '--d': '-3.1s' }, { left: '40%', top: 250 })}>
                        <small>독촉 전화</small>
                        <b>
                            개시 결정 후<br />
                            추심이 멈췄어요
                        </b>
                        <span className="a-chip">중지됨</span>
                    </div>
                    <div
                        className="acard"
                        data-chart="steps"
                        style={cssVar({ '--d': '-1.8s' }, { left: '59%', top: 50 })}
                    >
                        <small>진행 단계</small>
                        <b>인가 받고 변제 중</b>
                        <div className="a-steps">
                            <span className="on">신청</span>
                            <span className="on">개시</span>
                            <span className="on">인가</span>
                            <span className="on">변제</span>
                        </div>
                    </div>
                    <div
                        className="acard"
                        data-chart="progress"
                        style={cssVar({ '--d': '-4s' }, { left: '59%', top: 260 })}
                    >
                        <small>제출 서류</small>
                        <b>5개 모두 제출 완료</b>
                        <div className="a-progress">
                            <i data-w="100%" style={{ width: '100%' }}></i>
                        </div>
                    </div>
                    <div className="acard" style={cssVar({ '--d': '-2.2s' }, { left: '78%', top: 140 })}>
                        <small>진단·상담 비용</small>
                        <b>
                            첫 진단과 상담은
                            <br />
                            무료였어요
                        </b>
                        <span
                            className="a-chip"
                            style={{ background: 'var(--card-sky)', color: 'var(--primary-press)' }}
                        >
                            0원
                        </span>
                    </div>
                </div>
                <p className="note-small">
                    A씨는 이해를 돕기 위한 가상 인물이며, 숫자는 예시입니다. 감면율·금액·기간은 소득과 채무에 따라
                    사건마다 다릅니다.
                </p>
            </div>
        </section>
    );
};

export default Section4;
