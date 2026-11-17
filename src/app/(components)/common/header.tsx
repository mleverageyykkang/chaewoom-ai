const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <a className="logo" href="#">
                    <span className="logo-mark" aria-hidden="true"></span>
                    <span>채움회생</span>
                </a>
                <div className="header-right">
                    <nav className="nav" aria-label="주요 메뉴">
                        <a href="#about">개인회생이란</a>
                        <a href="#analysis">달라지는 점</a>
                        <a href="#faq">자주 묻는 질문</a>
                    </nav>
                    <a className="pill pill-xs" href="#consult">
                        무료 진단 신청
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
