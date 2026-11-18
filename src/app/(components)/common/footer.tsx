'use client';
import { useState } from 'react';
import BasicModal from '@/headful/BasicModal/BasicModal';
import PrivacyContent from './ModalContent/PrivacyContent';
import DetailContent from './ModalContent/DetailContent';

// 바닥글: 변호사 광고 필수 표기. 정보 출처: 채움회생 기존 사이트(채움회생.kr) 바닥글
const INFO: [string, string][] = [
    ['상호', '채움회생 (LAW OFFICE YULSAENG)'],
    ['대표', '천찬희'],
    ['광고책임변호사', '천찬희'],
    ['주소', '서울특별시 영등포구 국회대로72길 4, 11층(여의도동, 아이비피아빌딩)'],
    ['사업자등록번호', '136-15-07548'],
    ['대표전화', '050-8201-1610'],
    ['이메일', 'yulsaeng1@gmail.com'],
];

const Footer = () => {
    // 약관 모달: 내용은 채움회생 기존 사이트(chaewoom-frontend)와 같음
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [termsOpen, setTermsOpen] = useState(false);

    return (
        <footer className="footer">
            <div className="footer-links">
                <button type="button" className="footer-link" onClick={() => setPrivacyOpen(true)}>
                    <b>개인정보처리방침</b>
                </button>
                <button type="button" className="footer-link" onClick={() => setTermsOpen(true)}>
                    이용약관
                </button>
            </div>
            <BasicModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} title="개인정보처리방침">
                <PrivacyContent />
            </BasicModal>
            <BasicModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} title="이용약관">
                <DetailContent />
            </BasicModal>
            <dl>
                {/* 이름표와 내용을 한 묶음으로: 긴 주소가 줄바꿈돼도 내용 칸 안에서 바뀜 */}
                {INFO.map(([k, v]) => (
                    <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                    </div>
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
