import { Categories } from './categories.interface';


export interface Manual {
    _id?: string; 
    name: string;
    description: string;
    category: any;
    linkFile?: string;
    file?: {
        name: String,
        mimeType: String,
        doc: String
    };
    __v: number;
    version: number;


} 