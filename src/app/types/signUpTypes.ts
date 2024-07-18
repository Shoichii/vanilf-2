import type { selectsType, personsType } from "./commonTypes"


export type filtersAPI = {
    persons: personsType
    categories: selectsType
    services: selectsType
    masters: selectsType
}

export interface IinitialState {
    filtersInitData: filtersAPI
    categories: Array<string>
    services: Array<string>
    masters: selectsType
}