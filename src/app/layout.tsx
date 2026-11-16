import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
import { ThemeProvider } from '@/ui-kit/src/components/ThemeProvider';
import ClientLayout from './ClientLayout';
import Script from 'next/script';

const LocalFont = localFont({
    src: [
        { path: '../assets/fonts/pretendard/Pretendard-Regular.woff2', weight: '400', style: 'normal' },
        { path: '../assets/fonts/pretendard/Pretendard-SemiBold.woff2', weight: '600', style: 'normal' },
        { path: '../assets/fonts/pretendard/Pretendard-Bold.woff2', weight: '700', style: 'normal' },
        { path: '../assets/fonts/pretendard/Pretendard-ExtraBold.woff2', weight: '800', style: 'normal' },
    ],
    variable: '--font-pretendard',
});

export const metadata: Metadata = {
    title: '채움회생',
    description: '매달 갚는 돈이 버겁다면, 개인회생. 채움회생 무료 진단·상담',
    keywords: [],
    icons: {
        icon: '/favicon.ico',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const src = process.env.NEXT_PUBLIC_API_URL;
    const env = process.env.NEXT_PUBLIC_ENV;
    const isProd = env === 'prod';

    return (
        <html lang="ko" suppressHydrationWarning id="root">
            <head>
                {/* 움직임 줄이기 설정이 아니면 움직임 시작 전 상태(숨김 등)를 적용 */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `if (!matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("motion");`,
                    }}
                />
                {/* MLeverage 스크립트 */}
                <Script id="mleverage-config">{`window.MLeverageConfig = {apiBase: '${src}'};`}</Script>
                <Script src={`https://cdn.mleverage.co.kr/mleverage.client.js`} defer></Script>

                {isProd && (
                    <>
                        {/* TODO: 이 사이트용 광고 스크립트(네이버 WCS·구글 태그·틱톡·당근 픽셀 등) 발급 후 여기에 추가 */}
                    </>
                )}
            </head>
            <body suppressHydrationWarning className={LocalFont.variable}>
                <ThemeProvider
                    theme={{
                        '--primary-color': '#1F49B6',
                        '--text-color': '#0B0D0F',
                        '--focus-color': '#1F49B6',
                    }}
                >
                    <ClientLayout>{children}</ClientLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
