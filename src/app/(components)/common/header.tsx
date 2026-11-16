const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <a className="logo" href="#">
                    <span className="logo-mark" aria-hidden="true"></span>
                    <span>채움회생</span>
                    <span className="tbd">테스트</span>
                </a>
                <nav className="nav" aria-label="주요 메뉴">
                    <a href="#ways">개인회생이란</a>
                    <a href="#analysis">달라지는 점</a>
                    <a href="#faq">자주 묻는 질문</a>
                    <a href="#consult" className="on">
                        상담 신청
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
