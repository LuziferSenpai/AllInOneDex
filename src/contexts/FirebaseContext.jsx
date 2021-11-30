import React, {useContext, useEffect, useReducer} from "react"
import {database} from "../firebase"
import Reducer from "../reducer"

const Pokedex = require("pokeapi-js-wrapper")
const FirebaseContext = React.createContext()

export function useFirebase() {
    return useContext(FirebaseContext)
}

export function FirebaseProvider({children}) {
    const [home, dispatchHome] = useReducer(Reducer, [])
    const value = {
        home,
        pokedex: new Pokedex.Pokedex({cache: false})
    }

    useEffect(() => {
        const unsubscribe = database.home.onSnapshot(snapshot => snapshot.docChanges().forEach(change => dispatchHome({type: change.type, payload: {id: change.doc.id, data: change.doc.data()}})))

        return unsubscribe
    }, [])

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}