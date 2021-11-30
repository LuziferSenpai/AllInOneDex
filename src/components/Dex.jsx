import React, {useEffect, useReducer} from "react"
import {Helmet} from "react-helmet"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faRedo} from "@fortawesome/free-solid-svg-icons"
import {useFirebase} from "../contexts/FirebaseContext"
import {database} from "../firebase"
import Reducer from "../reducer"
import Navbar from "./Navbar"

export default function Dex({name, dexname, dexid, caught, customrule = false, customnumber = 0, secondcaught = {}, games}) {
    const {home, pokedex} = useFirebase()
    const [tempDex, setTempDex] = useReducer(Reducer, [])

    async function redo() {
        const tempdex = await pokedex.getPokedexByName(dexid)

        for (const e of tempdex.pokemon_entries) {
            if (!tempDex.find(pokemon => pokemon.name === e.pokemon_species.name)) {
                const species = await pokedex.getPokemonSpeciesByName(e.pokemon_species.name)
                const pokemon = await pokedex.getPokemonByName(species.varieties[0].pokemon.name)
                const delang = species.names.find(lang => lang.language.name === "de")

                await database[dexname].add({
                    number: e.entry_number,
                    name: delang?.name || e.pokemon_species.name,
                    sprite: pokemon.sprites.front_default,
                    caught: customrule ? e.entry_number < customnumber ? caught : secondcaught : caught
                })
            }
        }
    }

    async function update({e, game, id}) {
        database[dexname].doc(id).update({
            [`caught.${game}`]: e.target.checked
        })
    }

    useEffect(() => {
        const unsubscribe = database[dexname].onSnapshot(snapshot => snapshot.docChanges().forEach(change => setTempDex({type: change.type, payload: {id: change.doc.id, data: change.doc.data()}})))

        return unsubscribe
    }, [dexname])

    return (
        <>
            <Helmet>
                <title>{name}</title>
            </Helmet>
            <Navbar />
            <div className="container">
                <div className="header">
                    <h2 className="title">{name} Dex</h2>
                    <button className="redo" onClick={redo}>
                        <FontAwesomeIcon icon={faRedo} />
                    </button>
                </div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Sprite</th>
                                <th>Name</th>
                                {games.map(game => (
                                    <th key={game}>{game}</th>
                                ))}
                                <th>Home</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tempDex.map(pokemon => (
                                <tr key={pokemon.name}>
                                    <td>
                                        <p>
                                            {pokemon.number.toString().padStart(3, "0")}
                                        </p>
                                    </td>
                                    <td>
                                        <img className="tablesprite" src={pokemon.sprite} alt=""/>
                                    </td>
                                    <td>
                                        <p>
                                            {pokemon.name}
                                        </p>
                                    </td>
                                    {games.map(game => (
                                        <td key={game}>
                                            {(pokemon.caught.hasOwnProperty(game) && (
                                                <input
                                                    className="pokeinput"
                                                    type="checkbox"
                                                    defaultChecked={pokemon.caught[game]}
                                                    onChange={e => update({e, game, id: pokemon.id})}
                                                />))
                                                || (<p>-</p>)
                                            }
                                        </td>
                                    ))}
                                    <td>
                                        <div className="pokecaught" caught={`${home.find(poke => poke.species_name === pokemon.name)?.caught || false}`}></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}