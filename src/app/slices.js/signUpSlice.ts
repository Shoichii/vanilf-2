import { type PayloadAction } from "@reduxjs/toolkit"
import type { IinitialState } from "../types/signUpTypes"
import { type RootState } from '../store'
import type { personsType } from "../types/commonTypes"
import { filtersApi } from "../../api/signUpApi"
import { createAppSlice } from "../createAppSlice"
import { persons } from "../consts"

const initialState: IinitialState = {
    persons: persons,
    categories: [],
    services: [],
    masters: [],
}

export const signUpSlice = createAppSlice({
    name: "signUp",
    initialState: initialState,
    reducers: create => ({
        setPersons: create.reducer((state, action: PayloadAction<{ name: string, value: string, checked: boolean }>) => {
            state.persons = state.persons.map(item =>
                item.value === action.payload.value
                    ? { ...item, checked: !item.checked }
                    : item)
        }),
        setCategories: create.reducer((state, action: PayloadAction<{ name: string, value: string }>) => {
            state.categories.push(action.payload)
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
                const statePersons = state.signUp.persons
                let persons: personsType = statePersons.filter(item => item.checked)
                const response = await filtersApi.getCategories(persons.map(item => item.value))
                // The value we return becomes the `fulfilled` action payload
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
        personsSelector: (state) => state.persons,
        categoriesSelector: (state) => state.categories,
        servicesSelector: (state) => state.services,
        mastersSelector: (state) => state.masters,
    }
})

export const { setPersons, getCategoriesThunk } = signUpSlice.actions

export const { personsSelector, categoriesSelector,
    servicesSelector, mastersSelector } = signUpSlice.selectors