import { Categories } from './categories.interface';


export interface Norma {
    _id?: string; 
    name: string;
    description: string;
    category: any;
    linkFile?: string;
    idFile?: string;
    __v: number;

} 