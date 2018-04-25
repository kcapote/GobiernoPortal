import { Categories } from './categories.interface';
import { SrvRecord } from 'dns';

export interface Manual {
    _id?: string; 
    name: string;
    description: string;
    category: string;
    version: string;
    linkFile?: string;
    idFile?: string;

} 