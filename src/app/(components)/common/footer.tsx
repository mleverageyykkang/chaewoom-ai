import { TEL_LABEL } from '@/configs/site';

// 바닥글: 변호사 광고 필수 표기 (실제 정보로 교체)
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <span>이용약관</span>
                <b>개인정보처리방침</b>
                <span>오시는 길</span>
            </div>
            <dl>
                <dt>대표 변호사</dt>
                <dd>홍길동 (테스트)</dd>
                <dt>광고책임 변호사</dt>
                <dd>홍길동 (테스트)</dd>
                <dt>주소</dt>
                <dd>서울특별시 ○○구 ○○로 00 (테스트)</dd>
                <dt>사업자등록번호</dt>
                <dd>000-00-00000</dd>
                <dt>전화</dt>
                <dd>{TEL_LABEL} (테스트)</dd>
            </dl>
            <p className="disclaimer">
                개인회생은 법원의 판단에 따라 결과가 달라지며, 감면 금액과 기간은 사건마다 다릅니다. © 채움회생{' '}
                <span className="tbd">테스트</span>
            </p>
        </footer>
    );
};

export default Footer;
