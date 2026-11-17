import SectionHead from '../components/sectionHead';

// 4. 변제 현황 (M5): 대시보드 카드 8장, 하나씩 강조되며 그래프가 차오름
// A씨는 가상 인물. 실제 의뢰인 사례로 바꾸려면 본인 동의와 광고 심의가 필요
const Section4 = () => {
    return (
        <section className="section analysis" id="analysis">
            <div className="container">
                <SectionHead
                    num="04"
                    label="변제 현황"
                    title={
                        <>
                            매달 갚는 돈이 얼마나 달라지는지
                            <br />
                            한눈에 볼 수 있어요
                        </>
                    }
                    desc={
                        <>
                            가상 인물 A씨의 변제 1년 차 모습으로
                            <br />
                            미리 살펴보세요
                        </>
                    }
                />
                <div className="dash reveal">
                    <div className="dash-head">
                        <span className="case-avatar" aria-hidden="true">
                            A
                        </span>
                        <span className="dash-who">
                            <b>34세 직장인 A씨의 변제 현황</b>
                            <small>
                                채무 5,000만 원 · 변제 1년 차<span className="tbd">가상 예시</span>
                            </small>
                        </span>
                        <span className="dash-status">변제 진행 중</span>
                    </div>
                    <div className="fan" data-fan>
                        <div className="acard" data-chart="bars">
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
                        <div className="acard" data-chart="donut">
                            <small>원금</small>
                            <b>약 58% 감면</b>
                            <div
                                className="donut"
                                data-p="58"
                                style={{ '--p': 58 } as React.CSSProperties}
                                aria-hidden="true"
                            ></div>
                            <div className="mini-legend" style={{ justifyContent: 'center' }}>
                                5,000만 → 2,088만 원
                            </div>
                        </div>
                        <div className="acard" data-chart="ring">
                            <small>변제 기간</small>
                            <b>36회 중 12회 납부</b>
                            <div className="ring" data-p="33" aria-hidden="true">
                                <span data-count="12" data-suffix="/36">
                                    12/36
                                </span>
                            </div>
                        </div>
                        <div className="acard" data-chart="steps">
                            <small>진행 단계</small>
                            <b>인가 받고 변제 중</b>
                            {/* 지난 단계(.on)는 체크, 지금 단계(.now)는 강조 */}
                            <ol className="a-steps">
                                <li className="on">신청</li>
                                <li className="on">개시</li>
                                <li className="on">인가</li>
                                <li className="now">변제</li>
                            </ol>
                        </div>
                        <div className="acard">
                            <small>신청 자격</small>
                            <b>
                                꾸준한 월급이
                                <br />
                                있어요
                            </b>
                            <span className="a-chip">✓ 급여소득자</span>
                        </div>
                        <div className="acard">
                            <small>독촉 전화</small>
                            <b>
                                개시 결정 후<br />
                                추심이 멈췄어요
                            </b>
                            <span className="a-chip">중지됨</span>
                        </div>
                        <div className="acard" data-chart="docs">
                            <small>제출 서류</small>
                            <b>5개 모두 제출 완료</b>
                            {/* 서류 5장이 하나씩 체크되며 모두 끝남 (#doc 아이콘은 sec2의 SVG 정의에 있음) */}
                            <ul className="a-docs">
                                {['등본', '초본', '소득', '부채', '재산'].map((d) => (
                                    <li className="on" key={d}>
                                        <span className="a-doc">
                                            <svg viewBox="0 0 30 38" aria-hidden="true">
                                                <use href="#doc" />
                                            </svg>
                                        </span>
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="acard">
                            <small>진단·상담 비용</small>
                            <b>
                                첫 진단과 상담은
                                <br />
                                무료였어요
                            </b>
                            <span
                                className="a-chip"
                                style={{ background: 'var(--card-blue)', color: 'var(--primary-press)' }}
                            >
                                0원
                            </span>
                        </div>
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
