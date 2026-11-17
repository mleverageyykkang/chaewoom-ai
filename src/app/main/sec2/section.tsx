import SectionHead from '../components/sectionHead';

// 2. 맞춤형 해결 방법 (M3): 왼쪽 제목 · 오른쪽 알림 카드. 3초마다 새 카드가 위에 생기고 이전 카드는 아래로 쌓임
const NOTICES = [
    {
        img: 'wallet',
        msg: (
            <>
                소득에 맞춰
                <br />
                <span className="blue">갚을 금액</span>을 다시 정해요
            </>
        ),
    },
    {
        img: 'bell-off',
        msg: (
            <>
                개시 결정 후에는
                <br />
                <span className="blue">개별 추심</span>이 멈춰요
            </>
        ),
    },
    {
        img: 'diagnosis',
        msg: (
            <>
                첫 진단과 상담은 <span className="blue">무료</span>
                <br />내 상태를 직접 점검해요
            </>
        ),
    },
    {
        img: 'calendar',
        msg: (
            <>
                원칙 <span className="blue">3년</span> 동안
                <br />
                나눠서 갚아요
            </>
        ),
    },
];

const Section2 = () => {
    return (
        <section className="section picks">
            <div className="container picks-grid">
                <SectionHead
                    num="01"
                    label="맞춤 안내"
                    title={
                        <>
                            채움이 알려드리는
                            <br />
                            <span className="grad-text">맞춤형 해결 방법</span>
                        </>
                    }
                    desc={
                        <>
                            처음 알아볼 때 가장 많이 묻는 것부터
                            <br />
                            차례로 알려드려요
                        </>
                    }
                />
                <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
                    <defs>
                        <linearGradient id="spk" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#45b3f2" />
                            <stop offset=".5" stopColor="#2f6be6" />
                            <stop offset="1" stopColor="#1a3d8f" />
                        </linearGradient>
                        <symbol id="spark" viewBox="0 0 34 34">
                            <path
                                d="M17 1c1.6 8.4 7.6 14.4 16 16-8.4 1.6-14.4 7.6-16 16-1.6-8.4-7.6-14.4-16-16C9.4 15.4 15.4 9.4 17 1z"
                                fill="url(#spk)"
                            />
                        </symbol>
                        {/* 서류 아이콘: 변제 현황 "제출 서류" 카드에서 씀 */}
                        <symbol id="doc" viewBox="0 0 30 38">
                            <path
                                d="M5 1h14l10 10v22a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4z"
                                fill="#fff"
                                stroke="#b9cdf5"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M19 1v6a4 4 0 0 0 4 4h6"
                                fill="#eaf0fc"
                                stroke="#b9cdf5"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <rect x="7" y="17" width="16" height="2.4" rx="1.2" fill="#b9cdf5" />
                            <rect x="7" y="22.5" width="13" height="2.4" rx="1.2" fill="#b9cdf5" />
                            <rect x="7" y="28" width="9" height="2.4" rx="1.2" fill="#b9cdf5" />
                        </symbol>
                    </defs>
                </svg>
                {/* 카드 순서 = 나오는 순서. 움직임이 꺼져 있으면 이대로 4장이 쌓인 모습 */}
                <div className="notice st0" data-notice aria-live="off">
                    {NOTICES.map((n, i) => (
                        <div className="notice-card" data-slot={i} key={n.img}>
                            <span className="notice-spark" aria-hidden="true">
                                <svg>
                                    <use href="#spark" />
                                </svg>
                            </span>
                            <p className="notice-msg">{n.msg}</p>
                            <img className="notice-obj" src={`/assets/icons/${n.img}.svg`} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Section2;
