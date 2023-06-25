// usePsychoClient.ts
import { useEffect, useRef, useCallback } from 'react';
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
import { useKeyPress } from './useKeyPress';

const wholePageIndex = -1;

// @todo: check if it's a valid page
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

function setSwiperSlidePermissions(
	swiper: Swiper,
	book: Book,
	panelIdxRefs: number[]
) {
	swiper.allowSlidePrev = shouldAllowSlidePrev(
		swiper,
		book.getPages(),
		panelIdxRefs
	);
	swiper.allowSlideNext = shouldAllowSlideNext(
		swiper,
		book.getPages(),
		panelIdxRefs
	);
}

function setOnSlideChange(
	slideNumber: number,
	panelIdxRefs: number[],
	onSlideChange: (slideNumber: number, panelNumber: number) => void
) {
	const panelNumber =
		typeof panelIdxRefs[slideNumber] !== 'undefined'
			? panelIdxRefs[slideNumber]
			: wholePageIndex;
	onSlideChange(slideNumber, panelNumber);
}

export const usePsychoClient = (
	psychoReaderConfig: IConfig,
	debug: boolean,
	onSlideChange: (slideNumber: number, panelNumber: number) => void,
	initialSlideNumber?: number,
	initialPanelNumber?: number
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
		canvasRefs.current = canvasRefs.current.slice(
			0,
			psychoClient.book.pages.length
		);
		panelIdxRefs.current = new Array(psychoClient.book.pages.length).fill(
			wholePageIndex
		);
		// Verify the initialPanelNumber is a valid panel on the given initialSlideNumber (page)
		if (
			initialSlideNumber >= 0 &&
			initialSlideNumber < psychoClient.book.pages.length &&
			initialPanelNumber >= 0 &&
			initialPanelNumber <
				psychoClient.book.pages[initialSlideNumber].panels.length
		) {
			panelIdxRefs.current[initialSlideNumber] = initialPanelNumber;
			if (swiperRef.current) {
				const swiper = swiperRef.current;
				setSwiperSlidePermissions(
					swiper,
					psychoClient.book,
					panelIdxRefs.current
				);
			}
		}
	}, [debug, initialPanelNumber, initialSlideNumber, psychoClient]);

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
			setSwiperSlidePermissions(
				swiper,
				psychoClient.book,
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

	const handleOnSlideChangeEnd = useCallback(
		(swiper: Swiper, { book }: { book: Book }) => {
			// Check if the panelIndexRefs entry for the current slide index is not undefined
			if (typeof panelIdxRefs.current[swiper.activeIndex] !== 'undefined') {
				setOnSlideChange(
					swiper.activeIndex,
					panelIdxRefs.current,
					onSlideChange
				);
				if (!isValidPage(book, swiper.activeIndex)) return;

				setSwiperSlidePermissions(swiper, book, panelIdxRefs.current);
			}
		},
		[onSlideChange]
	);

	const navigateToPanel = useCallback(
		(swiper: Swiper, { book }: { book: Book }, direction: 'next' | 'prev') => {
			if (!isValidPage(book, swiper.activeIndex)) {
				setOnSlideChange(
					swiper.activeIndex,
					panelIdxRefs.current,
					onSlideChange
				);
				return;
			}

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

			setSwiperSlidePermissions(swiper, book, panelIdxRefs.current);
			setOnSlideChange(swiper.activeIndex, panelIdxRefs.current, onSlideChange);
		},
		[getPageInfo, onSlideChange]
	);

	const handleOnNavigationIgnorePanels = useCallback(
		(swiper: Swiper, { book }: { book: Book }, direction: 'next' | 'prev') => {
			if (!isValidPage(book, swiper.activeIndex)) {
				setOnSlideChange(
					swiper.activeIndex,
					panelIdxRefs.current,
					onSlideChange
				);
				return;
			}
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
				setSwiperSlidePermissions(swiper, book, panelIdxRefs.current);
			}
			setOnSlideChange(swiper.activeIndex, panelIdxRefs.current, onSlideChange);
		},
		[onSlideChange]
	);

	// ArrowRight handler
	useKeyPress(
		'ArrowRight',
		() => {
			if (!swiperRef.current || swiperRef.current.isEnd) {
				return;
			}
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
		},
		() => {}
	);

	// ArrowLeft handler
	useKeyPress(
		'ArrowLeft',
		() => {
			if (!swiperRef.current || swiperRef.current.isBeginning) {
				return;
			}
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
		},
		() => {}
	);

	// ArrowUp handler
	useKeyPress(
		'ArrowUp',
		() => {
			if (swiperRef.current) {
				handleOnNavigationIgnorePanels(
					swiperRef.current,
					{
						book: psychoClient.book,
					},
					'prev'
				);
			}
		},
		() => {}
	);

	// ArrowDown handler
	useKeyPress(
		'ArrowDown',
		() => {
			if (swiperRef.current) {
				handleOnNavigationIgnorePanels(
					swiperRef.current,
					{
						book: psychoClient.book,
					},
					'next'
				);
			}
		},
		() => {}
	);

	const sliderMoveTriggeredRef = useRef(false);
	const previousSlideRef = useRef(-1);

	const handleOnSliderStart = (swiper: Swiper) => {
		if (!swiper.isBeginning) {
			swiper.allowSlidePrev = true;
		}
		if (!swiper.isEnd) {
			swiper.allowSlideNext = true;
		}
		sliderMoveTriggeredRef.current = true;
		previousSlideRef.current = swiper.activeIndex;
	};

	const handleOnSliderEnd = (swiper: Swiper) => {
		if (
			sliderMoveTriggeredRef.current &&
			swiper.previousIndex !== swiper.activeIndex
		) {
			// This is the previous page we navigated away from for some reason
			const page = psychoClient.book.pages[swiper.activeIndex];
			if (page) {
				panelIdxRefs.current[swiper.activeIndex] = page.goToWholePagePanel(
					panelIdxRefs.current[swiper.activeIndex]
				);
			}
		}
		sliderMoveTriggeredRef.current = false;
		setOnSlideChange(swiper.activeIndex, panelIdxRefs.current, onSlideChange);
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
