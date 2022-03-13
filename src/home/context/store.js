import React, { useReducer } from "react";
import { rootReducer } from "./reducer";

export const Store = React.createContext();


const storeData = {
}

export function StoreProvider({children}) {
    const [state, dispatch] = useReducer(rootReducer, storeData)

    return(
        <Store.Provider value={{ state, dispatch}}>
            {children}
        </Store.Provider>
    )
}
