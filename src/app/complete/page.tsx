'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const Complete = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) return;

        // 이미 처리된 전환인 경우 중복 실행 방지
        if (sessionStorage.getItem(`conv_${token}`) === 'done') return;

        // TODO: 이 사이트용 전환 스크립트(구글 Ads·네이버·틱톡·당근 등) 발급 후 여기에서 호출
        // 전환 스크립트 (픽셀별 전송 여부를 따로 관리, 알림창보다 먼저 전송)
        let tiktokSent = false;
        let googleSent = false;
        let finished = false;

        const finish = () => {
            if (finished) return;
            finished = true;
            sessionStorage.setItem(`conv_${token}`, 'done');
            alert('문의가 완료되었습니다!');
            setTimeout(() => router.push('/'), 500);
        };

        const trySend = () => {
            if (!tiktokSent && window.ttq) {
                window.ttq.track('Lead');
                tiktokSent = true;
            }
            if (!googleSent && typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', {
                    send_to: 'AW-18555271284/sf-DCMPyrLsdEPTw649F',
                });
                googleSent = true;
            }
            return tiktokSent && googleSent;
        };

        if (trySend()) {
            finish();
            return;
        }

        // 픽셀이 늦게 로드된 경우 대비
        const interval = setInterval(() => {
            if (trySend()) {
                clearInterval(interval);
                clearTimeout(timeout);
                finish();
            }
        }, 200);
        // 타임아웃 가드: 픽셀이 끝내 로드되지 않아도 완료 처리
        const timeout = setTimeout(() => {
            clearInterval(interval);
            finish();
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [router, searchParams]);

    return <div style={{ width: '100%', height: '100vh', background: '#777777' }} />;
};

const CompletePage = () => (
    <Suspense>
        <Complete />
    </Suspense>
);

export default CompletePage;
