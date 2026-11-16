'use client';
import { usePathname } from 'next/navigation';
import Header from './(components)/common/header';
import FixedBanner from './(components)/common/fixedBanner';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isCompletePage = pathname.startsWith('/complete');

    return (
        <>
            {!isCompletePage && <Header />}
            {children}
            {!isCompletePage && <FixedBanner />}
        </>
    );
}
