import { existsSync, readFileSync } from 'fs';
import { IConfig } from './IConfig';

//factory method for a getting a PsychoReaderType
//allows us to use async to build the book object
//usage: const reader: PsychoReaderType = await PsychoReader();
export default async function PsychoReaderConfig(dataSrc?: string) {
    console.log('PsychoReaderConfig');
    console.log(dataSrc)
    if (dataSrc === undefined) {
        throw Error('Environment variable PSYCHO_READER_PATH is undefined');
    }
    if (!existsSync(dataSrc)) {
        throw Error('Invalid data source path');
    }
    const config: IConfig = JSON.parse(readFileSync(dataSrc).toString());
    return config;
}
