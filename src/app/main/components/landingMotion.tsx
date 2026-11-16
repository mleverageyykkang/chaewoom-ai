'use client';
import { useEffect, useRef } from 'react';
import { startLandingMotion } from './motion';

/** 페이지 전체 움직임을 한 번만 시작 (개발 모드 StrictMode 이중 실행 방지) */
const LandingMotion = () => {
    const started = useRef(false);
    useEffect(() => {
        if (started.current) return;
        started.current = true;
        startLandingMotion();
    }, []);
    return null;
};

export default LandingMotion;
