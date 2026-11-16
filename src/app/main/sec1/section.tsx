// 1. 첫 화면 (M1·M2): 파란 덩어리 변신 → 3D 저울, 화살표
const Section1 = () => {
    return (
        <section className="section hero">
            <div className="container">
                <p className="hero-sub">매달 갚는 돈이 버겁다면</p>
                <h1 className="hero-word">개인회생</h1>
                <div className="hero-stage">
                    <img className="hero-3d" src="/assets/icons3d/scale.png" alt="" />
                </div>
                <div className="hero-cta-wrap">
                    <span className="morph-anchor" aria-hidden="true">
                        <span className="morph"></span>
                    </span>
                    <a className="pill hero-cta" href="#consult">
                        무료 진단 신청
                    </a>
                </div>
                <span className="chev" aria-hidden="true">
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
            </div>
        </section>
    );
};

export default Section1;
