'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

//css
import 'swiper/css';
import styles from './SwiperB.module.scss';
import { ReactNode, useState } from 'react';
import BarC from '@/headful/bar/C/barC';

export type SwiperDataItem = {
    content1?: ReactNode;
    content2?: ReactNode;
    content3?: ReactNode;
};

type SwiperBProps = {
    data: SwiperDataItem[];
};

const SwiperB = ({ data }: SwiperBProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <Swiper
            direction={'vertical'}
            speed={1500}
            allowTouchMove={false}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            className={styles.SwiperContainer}
            slidesPerView={5}
            onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
            }}
        >
            {data.map((item, index) => (
                <SwiperSlide key={index} className={styles.SlideContainer}>
                    <BarC data={[item]} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
export default SwiperB;
