'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TEL, TEL_LABEL } from '@/configs/site';

const PhoneIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
);

/** 하단 고정 상담 배너 + 오른쪽 아래 떠 있는 버튼.
 *  닫으면 이번 방문 동안 숨기고, 마지막 상담 섹션(#consult)이 보일 땐 겹치지 않게 숨김 */
const FixedBanner = () => {
    const barRef = useRef<HTMLElement>(null);
    const [closed, setClosed] = useState(false);
    const [finalVisible, setFinalVisible] = useState(false);
    const hidden = closed || finalVisible;

    useEffect(() => {
        try {
            setClosed(sessionStorage.getItem('dlBarClosed') === '1');
        } catch {}
    }, []);

    useEffect(() => {
        // 페이지 본문(loading Suspense 안쪽)이 이 배너보다 늦게 붙을 수 있어서 #consult 가 생길 때까지 기다림
        const io = new IntersectionObserver(([e]) => setFinalVisible(e.isIntersecting), { threshold: 0.2 });
        let mo: MutationObserver | null = null;
        const attach = () => {
            const target = document.querySelector('#consult');
            if (!target) return false;
            io.observe(target);
            mo?.disconnect();
            return true;
        };
        if (!attach()) {
            mo = new MutationObserver(attach);
            mo.observe(document.body, { childList: true, subtree: true });
        }
        return () => {
            io.disconnect();
            mo?.disconnect();
        };
    }, []);

    const syncBar = useCallback(() => {
        const bar = barRef.current;
        if (!bar) return;
        // 떠 있는 바: 위아래 여백(--bar-gap)까지 포함해서 본문 아래 공간을 비워 둠
        const gap = parseFloat(getComputedStyle(bar).getPropertyValue('--bar-gap')) || 0;
        document.documentElement.style.setProperty('--bar-space', hidden ? '0px' : bar.offsetHeight + 2 * gap + 'px');
    }, [hidden]);

    useEffect(() => {
        syncBar();
        window.addEventListener('resize', syncBar);
        return () => window.removeEventListener('resize', syncBar);
    }, [syncBar]);

    const close = () => {
        setClosed(true);
        try {
            sessionStorage.setItem('dlBarClosed', '1');
        } catch {}
    };

    return (
        <>
            <aside ref={barRef} className={`dl-bar${hidden ? ' is-hidden' : ''}`} aria-label="무료 상담 안내">
                <div className="container">
                    <p className="dl-text">
                        <small className="dl-pc">혼자 고민하지 마세요</small>
                        <span>
                            <span className="dl-pc">지금 </span>
                            <span className="blue">무료 진단·상담</span> 받아보세요
                        </span>
                    </p>
                    <div className="dl-actions">
                        <a className="dl-tel" href={`tel:${TEL}`}>
                            <small>전화 상담</small>
                            {TEL_LABEL}
                        </a>
                        <a className="dl-call" href={`tel:${TEL}`} aria-label="전화 상담">
                            <PhoneIcon size={18} />
                        </a>
                        <a className="pill pill-sm" href="#consult">
                            상담 신청
                        </a>
                        <button className="dl-close" type="button" aria-label="배너 닫기" onClick={close}>
                            ✕
                        </button>
                    </div>
                </div>
            </aside>

            <div className="fab">
                <a className="call" href={`tel:${TEL}`} aria-label="전화 상담">
                    <PhoneIcon size={20} />
                </a>
                <a href="#" aria-label="맨 위로">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <path d="M4 11l5-5 5 5" />
                    </svg>
                </a>
            </div>
        </>
    );
};

export default FixedBanner;
