import { TEL, TEL_LABEL } from '@/configs/site';

// 1. 첫 화면 (M1·M2): 배경 영상(어둡게 덮음) 위에 글·버튼, 아래 화살표
const Section1 = () => {
    return (
        <section className="section hero">
            {/* 배경 영상: 화면에 보일 때만 재생 (움직임 줄이기 설정이면 첫 장면 그림만) */}
            <div className="hero-bg" aria-hidden="true">
                <video
                    className="hero-video"
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/assets/video/hero-poster.jpg"
                >
                    <source src="/assets/video/hero.mp4" type="video/mp4" />
                    <source src="/assets/video/hero.webm" type="video/webm" />
                </video>
            </div>
            <div className="container">
                <div className="hero-copy reveal">
                    <span className="hero-tag">2027 개인회생</span>
                    <h1 className="hero-title">
                        무거운 빚,
                        <br />
                        <span className="blue">지금 당장</span>
                        <br />
                        해결할 수 있습니다
                    </h1>
                    <p className="hero-desc">
                        최대 95%까지 빚을 탕감받고
                        <br />월 납부액을 줄일 수 있습니다.
                        <br />
                        오늘 무료상담 받고 부담 줄여보세요.
                    </p>
                    <div className="hero-actions">
                        <a className="pill hero-cta" href="#consult">
                            무료 진단 신청
                        </a>
                        <a className="hero-tel" href={`tel:${TEL}`}>
                            <small>전화 상담</small>
                            {TEL_LABEL}
                        </a>
                    </div>
                </div>
            </div>
            <span className="chev" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
            </span>
        </section>
    );
};

export default Section1;
