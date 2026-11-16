// src/libs/mleverageClient.ts
// 광고주 페이지에서 사용하는 MLeverage Site SDK 클라이언트 설정

import {
    createMLeverageClient,
    normalizeName,
    normalizePhoneNumber,
    normalizeKoreanText,
    sanitizeHtml,
    formatPhoneNumber,
    buildPhoneOverrides,
} from '@mleverage/site-sdk';

// .env 에서 API 주소 가져오기
const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

export const mleverageClient = createMLeverageClient({
    baseUrl,
    withCredentials: true,
});

// ⭐ 여기서 필요한 것들만 꺼내서 export
export const { useInquiryForm, useHomepageContentList } = mleverageClient;

// 유틸은 여기서 한 번 더 export 해두면,
// 컴포넌트에서는 항상 '@/libs/mleverageClient'만 보면 됨
export {
    normalizeName,
    normalizePhoneNumber,
    normalizeKoreanText,
    sanitizeHtml,
    formatPhoneNumber,
    buildPhoneOverrides,
};
