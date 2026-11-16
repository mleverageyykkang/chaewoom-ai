import ScrTop from '../components/scrTop';

// 3. 3가지 해결 방법 (M4): 지그재그 + 휴대폰 안이 앱처럼 동작
const SALARY_LIST = Array.from({ length: 12 }, (_, i) => 12 - i);
const BUSINESS_DOCS = [
    '부가세 신고서',
    '카드 매출 내역',
    '현금 매출 내역',
    '임대료 영수증',
    '재료비 영수증',
    '인건비 내역',
    '사업자등록증',
    '종합소득세 신고서',
    '통장 거래내역',
    '공과금 영수증',
    '거래처 세금계산서',
    '배달앱 정산 내역',
    '차량 유지비',
    '통신비 내역',
    '보험료 내역',
];

const Section3 = () => {
    return (
        <section className="section ways" id="ways">
            <div className="container">
                <h2 className="s-title ways-intro reveal">
                    내 상황에 맞는
                    <br />
                    <span className="grad-text">3가지 해결 방법</span> 중<br />
                    알맞은 길을 찾아드려요
                </h2>

                {/* ① 급여소득자: 계산 화면(숫자 올라감·문구 바뀜·칩 넘어감) ↔ 변제 달력(36칸 채워짐·목록 스크롤) */}
                <div className="zz">
                    <div className="zz-text reveal">
                        <h3 className="item-title">
                            월급을 받고 있다면
                            <br />
                            <span className="blue">급여소득자 개인회생</span>
                        </h3>
                        <p className="s-desc">
                            매달 받는 월급에서 생계비를 빼고
                            <br />
                            남는 만큼만 3년 동안 갚는 방법이에요
                        </p>
                    </div>
                    <div className="zz-phone reveal">
                        <div className="phone" data-demo="salary" aria-hidden="true">
                            <div className="scr-wrap">
                                <div className="scr a">
                                    <ScrTop />
                                    <p className="scr-h roll2">
                                        <span className="roll2-track">
                                            <span>
                                                홍길동님의
                                                <br />
                                                변제금 계산 결과예요
                                            </span>
                                            <span>
                                                3년만 갚으면
                                                <br />
                                                남은 빚은 면책돼요
                                            </span>
                                        </span>
                                    </p>
                                    <div className="scr-card">
                                        <div className="scr-row">
                                            월 소득
                                            <b data-count="250" data-suffix="만 원">
                                                250만 원
                                            </b>
                                        </div>
                                        <div className="scr-row">
                                            생계비
                                            <b data-count="150" data-prefix="− " data-suffix="만 원">
                                                − 150만 원
                                            </b>
                                        </div>
                                        <div className="scr-line"></div>
                                        <div className="scr-row">
                                            매달 갚을 돈
                                            <span
                                                className="scr-big"
                                                data-count="100"
                                                data-prefix="약 "
                                                data-suffix="만 원"
                                            >
                                                약 100만 원
                                            </span>
                                        </div>
                                    </div>
                                    <div className="scr-card">
                                        <div className="scr-row">
                                            변제 기간<b>36개월</b>
                                        </div>
                                        <div className="scr-bar">
                                            <i data-w="33%" style={{ width: '33%' }}></i>
                                        </div>
                                    </div>
                                    <div className="scr-chips">
                                        <div className="scr-chips-track">
                                            <span className="scr-chip on">예시 계산</span>
                                            <span className="scr-chip">사건마다 다름</span>
                                            <span className="scr-chip">원칙 3년</span>
                                            <span className="scr-chip">최장 5년</span>
                                            <span className="scr-chip">남은 빚 면책</span>
                                        </div>
                                    </div>
                                    <div className="scr-menu">
                                        <span data-g="₩">변제금</span>
                                        <span data-g="✓">자격</span>
                                        <span data-g="≡">서류</span>
                                        <span data-g="?">상담</span>
                                    </div>
                                    <div className="scr-btn">상담으로 확인받기</div>
                                </div>
                                <div className="scr b">
                                    <ScrTop />
                                    <p className="scr-h">
                                        변제 일정
                                        <br />
                                        <span className="blue">
                                            36회 중 <span data-paid-count>12</span>회
                                        </span>{' '}
                                        완료
                                    </p>
                                    <div className="scr-card">
                                        <div className="scr-row">
                                            매달 25일<b>약 100만 원</b>
                                        </div>
                                        <div className="months">
                                            {Array.from({ length: 36 }, (_, k) => (
                                                <i key={k} className={k < 12 ? 'on' : k === 12 ? 'now' : undefined}></i>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="scr-list">
                                        <ul>
                                            {SALARY_LIST.map((m) => (
                                                <li key={m}>
                                                    {m}회 · {m}월<span className="ok">납부 완료</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ② 영업소득자: 막대가 차례로 자람 → 기준 카드 강조 ↔ 매출 자료 목록 스크롤 */}
                <div className="zz">
                    <div className="zz-text reveal">
                        <h3 className="item-title">
                            가게를 운영하고 있다면
                            <br />
                            <span className="blue">영업소득자 개인회생</span>
                        </h3>
                        <p className="s-desc">
                            매출에서 경비를 빼고 남는 소득을
                            <br />
                            기준으로 갚을 금액을 정해요
                        </p>
                    </div>
                    <div className="zz-phone reveal">
                        <div className="phone" data-demo="business" aria-hidden="true">
                            <div className="scr-wrap">
                                <div className="scr a">
                                    <ScrTop />
                                    <p className="scr-h">
                                        월 평균으로 보면
                                        <br />
                                        이렇게 남아요
                                    </p>
                                    <div className="scr-card scr-bars">
                                        <div>
                                            매출
                                            <i
                                                data-w="100%"
                                                style={{ width: '100%', background: 'var(--pastel-blue)' }}
                                            ></i>
                                            <b data-count="1200" data-suffix="만">
                                                1,200만
                                            </b>
                                        </div>
                                        <div>
                                            경비
                                            <i data-w="68%" style={{ width: '68%', background: 'var(--gray-300)' }}></i>
                                            <b data-count="820" data-suffix="만">
                                                820만
                                            </b>
                                        </div>
                                        <div>
                                            남는 소득
                                            <i data-w="32%" style={{ width: '32%', background: 'var(--primary)' }}></i>
                                            <b data-count="380" data-suffix="만">
                                                380만
                                            </b>
                                        </div>
                                    </div>
                                    <div className="scr-card" data-hl>
                                        <div className="scr-row">
                                            남는 소득 기준<b>변제금 산정</b>
                                        </div>
                                        <div className="scr-row">
                                            매출 자료<b>부가세 신고서 등</b>
                                        </div>
                                    </div>
                                    <div className="scr-chips">
                                        <div className="scr-chips-track">
                                            <span className="scr-chip on">예시</span>
                                            <span className="scr-chip">자영업</span>
                                            <span className="scr-chip">프리랜서</span>
                                            <span className="scr-chip">법인 대표</span>
                                        </div>
                                    </div>
                                    <div className="scr-menu">
                                        <span data-g="₩">매출</span>
                                        <span data-g="−">경비</span>
                                        <span data-g="≡">서류</span>
                                        <span data-g="?">상담</span>
                                    </div>
                                    <div className="scr-btn">내 사업에 맞는지 확인</div>
                                </div>
                                <div className="scr b">
                                    <ScrTop />
                                    <p className="scr-h">
                                        매출 자료
                                        <br />
                                        <span className="blue">함께 정리해요</span>
                                    </p>
                                    <div className="scr-list">
                                        <ul>
                                            {BUSINESS_DOCS.map((d) => (
                                                <li key={d}>
                                                    {d}
                                                    <span className="ok">확인</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="scr-btn">남은 자료 안내 받기</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ③ 파산·면책: 체크가 하나씩 켜짐 → 결과 카드 ↔ 상담 대화가 이어짐 */}
                <div className="zz">
                    <div className="zz-text reveal">
                        <h3 className="item-title">
                            갚을 여력이 거의 없다면
                            <br />
                            <span className="blue">파산·면책 상담</span>
                        </h3>
                        <p className="s-desc">
                            소득으로 갚기 어려운 경우에는
                            <br />
                            다른 절차가 맞는지 함께 살펴봐요
                        </p>
                    </div>
                    <div className="zz-phone reveal">
                        <div className="phone" data-demo="check" aria-hidden="true">
                            <div className="scr-wrap">
                                <div className="scr a">
                                    <ScrTop />
                                    <p className="scr-h">
                                        내 상황을
                                        <br />
                                        먼저 체크해 보세요
                                    </p>
                                    <ul className="scr-card scr-check">
                                        <li className="done">소득이 거의 없어요</li>
                                        <li className="done">빚이 재산보다 많아요</li>
                                        <li className="done">갚을 방법이 보이지 않아요</li>
                                        <li>최근 큰 재산 처분이 있어요</li>
                                    </ul>
                                    <div className="scr-card scr-result">
                                        <img src="/assets/icons3d/scale.png" alt="" />
                                        <div>
                                            <small>알맞은 절차</small>
                                            <br />
                                            <b>상담에서 함께 확인해요</b>
                                        </div>
                                    </div>
                                    <div className="scr-btn">무료 상담 신청</div>
                                </div>
                                <div className="scr b">
                                    <ScrTop />
                                    <p className="scr-h">상담 채팅</p>
                                    <div className="scr-bubble">소득이 거의 없는데 어떻게 하죠?</div>
                                    <div className="scr-bubble me">파산·면책이 맞는지 같이 볼게요.</div>
                                    <div className="scr-bubble">재산이 조금 있어도 되나요?</div>
                                    <div className="scr-bubble me">재산 목록부터 함께 정리해요.</div>
                                    <div className="scr-btn">전화로 이어서 상담</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section3;
