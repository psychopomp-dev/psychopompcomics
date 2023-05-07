import React, { useEffect, useRef, createRef } from 'react';
import Swiper from 'swiper';
import { Swiper as SwiperElement, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import Page from './Page';
import { Client } from './PsychoClient';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Canvas } from './Canvas';
import Book from './Book';
import { IConfig } from './IConfig';
import styled from 'styled-components';

const SwiperContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    height: 100%;

    .swiperSlide {
        display: flex;
        justify-content: center;
    }
`;

const StyledSwiper = styled(SwiperElement)`
    width: 100%;
    height: 100%;

    .swiper-button-prev::after,
    .swiper-button-next::after {
        color:  var(--brand);
    }

    .swiper-button-prev::after {
        content: '‹';
    }

    .swiper-button-next::after {
        content: '›';
    }
`

interface PsychoReaderProps {
    psychoReaderConfig: IConfig;
    debug?: boolean;
}

export const PsychoReader = ({ psychoReaderConfig, debug = false }: PsychoReaderProps) => {
    const psychoClient = Client(psychoReaderConfig);

    const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);

    useEffect(() => {
        debug && console.log(`canvasRefs `, canvasRefs);
        canvasRefs.current = canvasRefs.current.slice(0, psychoClient.book.pages.length);
    }, [debug, psychoClient]);

    const handleOnSlideChangeEnd = (swiper: Swiper, { book }: { book: Book }) => {
        //sometimes swiper.swipeDirection is undefined so we can determine a dir this way
        const dir = swiper.realIndex > swiper.previousIndex || swiper.previousIndex === undefined ? 'next' : 'prev';
        if (dir === 'next') {
            handleOnNextEnd(swiper, book);
        } else {
            handleOnPrevEnd(swiper, book);
        }
    };

    const handleOnNextEnd = (swiper: Swiper, book: Book) => {
        book.goToNext();
        debug && console.log(`current page is ${book.currentPage} and displayImage is ${book.getCurrentPage().displayImage}`);
        debug && console.log('handleOnNextEnd');
        const currentPage = book.getCurrentPage();
        if (currentPage.hasNextPanel()) {
            debug && console.log(`new currentPage ${book.currentPage} has next panel(s). allowSlideNext=false`);
            swiper.allowSlideNext = false;
        } else if (book.hasNextPage()) {
            debug && console.log(`currentPage ${book.currentPage} has no panels. allowSlideNext=true`);
            swiper.allowSlideNext = true;
        }
        if (book.hasPrevPage()) swiper.allowSlidePrev = true;
    };

    const handleOnPrevEnd = (swiper: Swiper, book: Book) => {
        book.goToPrev();
        debug && console.log(`new current page is ${book.currentPage} and displayImage is ${book.getCurrentPage().displayImage}`);
        debug && console.log('handleOnPrevEnd');
        const currentPage = book.getCurrentPage();
        if (currentPage.hasPrevPanel()) {
            debug && console.log(`currentPage ${book.currentPage} has previous panel(s). allowSlidePrev=false`);
            swiper.allowSlidePrev = false;
        } else if (book.hasPrevPage()) {
            debug && console.log(`currentPage ${book.currentPage} has no panels. allowSlideNext=true`);
            swiper.allowSlideNext = true;
        }
        if (book.hasNextPage()) swiper.allowSlideNext = true;
    };

    const handleOnNavigationNext = (swiper: Swiper, { book }: { book: Book }) => {
        const currentPage = book.getCurrentPage();
        //we're prevented from moving next so we have a panel to transition to
        //or we're at the end of the slide show
        if (!swiper.allowSlideNext) {
            debug &&
                console.log(`going from panel ${currentPage.isOnPageImage() ? 'pageImage' : currentPage.currentPanel} to next panel ${currentPage.isOnPageImage() ? 0 : currentPage.currentPanel + 1}`);
            //advance the panel. need to prop drill the new image source into the canvas ref in
            //order to trigger a render. get ref to the canvas and change the src on the element
            currentPage.nextImage();
            debug && console.log(`displayImage is now ${book.getCurrentPage().displayImage}`);
            //we don't allow slide to previous page as we have a panel
            //on the current page to go back to first
            swiper.allowSlidePrev = false;
        }
        //if we're at the end of a page and theres a another page
        //allow the next slide to trigger
        if (!swiper.allowSlideNext && !currentPage.hasNextPanel() && book.hasNextPage()) {
            debug && console.log(`at the end of the page. allowed to go to next`);
            swiper.allowSlideNext = true;
        }
    };

    const handleOnNavigationPrev = (swiper: Swiper, { book }: { book: Book }) => {
        const currentPage = book.getCurrentPage();
        //we're prevented from moving previous we have a panel to transition to
        //or we're at the beginning of the slide show
        // if (!swiper.allowSlidePrev && currentPage.hasPrevPanel()) {
        if (!swiper.allowSlidePrev) {
            debug && console.log(`going from panel ${currentPage.currentPanel} to prev panel ${currentPage.currentPanel === 0 ? 'pageImage' : currentPage.currentPanel - 1}`);
            currentPage.prevImage();
            debug && console.log(`displayImage is now ${book.getCurrentPage().displayImage}`);
            swiper.allowSlideNext = false;
        }

        if (!swiper.allowSlidePrev && book.hasPrevPage() && book.getCurrentPage().isOnPageImage()) {
            debug && console.log(`at the start of the page. allowed to go to previous page`);
            swiper.allowSlidePrev = true;
        }
    };

    /**
     * @todo Enable swipe only when switching pages. Enable swipe to change panels
     * based on direction
     */
    const handleOnSwiperMove = (swiper: Swiper, { book }: { book: Book }) => {
        //sometimes swiper.swipeDirection is undefined so we can determine a dir this way
        // const dir =
        //   swiper.realIndex > swiper.previousIndex ||
        //   swiper.previousIndex === undefined
        //     ? "next"
        //     : "prev";
        // debug && console.log(`handleOnSwiperMove ${dir}`);
    };

    return (
            <SwiperContainer>
                {/* @todo Move 👇 to the PsychoClient file */}
                <StyledSwiper
                    allowTouchMove={false}
                    modules={[Navigation, Pagination, A11y]}
                    navigation={true}
                    pagination={{
                        clickable: false
                    }}
                    // onBeforeSlideChangeStart={(swiper) => {
                    //   debug && console.log(`onBeforeSlideChangeStart`);
                    //   handleOnSlideChange(swiper, psychoClient);
                    // }}
                    onNavigationNext={(swiper) => {
                        debug && console.log(`**********onNavigationNext**********`);
                        handleOnNavigationNext(swiper, psychoClient);
                    }}
                    onNavigationPrev={(swiper) => {
                        debug && console.log(`**********onNavigationPrev**********`);
                        handleOnNavigationPrev(swiper, psychoClient);
                    }}
                    onSlideChangeTransitionEnd={(swiper) => {
                        debug && console.log(`onSlideChangeTransitionEnd`);
                        handleOnSlideChangeEnd(swiper, psychoClient);
                    }}
                    onSliderMove={(swiper) => {
                        handleOnSwiperMove(swiper, psychoClient);
                    }}
                    slidesPerView={1}
                >
                    {!!psychoClient.book &&
                        psychoClient.book.pages.map((page: Page) => {
                            debug && console.log(`page.displayImage ${page.displayImage}`);
                            let ref = createRef<HTMLCanvasElement>();
                            page.ref = ref;
                            return (
                                <SwiperSlide key={page.imageUrl}>
                                    <Canvas src={page.displayImage} width={page.pageDimensions.width} height={page.pageDimensions.height} objectPosition="contain" page={page} canvasRef={ref} />
                                </SwiperSlide>
                            );
                        })}
                    <SwiperSlide />
                </StyledSwiper>
            </SwiperContainer>
    );
};

export default PsychoReader;
