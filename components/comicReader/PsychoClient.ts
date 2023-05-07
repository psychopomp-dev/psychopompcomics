import Book from './Book';
import Page from './Page';
import Panel from './Panel';
import { IConfig, IPage, IPanel } from './IConfig';

export interface PsychoReaderClient {
    book: Book;
}

export function Client(config: IConfig) {
    const pages = config.pages.map((pageConfig: IPage) => {
        const panels = pageConfig.panels.map((panelConfig: IPanel) => {
            return new Panel(panelConfig);
        });
        return new Page({
            imageUrl: pageConfig.imageUrl,
            panels: panels,
            pageDimensions: {
                width: pageConfig.pageDimensions.w,
                height: pageConfig.pageDimensions.h
            }
        });
    });
    let reader: PsychoReaderClient = { book: new Book(pages) };
    return reader;
}
