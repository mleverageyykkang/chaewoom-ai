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
        sessionStorage.setItem(`conv_${token}`, 'done');
        alert('문의가 완료되었습니다!');
        setTimeout(() => router.push('/'), 500);
    }, [router, searchParams]);

    return <div style={{ width: '100%', height: '100vh', background: '#777777' }} />;
};

const CompletePage = () => (
    <Suspense>
        <Complete />
    </Suspense>
);

export default CompletePage;
