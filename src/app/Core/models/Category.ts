import { Pagination } from './Pagination';

export interface Category {
    categoryId?: number;
    name?: string;
    archive?: boolean;
}

export interface CategoryResponse {
    categories?: Category[];
    pagination?: Pagination;
}
