import axios, { type AxiosInstance } from "axios";
import { URLs } from "./config";

class SignUpAPI {
    instance: AxiosInstance;

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": ''
            }
        })

        this.getCSRFToken()
    }

    async getCSRFToken() {
        const response = await this.instance.get(URLs.csrfToken, { withCredentials: true })
        this.instance.defaults.headers.common['X-CSRFToken'] = response.data.token
        return response.data.token
    }

    async getCategories(persons: Array<string>) {
        const response = await this.instance.post(URLs.filters.categories,
            JSON.stringify({ persons }),
            { withCredentials: true })
        return response.data
    }
}

export const filtersApi = new SignUpAPI(URLs.base)