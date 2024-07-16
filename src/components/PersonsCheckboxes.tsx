import type React from "react";
import { persons } from "../app/consts";
import Checkbox from "react-custom-checkbox";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PersonsStyles from '../styles/persons.module.scss'
import { setPersons, getCategoriesThunk, personsSelector } from "../app/slices.js/signUpSlice";
import { useEffect } from "react";


export const PersonsCheckboxes: React.FC = () => {
    const dispatch = useAppDispatch()
    const statePersons = useAppSelector(personsSelector)
    const selectedPersons = statePersons.filter(item => item.checked)

    useEffect(() => {
        if (selectedPersons.length !== 0) {
            dispatch(getCategoriesThunk())
        }
    }, [dispatch, statePersons, selectedPersons])

    return (
        <div className={PersonsStyles.wrapper}>
            <p className={PersonsStyles.title}>Кого записываем?</p>
            <div className={PersonsStyles.persons}>
                {persons.map((item, index) => {
                    return <Checkbox
                        key={item.name + index}
                        icon={<div className={PersonsStyles.icon}></div>}
                        name={item.value}
                        checked={item.checked}
                        onChange={() => dispatch(setPersons(item))}
                        className={PersonsStyles.checkbox}
                        labelClassName={PersonsStyles.label}
                        label={item.name}
                        borderColor="#fff"
                        borderRadius={4}
                        size={10}
                    />
                })}
            </div>
        </div>
    )
}