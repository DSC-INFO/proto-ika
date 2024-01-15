"use client"
import { Dispatch, SetStateAction, useCallback, useState } from "react"

export interface AppConfig {
    authority: string
    clientId: string
    metadataUrl: string
}

export type Optional<T>  = T | undefined

function loadAppConfigFromStorage() {
    const configItem = global.window?.localStorage.getItem('config')
    if (configItem) {
        const config = JSON.parse(configItem) 
        return config as AppConfig
    } else {
    return undefined
    }
}

function saveAppConfigToStorage(value : Optional<AppConfig>) {
    if (value) {
        global.window?.localStorage.setItem('config', JSON.stringify(value))
    } else {
        global.window?.localStorage.removeItem('config')
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