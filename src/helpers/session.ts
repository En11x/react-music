import { localStorageFactory, DEFAULT_VALUE } from "./localStorage"
import { ILoginResult } from "apis/types/auth"


const KEY = '__session'

export const sessionLocalStorage = localStorageFactory<ILoginResult>({
    key:KEY,
    defaultValue:DEFAULT_VALUE.OBJECT
})