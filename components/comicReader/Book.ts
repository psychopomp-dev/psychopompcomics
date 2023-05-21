import Page from './Page';

class Book {
	pages: Page[];
	// currentPage: number;

	constructor(pages: Page[]) {
		this.pages = pages;
	}

	nextPage(currentPage: number) {
		if (currentPage < this.pages.length - 1) return currentPage++;
	}

	hasNextPage(currentPage: number) {
		return currentPage < this.pages.length - 1;
	}

	prevPage(currentPage: number) {
		if (currentPage > 0) return currentPage--;
	}

	hasPrevPage(currentPage: number) {
		return currentPage > 0;
	}

	setPage(pageIdx: number) {
		if (this.pages[pageIdx] !== undefined) return pageIdx;
	}

	getPage(pageIdx: number) {
		if (this.pages[pageIdx] === undefined)
			throw new Error(`Page ${pageIdx} does not exist`);
		return this.pages[pageIdx];
	}

	getCurrentPage(pageIdx: number) {
		return this.getPage(pageIdx);
	}

	getPages() {
		return this.pages;
	}

	goToFirstPage() {
		return this.setPage(0);
	}

	goToLastPage() {
		return this.setPage(this.pages.length - 1);
	}

	goToPage(pageIdx: number) {
		return this.setPage(pageIdx);
	}

	goToStartOfPage(pageIdx: number) {
		this.setPage(pageIdx);
		return this.getCurrentPage(pageIdx).goToWholePagePanel(-1);
	}

	goToEndOfPage(pageIdx: number) {
		this.setPage(pageIdx);
		return this.getCurrentPage(pageIdx).goToLastPanel(
			this.getCurrentPage(pageIdx).panels.length
		);
	}

	goToNext(currentPage: number) {
		if (this.hasNextPage(currentPage)) {
			this.nextPage(currentPage); //set the next page in array
			return this.getCurrentPage(currentPage).goToWholePagePanel(-1); //set the panel to be the first
		}
	}

	goToPrev(currentPage: number) {
		if (this.hasPrevPage(currentPage)) {
			this.prevPage(currentPage); //set the prev page in array
			return this.getCurrentPage(currentPage).goToLastPanel(
				this.getCurrentPage(currentPage).panels.length
			); //set the panel to be the last
		}
	}
}

export default Book;
