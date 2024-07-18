import type React from "react";
import SelectsStyles from '../styles/selects.module.scss'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useAppDispatch } from "../app/hooks";
import type { libSelectType } from "../app/types/commonTypes";
import { type ActionCreatorWithPayload } from "@reduxjs/toolkit";


const animatedComponents = makeAnimated();


interface IProps {
    options: Array<{ id: string, name: string }>
    handler: ActionCreatorWithPayload<libSelectType>
    isMulti: boolean
    isSearchable: boolean
}


export const FilterSelect: React.FC<IProps> = props => {
    const dispatch = useAppDispatch()
    const options = props.options.map(item => ({ value: item.id, label: item.name }))
    let wrapperStyles = SelectsStyles.wrapper
    if (options.length === 0) wrapperStyles += " " + SelectsStyles.hidden

    return <div className={wrapperStyles}>
        <p className={SelectsStyles.title}></p>
        <Select
            components={animatedComponents}
            isSearchable={props.isSearchable}
            onChange={e => dispatch(props.handler(e as libSelectType))}
            isMulti={props.isMulti}
            options={options}
            placeholder=""
        />
    </div>
}