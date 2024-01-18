import { Dispatch, SetStateAction, useCallback, useState } from "react"
import AppConfig from "./model"
import { Optional } from "."

const appConfigKey = 'ika-auth-config'

function loadAppConfigFromStorage() {
    const configItem = window.localStorage.getItem(appConfigKey)
    if (configItem) {
        const config = JSON.parse(configItem) 
        return config as AppConfig
    } else {
        return undefined
    }
}

function saveAppConfigToStorage(value : Optional<AppConfig>) {
    if (value) {
        window.localStorage.setItem(appConfigKey, JSON.stringify(value))
    } else {
        window.localStorage.removeItem(appConfigKey)
    }
}

export default function useAppConfig(): [Optional<AppConfig>, Dispatch<SetStateAction<Optional<AppConfig>>>] {
    const [value, setValue] = useState(loadAppConfigFromStorage())
    const setValueInterceptor: Dispatch<SetStateAction<Optional<AppConfig>>> = useCallback((newValue:SetStateAction<Optional<AppConfig>>) => {
        if (newValue instanceof Function) {
            saveAppConfigToStorage((newValue as (prev:Optional<AppConfig>) => Optional<AppConfig>)(value))
        } else {
            saveAppConfigToStorage(newValue as Optional<AppConfig>)
        }
        setValue(newValue)
        
    },[value])
    return [value, setValueInterceptor]
}