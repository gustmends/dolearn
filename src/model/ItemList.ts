interface List<T> {
    data: T[];
    count: number;
    page: number;
    total: number;
    total_page: number;
    per_page: number;
}

export { List }