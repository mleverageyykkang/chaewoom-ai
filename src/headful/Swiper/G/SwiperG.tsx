'use client';
import React, { useRef, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './SwiperG.module.scss';
import type { Swiper as SwiperCore } from 'swiper';
import { TbChevronCompactRight, TbChevronCompactLeft } from 'react-icons/tb';
import Text from '@/ui-kit/src/components/contents/Text/Text';

type SwiperGProps = {
    slidesPerView?: number | 'auto';
    children: React.ReactNode;
    showArrows?: boolean;
    showPagination?: boolean;
};

const SwiperG = ({ slidesPerView = 1, children, showArrows = true, showPagination = true }: SwiperGProps) => {
    const swiperRef = useRef<SwiperCore | null>(null);

    const [current, setCurrent] = useState(0);
    const totalSlides = React.Children.count(children);
    const mobilePaginationStart = Math.floor(current / 5) * 5;
    const mobilePageIndexes = Array.from(
        { length: Math.min(5, totalSlides - mobilePaginationStart) },
        (_, index) => mobilePaginationStart + index,
    );

    return (
        <div className={styles.Container}>
            {/* Prev Button */}
            {showArrows && (
                <Text size={70} s>
                    <TbChevronCompactLeft
                        color="#BCC3D8"
                        cursor={'pointer'}
                        onClick={() => swiperRef.current?.slidePrev()}
                    />
                </Text>
            )}

            <div className={styles.SwiperWrap}>
                {/* Swiper 본체 */}
                <Swiper
                    className={styles.SwiperB}
                    modules={[Autoplay, Navigation]}
                    spaceBetween={25}
                    centeredSlides
                    slidesPerView={slidesPerView}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    onSwiper={(swiper: SwiperCore) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper: SwiperCore) => {
                        setCurrent(swiper.realIndex);
                    }}
                >
                    {children}
                </Swiper>

                {showPagination && totalSlides > 10 && (
                    <div className={styles.MobilePagination} aria-label="슬라이드 페이지네이션">
                        <button
                            aria-label="이전 페이지 목록"
                            className={styles.PaginationControl}
                            disabled={mobilePaginationStart === 0}
                            onClick={() => swiperRef.current?.slideToLoop(Math.max(mobilePaginationStart - 5, 0))}
                            type="button"
                        >
                            <TbChevronCompactLeft />
                        </button>
                        {mobilePageIndexes.map((index) => (
                            <button
                                aria-label={`${index + 1}번 슬라이드로 이동`}
                                aria-current={current === index ? 'true' : undefined}
                                className={`${styles.PageButton}${current === index ? ` ${styles.activePage}` : ''}`}
                                key={index}
                                onClick={() => swiperRef.current?.slideToLoop(index)}
                                type="button"
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            aria-label="다음 페이지 목록"
                            className={styles.PaginationControl}
                            disabled={mobilePaginationStart + 5 >= totalSlides}
                            onClick={() =>
                                swiperRef.current?.slideToLoop(Math.min(mobilePaginationStart + 5, totalSlides - 1))
                            }
                            type="button"
                        >
                            <TbChevronCompactRight />
                        </button>
                    </div>
                )}

                {showPagination && totalSlides > 1 && (
                    <div
                        className={`${styles.Pagination}${totalSlides > 10 ? ` ${styles.CompactPagination}` : ''}`}
                        aria-label="슬라이드 페이지네이션"
                    >
                        {Array.from({ length: totalSlides }, (_, index) => (
                            <button
                                aria-label={`${index + 1}번 슬라이드로 이동`}
                                aria-current={current === index ? 'true' : undefined}
                                className={`${styles.PageButton}${current === index ? ` ${styles.activePage}` : ''}`}
                                key={index}
                                onClick={() => swiperRef.current?.slideToLoop(index)}
                                type="button"
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Next Button */}
            {showArrows && (
                <Text size={70} s>
                    <TbChevronCompactRight
                        color="#BCC3D8"
                        cursor={'pointer'}
                        onClick={() => swiperRef.current?.slideNext()}
                    />
                </Text>
            )}
        </div>
    );
};

export default SwiperG;
