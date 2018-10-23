//Frontend pagination helper function
export function paginate(page, pageSize, data) {
    return data ? data.slice((page-1)*pageSize, page*pageSize+1) : [];
}