'use client';
import { useEffect } from 'react';

/**
 * 모달이 열려 있는 동안 뒤 페이지 스크롤을 막음.
 * body 에 overflow: hidden 만 거는 방식은 모바일(특히 iOS Safari)에서 화면이 맨 위로 튀는 문제가 있어서,
 * 지금 스크롤 위치를 기억해 body 를 그 자리에 고정했다가 닫을 때 같은 위치로 되돌림.
 */
export function useScrollLock(active: boolean) {
    useEffect(() => {
        if (!active) return;
        const { body } = document;
        const y = window.scrollY;
        const prev = {
            position: body.style.position,
            top: body.style.top,
            left: body.style.left,
            right: body.style.right,
            width: body.style.width,
            overflow: body.style.overflow,
        };
        body.style.position = 'fixed';
        body.style.top = `-${y}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
        body.style.overflow = 'hidden';
        return () => {
            Object.assign(body.style, prev);
            // html 에 scroll-behavior: smooth 가 있어서 'instant' 로 지정해야 맨 위에서 굴러 내려오지 않음
            window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
        };
    }, [active]);
}
