// usePsychoClient.ts
import { useEffect, useRef, useCallback } from 'react';
import { Client } from '../components/comicReader/PsychoClient';
import { IConfig } from '../components/comicReader/IConfig';
import Book from '../components/comicReader/Book';
import Page from '../components/comicReader/Page';
import Swiper from 'swiper';
import {
	getCanvasDimension,
	getDrawImagePropsFromPage,
} from '../utils/CanvasHelper';
import { Dimension } from 'components/comicReader/DimensionType';
import debounce from '../utils/debounce';

const wholePageIndex = -1;

function handleResize(
	canvas: HTMLCanvasElement,
	page: Page,
	panelIndex: number
) {
	console.log(canvas, page, panelIndex);
	// update the canvas dimensions
	canvas.width = getCanvasDimension(canvas, Dimension.Width);
	canvas.height = getCanvasDimension(canvas, Dimension.Height);
	// redraw the current panel
	let ctx: CanvasRenderingContext2D | null | undefined =
		canvas.getContext('2d');
	const comicImage = new Image();

	comicImage.onload = () => {
		if (ctx) {
			ctx.canvas.height = getCanvasDimension(canvas, Dimension.Height);
			ctx.canvas.width = getCanvasDimension(canvas, Dimension.Width);
			// ctx.canvas.style.width = current.getBoundingClientRect().width + 'px';
			// ctx.canvas.style.height = current.getBoundingClientRect().height + 'px';

			const { offsetX, offsetY, scaledWidth, scaledHeight } =
				getDrawImagePropsFromPage(page, canvas, panelIndex);

			console.log('comicImage.width', comicImage.width);
			console.log('comicImage.height', comicImage.height);
			console.log('current.height', canvas.height);
			console.log('current.height', canvas.height);

			ctx.drawImage(
				comicImage,
				offsetX,
				offsetY,
				scaledWidth, //scales the image up/down to fit the canvas
				scaledHeight //scales the image up/down to fit the canvas
			);
		}
	};

	comicImage.src = page.imageUrl;
}

export const usePsychoClient = (
	psychoReaderConfig: IConfig,
	debug: boolean
) => {
	const psychoClient = Client(psychoReaderConfig);
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
		console.log('panelIdxRefs', panelIdxRefs);
	}, [debug, psychoClient]);

	const getPageInfo = useCallback((book: Book, pageIdx: number) => {
		const currentPage = book.getCurrentPage(pageIdx);
		const currentPageIndex = book.pages.indexOf(currentPage);
		return { currentPage, currentPageIndex };
	}, []);

	useEffect(() => {
		const handleResizeEvent = () => {
			console.log('resizing');
			psychoClient.book.pages.forEach((page, index) => {
				const canvas = canvasRefs.current[index]?.current;
				const currentPanel = panelIdxRefs.current[index];

				if (canvas && typeof currentPanel === 'number') {
					handleResize(canvas, page, currentPanel);
				}
			});

			// Add the following code to adjust `allowSlideNext` and `allowSlidePrev`
			// when the window is resized:
			if (swiperRef.current) {
				const swiper = swiperRef.current;
				const { currentPage, currentPageIndex } = getPageInfo(
					psychoClient.book,
					swiper.activeIndex
				);

				swiper.allowSlideNext = currentPage.hasNextPanel(
					panelIdxRefs.current[currentPageIndex]
				)
					? false
					: psychoClient.book.hasNextPage(swiper.realIndex);

				swiper.allowSlidePrev = currentPage.hasPrevPanel(
					panelIdxRefs.current[currentPageIndex]
				)
					? false
					: psychoClient.book.hasPrevPage(swiper.realIndex);
			}
		};

		// add the event listener
		window.addEventListener('resize', debounce(handleResizeEvent, 100));

		return () => {
			// remove the event listener when the component is unmounted
			window.removeEventListener('resize', debounce(handleResizeEvent, 100));
		};
	}, [psychoClient, canvasRefs, panelIdxRefs, getPageInfo]);

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

	const handleOnNextEnd = useCallback(
		(swiper: Swiper, book: Book) => {
			const { currentPage, currentPageIndex } = getPageInfo(
				book,
				swiper.activeIndex
			);
			swiper.allowSlideNext = currentPage.hasNextPanel(
				panelIdxRefs.current[currentPageIndex]
			)
				? false
				: book.hasNextPage(swiper.realIndex);
			swiper.allowSlidePrev = book.hasPrevPage(swiper.realIndex);
		},
		[getPageInfo]
	);

	const handleOnPrevEnd = useCallback(
		(swiper: Swiper, book: Book) => {
			const { currentPage, currentPageIndex } = getPageInfo(
				book,
				swiper.activeIndex
			);
			swiper.allowSlidePrev = currentPage.hasPrevPanel(
				panelIdxRefs.current[currentPageIndex]
			)
				? false
				: book.hasPrevPage(swiper.realIndex);
			swiper.allowSlideNext = book.hasNextPage(swiper.realIndex);
		},
		[getPageInfo]
	);

	const handleOnSlideChangeEnd = useCallback(
		(swiper: Swiper, { book }: { book: Book }) => {
			swiper.realIndex > swiper.previousIndex ||
			swiper.previousIndex === undefined
				? handleOnNextEnd(swiper, book)
				: handleOnPrevEnd(swiper, book);
		},
		[handleOnNextEnd, handleOnPrevEnd]
	);

	const handleOnNavigationNext = useCallback(
		(swiper: Swiper, { book }: { book: Book }) => {
			const { currentPage, currentPageIndex } = getPageInfo(
				book,
				swiper.activeIndex
			);
			if (!swiper.allowSlideNext) {
				panelIdxRefs.current[currentPageIndex] = currentPage.goToNextPanel(
					panelIdxRefs.current[currentPageIndex]
				);
				handlePanelUpdate(swiper, book, currentPageIndex);
			}
			if (
				!swiper.allowSlideNext &&
				!currentPage.hasNextPanel(panelIdxRefs.current[currentPageIndex]) &&
				book.hasNextPage(swiper.realIndex)
			) {
				swiper.allowSlideNext = true;
			}
		},
		[getPageInfo, handlePanelUpdate]
	);

	const handleOnNavigationPrev = useCallback(
		(swiper: Swiper, { book }: { book: Book }) => {
			const { currentPage, currentPageIndex } = getPageInfo(
				book,
				swiper.activeIndex
			);
			if (!swiper.allowSlidePrev) {
				panelIdxRefs.current[currentPageIndex] = currentPage.goToPrevPanel(
					panelIdxRefs.current[currentPageIndex]
				);
				handlePanelUpdate(swiper, book, currentPageIndex);
			}
			if (
				!swiper.allowSlidePrev &&
				book.hasPrevPage(swiper.realIndex) &&
				book
					.getCurrentPage(swiper.realIndex)
					.isOnPageImage(panelIdxRefs.current[currentPageIndex])
			) {
				swiper.allowSlidePrev = true;
			}
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
