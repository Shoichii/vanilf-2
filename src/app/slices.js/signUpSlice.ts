import { type PayloadAction } from "@reduxjs/toolkit"
import type { filtersAPI, IinitialState } from "../types/signUpTypes"
import { type RootState } from '../store'
import type { libSelectType, personsType, selectsType } from "../types/commonTypes"
import { filtersApi } from "../../api/signUpApi"
import { createAppSlice } from "../createAppSlice"
import { persons } from "../consts"


const filtersInitData: filtersAPI = {
    persons: persons,
    categories: [],
    services: [],
    masters: [],
}

const initialState: IinitialState = {
    filtersInitData: filtersInitData,
    categories: [],
    services: [],
    masters: [],
}

export const signUpSlice = createAppSlice({
    name: "signUp",
    initialState: initialState,
    reducers: create => ({
        // выбор персон
        setPersons: create.reducer((state, action: PayloadAction<{ name: string, value: string, checked: boolean }>) => {
            state.filtersInitData.persons = state.filtersInitData.persons.map(item =>
                item.value === action.payload.value
                    ? { ...item, checked: !item.checked }
                    : item)
            // очищаем весь сделанный ранее выбор
            state.categories = []
            state.services = []
            state.masters = []
            // очищаем данные фильтров
            state.filtersInitData.categories = []
            state.filtersInitData.services = []
            state.filtersInitData.masters = []
        }),
        setCategories: create.reducer((state,
            action: PayloadAction<libSelectType>) => {
            state.categories = action.payload.map(item => item.value)
        }),
        // setServices: create.reducer((state, action) => {
        //     state.services = action.payload
        // }),
        // setMasters: (state, action) => {
        //     state.masters = action.payload
        // },

        getCategoriesThunk: create.asyncThunk(
            async (_, store) => {
                const state = store.getState() as RootState
                const statePersons = state.signUp.filtersInitData.persons
                let persons: personsType = statePersons.filter(item => item.checked)
                console.log(persons.map(item => item.value))
                const response = await filtersApi.getCategories(persons.map(item => item.value))
                // The value we return becomes the `fulfilled` action payload
                return response
            },
            {
                pending: () => {
                    console.log('pending')
                },
                fulfilled: (state, action: PayloadAction<{ categories: selectsType }>) => {
                    state.filtersInitData.categories = action.payload.categories
                    console.log(action.payload.categories)
                },
                rejected: () => {
                    console.log('error')
                },
            },
        ),
        getServicesThunk: create.asyncThunk(
            async (_, store) => {
                const state = store.getState() as RootState
                const statePersons = state.signUp.filtersInitData.persons
                const stateCategories = state.signUp.categories
                let persons: personsType = statePersons.filter(item => item.checked)
                const response = await filtersApi.getServices(persons.map(item => item.value),
                    stateCategories)
                return response
            },
            {
                pending: () => {
                    console.log('pending')
                },
                fulfilled: (state, action: PayloadAction<any>) => {
                    console.log(11)
                    console.log(action.payload)
                },
                rejected: () => {
                    console.log('error')
                },
            },
        ),
    }),
    selectors: {
        personsDataSelector: (state) => state.filtersInitData.persons,
        categoriesDataSelector: (state) => state.filtersInitData.categories
    }
})

export const { setPersons, setCategories,

    getCategoriesThunk } = signUpSlice.actions

export const { personsDataSelector, categoriesDataSelector } = signUpSlice.selectors