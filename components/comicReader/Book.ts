import Page from './Page';

class Book {
    pages: Page[];
    currentPage: number;

    constructor(pages: Page[]) {
        this.pages = pages;
        this.currentPage = 0;
    }

    nextPage() {
        if (this.currentPage < this.pages.length - 1) this.currentPage++;
    }

    hasNextPage() {
        return this.currentPage < this.pages.length - 1;
    }

    prevPage() {
        if (this.currentPage > 0) this.currentPage--;
    }

    hasPrevPage() {
        return this.currentPage > 0;
    }

    setPage(pageIdx: number) {
        if (this.pages[pageIdx] !== undefined) this.currentPage = pageIdx;
    }

    getPage(pageIdx: number) {
        if (this.pages[pageIdx] === undefined) throw new Error(`Page ${pageIdx} does not exist`);
        return this.pages[pageIdx];
    }

    getCurrentPage() {
        return this.getPage(this.currentPage);
    }

    getPages() {
        return this.pages;
    }

    goToFirstPage() {
        this.setPage(0);
    }

    goToLastPage() {
        this.setPage(this.pages.length - 1);
    }

    goToPage(pageIdx: number) {
        this.setPage(pageIdx);
    }

    goToStartOfPage(pageIdx: number) {
        this.setPage(pageIdx);
        this.getCurrentPage().goToWholePagePanel();
    }

    goToEndOfPage(pageIdx: number) {
        this.setPage(pageIdx);
        this.getCurrentPage().goToLastPanel();
    }

    goToNext() {
        if (this.hasNextPage()) {
            this.nextPage(); //set the next page in array
            this.getCurrentPage().goToWholePagePanel(); //set the panel to be the first
        }
    }

    goToPrev() {
        if (this.hasPrevPage()) {
            this.prevPage(); //set the prev page in array
            this.getCurrentPage().goToLastPanel(); //set the panel to be the last
        }
    }
}

export default Book;
