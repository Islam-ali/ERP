export interface Pagination {
    current_page: number;
    last_page:    number;
    per_page:     number;
    total:        number;
    path:         string;
}