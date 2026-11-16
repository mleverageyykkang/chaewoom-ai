// 2. 맞춤형 해결 방법 (M3): 구슬 → 알림 카드, 3초마다 새 카드가 위에 생기고 이전 카드는 아래로 쌓임
const NOTICES = [
    {
        img: 'purse',
        msg: (
            <>
                소득에 맞춰
                <br />
                <span className="blue">갚을 금액</span>을 다시 정해요
            </>
        ),
    },
    {
        img: 'chat',
        msg: (
            <>
                개시 결정 후에는
                <br />
                <span className="blue">개별 추심</span>이 멈춰요
            </>
        ),
    },
    {
        img: 'handshake',
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
            <div className="container">
                <h2 className="s-title center reveal">
                    채움이 알려드리는
                    <br />
                    <span className="grad-text">맞춤형 해결 방법</span>
                </h2>
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
                            <img className="notice-obj" src={`/assets/icons3d/${n.img}.png`} alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="bigword" aria-hidden="true">
                FRESH START<em>✦</em> FRESH START<em>✦</em>
            </div>
        </section>
    );
};

export default Section2;
