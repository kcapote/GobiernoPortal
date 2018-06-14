import { Categories } from './categories.interface';


export interface Manual {
    _id?: string; 
    name: string;
    description: string;
    category: any;
    linkFile?: string;
    file?: any;
    __v: number;
    version: number;


} 