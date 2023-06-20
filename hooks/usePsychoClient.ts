// usePsychoClient.ts
import { useEffect, useRef, useCallback, useState } from 'react';
import {
	Client,
	PsychoReaderClient,
} from '../components/comicReader/PsychoClient';
import { IConfig } from '../components/comicReader/IConfig';
import Book from '../components/comicReader/Book';
import Page from '../components/comicReader/Page';
import Swiper from 'swiper';
import { drawCanvas } from '../utils/CanvasHelper';
import debounce from '../utils/debounce';

const wholePageIndex = -1;

// @todo: move this to a helper and check if it's a valid page
function handleResize(
	canvas: HTMLCanvasElement,
	page: Page,
	panelIndex: number
): void {
	drawCanvas(canvas, page, panelIndex);
}

function shouldAllowSlideNext(
	swiper: Swiper,
	pages: Page[],
	panelIndexRefs: number[]
): boolean {
	const totalSlides = swiper.slides.length;
	if (swiper.realIndex >= 0 && swiper.realIndex < pages.length - 1) {
		return !pages[swiper.realIndex].hasNextPanel(
			panelIndexRefs[swiper.realIndex]
		);
	} else {
		return swiper.realIndex < totalSlides - 1;
	}
}

function shouldAllowSlidePrev(
	swiper: Swiper,
	pages: Page[],
	panelIndexRefs: number[]
): boolean {
	if (swiper.realIndex > 0 && swiper.realIndex < pages.length - 1) {
		return !pages[swiper.realIndex].hasPrevPanel(
			panelIndexRefs[swiper.realIndex]
		);
	} else {
		return swiper.realIndex > 0;
	}
}

