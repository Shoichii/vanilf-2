import type { personsType } from "./types/commonTypes";

export const persons: personsType = [
    { name: "Муж.", value: "male", checked: false },
    { name: "Жен.", value: "female", checked: false },
    { name: "Дети", value: "child", checked: false },
]

// достаём телеграм id
export const tg = window.Telegram.WebApp
let link = window.location.href
let isTG = link.includes('tg')
let userDataArr = null
export let tg_id: string | null = null

if (isTG) {
    // если открыто с телеги
    userDataArr = link.split('#')[0]
    tg_id = userDataArr.split('=')[1]
} else {
    // если открыто с браузера
    userDataArr = link.split('=')
    if (userDataArr.length === 2) {
        // если не админ
        tg_id = userDataArr[1]
    } else if (userDataArr.length === 3) {
        // если админ
        tg_id = userDataArr[1].split('&')[0]
    }
}