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

		window.addEventListener('resize', handleResizeEvent);
		document.addEventListener('fullscreenchange', handleResizeEvent);

		return () => {
			window.removeEventListener('resize', handleResizeEvent);
			document.removeEventListener('fullscreenchange', handleResizeEvent);
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

	const handlePanelUpdate = useCallback(
		(swiper: Swiper, book: Book, currentPageIndex: number) => {
			debug &&
				console.log(
					`displayImage is now ${
						book.getCurrentPage(swiper.realIndex).displayImage
					} panel ${panelIdxRefs.current[currentPageIndex]}`
				);
			swiper.allowSlidePrev = false;
		},
		[debug]
	);

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

	const handleOnNavigationNext = useCallback(
		(swiper: Swiper, { book }: { book: Book }) => {
			if (!isValidPage(book, swiper.activeIndex)) return;

			const { currentPage, currentPageIndex } = getPageInfo(
				book,
				swiper.activeIndex
			);
			if (!swiper.allowSlideNext) {
				const currentPanelIndex = panelIdxRefs.current[currentPageIndex];
				// Ensure the panel index doesn't exceed the length of the panels array
				if (currentPanelIndex < currentPage.panels.length - 1) {
					panelIdxRefs.current[currentPageIndex] =
						currentPage.goToNextPanel(currentPanelIndex);
					handlePanelUpdate(swiper, book, currentPageIndex);
				}
			}
			swiper.allowSlideNext = shouldAllowSlideNext(
				swiper,
				book.getPages(),
				panelIdxRefs.current
			);
		},
		[getPageInfo, handlePanelUpdate]
	);

	const handleOnNavigationPrev = useCallback(
		(swiper: Swiper, { book }: { book: Book }) => {
			const { currentPage, currentPageIndex } = getPageInfo(
				book,
				swiper.activeIndex
			);
			let currentPanelIndex = panelIdxRefs.current[currentPageIndex];

			if (!swiper.allowSlidePrev) {
				// If the current panel index is not the whole page index, go to previous panel
				if (currentPanelIndex > wholePageIndex) {
					panelIdxRefs.current[currentPageIndex] =
						currentPage.goToPrevPanel(currentPanelIndex);
					handlePanelUpdate(swiper, book, currentPageIndex);
					currentPanelIndex = panelIdxRefs.current[currentPageIndex];
				}
			}

			swiper.allowSlidePrev = shouldAllowSlidePrev(
				swiper,
				book.getPages(),
				panelIdxRefs.current
			);
		},
		[getPageInfo, handlePanelUpdate]
	);

	const handleOnSwiperMove = useCallback(
		(swiper: Swiper, { book }: { book: Book }) => {
			//sometimes swiper.swipeDirection is undefined so we can determine a dir this way
			// const dir =
			//   swiper.realIndex > swiper.previousIndex ||
			//   swiper.previousIndex === undefined
			//     ? "next"
			//     : "prev";
			// debug && console.log(`handleOnSwiperMove ${dir}`);
		},
		[]
	);

	return {
		canvasRefs,
		panelIdxRefs,
		psychoClient,
		swiperRef,
		handleOnSlideChangeEnd,
		handleOnNavigationNext,
		handleOnNavigationPrev,
		handleOnSwiperMove,
	};
};
