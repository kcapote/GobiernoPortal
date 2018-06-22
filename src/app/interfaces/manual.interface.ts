import { Categories } from './categories.interface';


export interface Manual {
    _id?: string; 
    name: string;
    description: string;
    category: any;
    linkFile?: string;
    file?: {
        name: string,
        mimeType: string,
        doc: string
    };
    __v: number;
    version: number;


} 