export const usePsychoClient = (
	psychoReaderConfig: IConfig,
	debug: boolean
) => {
	const psychoClientRef = useRef<PsychoReaderClient>();
	if (!psychoClientRef.current) {
		psychoClientRef.current = Client(psychoReaderConfig);
	}
	const psychoClient = psychoClientRef.current;

	const canvasRefs = useRef<Array<React.RefObject<HTMLCanvasElement>>>([]);
	const panelIdxRefs = useRef<Array<number>>([]);
	const swiperRef = useRef<Swiper | null>(null);

	useEffect(() => {
		debug && console.log(`canvasRefs `, canvasRefs);
		canvasRefs.current = canvasRefs.current.slice(
			0,
			psychoClient.book.pages.length
		);
		panelIdxRefs.current = new Array(psychoClient.book.pages.length).fill(
			wholePageIndex
		);
	}, [debug, psychoClient]);

	const getPageInfo = useCallback((book: Book, pageIdx: number) => {
		const currentPage = book.getCurrentPage(pageIdx);
		const currentPageIndex = book.pages.indexOf(currentPage);
		return { currentPage, currentPageIndex };
	}, []);

	const doResize = () => {
		psychoClient.book.pages.forEach((page, index) => {
			const canvas = canvasRefs.current[index]?.current;
			const currentPanel = panelIdxRefs.current[index];

			if (canvas && typeof currentPanel === 'number') {
				handleResize(canvas, page, currentPanel);
			}
		});

		if (swiperRef.current) {
			const swiper = swiperRef.current;
			swiper.allowSlideNext = shouldAllowSlideNext(
				swiper,
				psychoClient.book.pages,
				panelIdxRefs.current
			);
			swiper.allowSlidePrev = shouldAllowSlidePrev(
				swiper,
				psychoClient.book.pages,
				panelIdxRefs.current
			);
		}
	};

	const debouncedResize = debounce(doResize, 100);

	useEffect(() => {
		const handleResizeEvent = () => {
			const canvas =
				canvasRefs.current[swiperRef.current?.activeIndex]?.current;
			if (canvas) {
				const ctx: CanvasRenderingContext2D | null | undefined =
					canvas.getContext('2d');
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
			debouncedResize();
		};

		const handleFullscreenEvent = () => {
			handleResizeEvent();
		};

		window.addEventListener('resize', handleResizeEvent);
		document.addEventListener('fullscreenchange', handleFullscreenEvent);

		return () => {
			window.removeEventListener('resize', handleResizeEvent);
			document.removeEventListener('fullscreenchange', handleFullscreenEvent);
		};
	}, [
		psychoClient,
		canvasRefs,
		panelIdxRefs,
		getPageInfo,
		swiperRef,
		debouncedResize,
	]);

	const isValidPage = (book: Book, index: number) => {
		return index >= 0 && index < book.pages.length;
	};

	const handleOnNextEnd = useCallback((swiper: Swiper, book: Book) => {
		swiper.allowSlideNext = shouldAllowSlideNext(
			swiper,
			book.getPages(),
			panelIdxRefs.current
		);
		swiper.allowSlidePrev = shouldAllowSlidePrev(
			swiper,
			book.getPages(),
			panelIdxRefs.current
		);
	}, []);

	const handleOnPrevEnd = useCallback((swiper: Swiper, book: Book) => {
		swiper.allowSlidePrev = shouldAllowSlidePrev(
			swiper,
			book.getPages(),
			panelIdxRefs.current
		);
		swiper.allowSlideNext = shouldAllowSlideNext(
			swiper,
			book.getPages(),
			panelIdxRefs.current
		);
	}, []);

	const handleOnSlideChangeEnd = useCallback(
		(swiper: Swiper, { book }: { book: Book }) => {
			if (!isValidPage(book, swiper.activeIndex)) return;

			swiper.realIndex > swiper.previousIndex ||
			swiper.previousIndex === undefined
				? handleOnNextEnd(swiper, book)
				: handleOnPrevEnd(swiper, book);
		},
		[handleOnNextEnd, handleOnPrevEnd]
	);

	const navigateToPanel = useCallback(
		(swiper: Swiper, { book }: { book: Book }, direction: 'next' | 'prev') => {
			if (!isValidPage(book, swiper.activeIndex)) return;

			const { currentPage, currentPageIndex } = getPageInfo(
				book,
				swiper.activeIndex
			);
			let currentPanelIndex = panelIdxRefs.current[currentPageIndex];

			if (
				(direction === 'next' && !swiper.allowSlideNext) ||
				(direction === 'prev' &&
					!swiper.allowSlidePrev &&
					currentPanelIndex > wholePageIndex)
			) {
				panelIdxRefs.current[currentPageIndex] =
					direction === 'next'
						? currentPage.goToNextPanel(currentPanelIndex)
						: currentPage.goToPrevPanel(currentPanelIndex);
				currentPanelIndex = panelIdxRefs.current[currentPageIndex];
			}

			swiper.allowSlidePrev = shouldAllowSlidePrev(
				swiper,
				book.getPages(),
				panelIdxRefs.current
			);
			swiper.allowSlideNext = shouldAllowSlideNext(
				swiper,
				book.getPages(),
				panelIdxRefs.current
			);
		},
		[getPageInfo]
	);

	const handleOnNavigationIgnorePanels = useCallback(
		(swiper: Swiper, { book }: { book: Book }, direction: 'next' | 'prev') => {
			console.log('handleOnNavigationIgnorePanels');
			if (!isValidPage(book, swiper.activeIndex)) return;
			if (
				(direction === 'next' && !swiper.isEnd) ||
				(direction === 'prev' && !swiper.isBeginning)
			) {
				// Retrieve the page that we're navigating away from
				const currentPage = book.getCurrentPage(swiper.realIndex);
				// Reset this page to the first panel
				panelIdxRefs.current[swiper.realIndex] = currentPage.goToWholePagePanel(
					panelIdxRefs.current[swiper.realIndex]
				);
				swiper.allowSlidePrev = direction === 'prev';
				swiper.allowSlideNext = direction === 'next';
				direction === 'next' ? swiper.slideNext() : swiper.slidePrev();
				swiper.allowSlidePrev = shouldAllowSlidePrev(
					swiper,
					book.getPages(),
					panelIdxRefs.current
				);
				swiper.allowSlideNext = shouldAllowSlideNext(
					swiper,
					book.getPages(),
					panelIdxRefs.current
				);
			}
		},
		[]
	);

	const handleKeypress = useCallback(
		(event: KeyboardEvent) => {
			if (!swiperRef.current) {
				return;
			}
			console.log('keypress', event.key);
			if (event.key === 'ArrowRight') {
				if (!swiperRef.current.isEnd) {
					swiperRef.current.slideNext();
					if (!swiperRef.current.allowSlideNext) {
						navigateToPanel(
							swiperRef.current,
							{
								book: psychoClient.book,
							},
							'next'
						);
					}
				}
			} else if (event.key === 'ArrowLeft') {
				if (!swiperRef.current.isBeginning) {
					swiperRef.current.slidePrev();
					if (!swiperRef.current.allowSlidePrev) {
						navigateToPanel(
							swiperRef.current,
							{
								book: psychoClient.book,
							},
							'prev'
						);
					}
				}
			} else if (event.key === 'ArrowUp') {
				handleOnNavigationIgnorePanels(
					swiperRef.current,
					{
						book: psychoClient.book,
					},
					'prev'
				);
			} else if (event.key === 'ArrowDown') {
				handleOnNavigationIgnorePanels(
					swiperRef.current,
					{
						book: psychoClient.book,
					},
					'next'
				);
			}
		},
		[swiperRef, navigateToPanel, handleOnNavigationIgnorePanels, psychoClient]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeypress);

		return () => {
			window.removeEventListener('keydown', handleKeypress);
		};
	}, [handleKeypress]);

	const sliderMoveTriggeredRef = useRef(false);
	const previousSlideRef = useRef(-1);

	const handleOnSliderStart = (swiper: Swiper) => {
		console.log('handleOnSliderStart');
		if (!swiper.isBeginning) {
			swiper.allowSlidePrev = true;
		}
		if (!swiper.isEnd) {
			swiper.allowSlideNext = true;
		}
		sliderMoveTriggeredRef.current = true;
		previousSlideRef.current = swiper.activeIndex;
		console.log(previousSlideRef.current);
	};

	const handleOnSliderEnd = (swiper: Swiper) => {
		console.log('handleOnSliderEnd');
		if (
			sliderMoveTriggeredRef.current &&
			swiper.previousIndex !== swiper.activeIndex
		) {
			// This is the previous page we navigated away from for some reason
			const page = psychoClient.book.pages[swiper.activeIndex];
			if (page) {
				console.log(`setting ${swiper.activeIndex} to whole page`);
				panelIdxRefs.current[swiper.activeIndex] = page.goToWholePagePanel(
					panelIdxRefs.current[swiper.activeIndex]
				);
			}
		}
		sliderMoveTriggeredRef.current = false;
	};

	return {
		canvasRefs,
		panelIdxRefs,
		psychoClient,
		swiperRef,
		handleOnSlideChangeEnd,
		navigateToPanel,
		handleOnSliderStart,
		handleOnSliderEnd,
	};
};
