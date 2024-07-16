import { API_URL, CATEGORIES_URL } from "../app/env"

interface URLsTypes {
    base: string,
    csrfToken: string
    filters: {
        categories: string
    }
}

export const URLs: URLsTypes = {
    base: API_URL,
    csrfToken: 'get_csrf_token',
    filters: {
        categories: CATEGORIES_URL
    }
}