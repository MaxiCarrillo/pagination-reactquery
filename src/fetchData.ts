export type Feature = {
    id: string;
    name: string;
    icon: string;
}

export async function fetchFeatures(options: { pageIndex: number, pageSize: number }) {
    const response = await fetch(`http://localhost:8080/api/features?page=${options.pageIndex}&size=${options.pageSize}`)
    const data = await response.json()
    return {
        data: data.data,
        pageCount: data.totalPages,
        rowCount: data.totalElements
    }
}