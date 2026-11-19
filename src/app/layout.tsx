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
                        {/* 틱톡 스크립트 */}
                        <Script id="tiktok-pixel" strategy="afterInteractive">
                            {`
                                !function (w, d, t) {
                                w.TiktokAnalyticsObject = t;
                                var ttq = w[t] = w[t] || [];
                                ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
                                ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; };
                                for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
                                ttq.instance = function (t) {
                                for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                                return e;
                                };
                                ttq.load = function (e, n) {
                                var r = "https://analytics.tiktok.com/i18n/pixel/events.js", o = n && n.partner;
                                ttq._i = ttq._i || {};
                                ttq._i[e] = [];
                                ttq._i[e]._u = r;
                                ttq._t = ttq._t || {};
                                ttq._t[e] = +new Date;
                                ttq._o = ttq._o || {};
                                ttq._o[e] = n || {};
                                n = document.createElement("script");
                                n.type = "text/javascript";
                                n.async = !0;
                                n.src = r + "?sdkid=" + e + "&lib=" + t;
                                e = document.getElementsByTagName("script")[0];
                                e.parentNode.insertBefore(n, e);
                                };
                                ttq.load('DBVARTJC77U73SF6BU50');
                                ttq.page();
                            }(window, document, 'ttq');
                            `}
                        </Script>
                        {/* 구글 스크립트 (gtag.js) */}
                        <Script
                            src="https://www.googletagmanager.com/gtag/js?id=AW-18555271284"
                            strategy="afterInteractive"
                        />
                        <Script id="google-ads" strategy="afterInteractive">
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'AW-18555271284');
                            `}
                        </Script>
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
