import { Categories } from './categories.interface';


export interface Manual {
    _id?: string; 
    name: string;
    description: string;
    category: any;
    linkFile?: string;
    file?: string;
    __v: number;
    version:number;


} 