import axios, { type AxiosInstance } from "axios";
import { URLs } from "./config";
import Cookies from 'js-cookie';

class SignUpAPI {
    instance: AxiosInstance;

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        })

        this.getCSRFToken()
    }

    async getCSRFToken() {
        const response = await this.instance.get(URLs.csrfToken, { withCredentials: true })
        Cookies.set('csrftoken', response.data.token)
        return response.data.token
    }

    async getCategories(persons: Array<string>) {
        const response = await this.instance.post(URLs.filters.categories,
            JSON.stringify({ persons }),
            { withCredentials: true })
        return response.data
    }

    async getServices(persons: Array<string>, categories: Array<string>) {
        const response = await this.instance.post(URLs.filters.services,
            JSON.stringify({ persons, categories }),
            { withCredentials: true })
        return response.data
    }
}

export const filtersApi = new SignUpAPI(URLs.base)