import { Fragment } from 'react';

// 바닥글: 변호사 광고 필수 표기. 정보 출처: 채움회생 기존 사이트(채움회생.kr) 바닥글
const INFO: [string, string][] = [
    ['상호', '채움회생 (LAW OFFICE YULSAENG)'],
    ['대표', '천찬희'],
    ['광고책임변호사', '천찬희'],
    ['주소', '서울특별시 영등포구 국회대로72길 4, 11층(여의도동, 아이비피아빌딩)'],
    ['사업자등록번호', '136-15-07548'],
    ['대표전화', '02-780-0933'],
    ['이메일', 'yulsaeng1@gmail.com'],
];

const Footer = () => {
    return (
        <footer className="footer">
            {/* TODO: 두 링크를 실제 약관 페이지(또는 팝업)에 연결 */}
            <div className="footer-links">
                <a href="#">
                    <b>개인정보처리방침</b>
                </a>
                <a href="#">이용약관</a>
            </div>
            <dl>
                {INFO.map(([k, v]) => (
                    <Fragment key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                    </Fragment>
                ))}
            </dl>
            <p className="disclaimer">
                개인회생은 법원의 판단에 따라 결과가 달라지며, 감면 금액과 기간은 사건마다 다릅니다. © 채움법률사무소.
                All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
