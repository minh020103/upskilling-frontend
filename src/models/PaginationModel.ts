export interface Pagination {
    totalPages: number;
    totalElements: number;
    size: number
}
export type PageImpl<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number
}