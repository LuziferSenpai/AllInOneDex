import React, {useEffect, useState} from "react"
import {Helmet} from "react-helmet"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGenderless, faMars, faRedo, faVenus} from "@fortawesome/free-solid-svg-icons"
import {useFirebase} from "../contexts/FirebaseContext"
import {database} from "../firebase"
import Navbar from "./Navbar"

const genderlist = {
    "-1": "genderless",
    "0": "male",
    "8": "female"
}

const ignorelist = {
    "pikachu-rock-star": true,
    "pikachu-belle": true,
    "pikachu-pop-star": true,
    "pikachu-phd": true,
    "pikachu-libre": true,
    "pikachu-cosplay": true,
    "pichu-spiky-eared": true,
    "castform-sunny": true,
    "castform-rainy": true,
    "castform-snowy": true,
    "kyogre-primal": true,
    "groudon-primal": true,
    "mothim-sandy": true,
    "mothim-trash": true,
    "eevee": true,
    "giratina-origin": true,
    "calyrex-shadow-rider": true,
    "calyrex-ice-rider": true,
    "zarude-dada": true,
    "eternatus-eternamax": true,
    "zamazenta-crowned": true,
    "zacian-crowned": true,
    "kyurem-black": true,
    "kyurem-white": true,
    "meloetta-pirouette": true,
    "genesect-douse": true,
    "genesect-shock": true,
    "genesect-burn": true,
    "genesect-chill": true,
    "greninja-battle-bond": true,
    "greninja-ash": true,
    "floette-eternal": true,
    "aegislash-blade": true,
    "rockruff-own-tempo": true,
    "wishiwashi-school": true,
    "mimikyu-busted": true,
    "necrozma-dusk": true,
    "necrozma-dawn": true,
    "necrozma-ultra": true,
}

const ignorelistforms = {
    "arceus": true,
    "scatterbug": true,
    "spewpa": true,
    "furfrou": true,
    "silvally": true,
}

const pokemonfunc = ({pokedex, home, dbhome, species_name, species, pokemon, index}) => {
    if (pokemon.sprites.front_female) {
        getforms({
            pokedex,
            pokemon,
            gender: "female",
            number: species.id + (index / 100) + 0.001,
            species_name,
            home,
            dbhome
        })

        getforms({
            pokedex,
            pokemon,
            gender: "male",
            number: species.id + (index / 100) + 0.002,
            species_name,
            home,
            dbhome
        })
    } else {
        const gender = genderlist[`${species.gender_rate}`] || "both"

        getforms({
            pokedex,
            pokemon,
            gender,
            number: species.id + (index / 100),
            species_name,
            home,
            dbhome
        })
    }
}

const speciesfunc = ({home, pokedex, dbhome, e, species}) => {
    const delang = species.names.find(lang => lang.language.name === "de")
    const species_name = delang?.name || e.pokemon_species.name

    for (const [index, el] of species.varieties.entries()) {
        if (!el.pokemon.name.includes("-mega") && !el.pokemon.name.includes("-meteor") && !el.pokemon.name.includes("-totem") && !ignorelist[el.pokemon.name]) {
            // pokedex.getPokemonByName(el.pokemon.name)
            //     .then(pokemon => pokemonfunc({pokedex, home, dbhome, species_name, species, pokemon, index}))
            //     .catch(err => {
            //         console.error(err)

                    pokedex.resource(`https://staging.pokeapi.co/api/v2/pokemon/${el.pokemon.name}`)
                        .then(pokemon => pokemonfunc({pokedex, home, dbhome, species_name, species, pokemon, index}))
                        .catch(err => console.error(err))
                // })
        }
    }
}


const getforms = ({pokedex, pokemon, gender, number, species_name, home, dbhome}) => {
    if (pokemon.forms.length > 1 && !ignorelistforms[pokemon.name]) {
        for (const [index, e] of pokemon.forms.entries()) {
            if (!ignorelist[e.name]) {
                // pokedex.getPokemonFormByName(e.name)
                //     .then(form => {
                //         if (!form.is_battle_only && !home.find(pokemon => pokemon.name === form.name)) {
                //             dbhome.add({
                //                 number: number + (index / 10000),
                //                 name: form.name,
                //                 species_name,
                //                 gender,
                //                 sprite: form.sprites.front_default,
                //                 caught: false
                //             })
                //         }
                //     })
                //     .catch(err => {
                //         console.error(err)

                        pokedex.resource(`https://staging.pokeapi.co/api/v2/pokemon-form/${e.name}`)
                            .then(form => {
                                if (!form.is_battle_only && !home.find(pokemon => pokemon.name === form.name)) {
                                    dbhome.add({
                                        number: number + (index / 10000),
                                        name: form.name,
                                        species_name,
                                        gender,
                                        sprite: form.sprites.front_default,
                                        caught: false
                                    })
                                }
                            })
                            .catch(err => console.error(err))
                    // })
            }
        }
    } else if (!home.find(pokemonh => pokemonh.name === pokemon.name)) {
        dbhome.add({
            number,
            name: pokemon.name,
            species_name,
            gender,
            sprite: gender === "female" ? pokemon.sprites.front_female ? pokemon.sprites.front_female : pokemon.sprites.front_default : pokemon.sprites.front_default,
            caught: false
        })
    }
}

const getGender = gender => {
    switch (gender) {
        case "genderless":
            return <FontAwesomeIcon className="gendersprite" style={{color: "grey"}} icon={faGenderless} />
        case "female":
            return <FontAwesomeIcon className="gendersprite" style={{color: "purple"}} icon={faVenus} />
        case "male":
            return <FontAwesomeIcon className="gendersprite" style={{color: "blue"}} icon={faMars} />
        default:
            return <>
                <FontAwesomeIcon className="gendersprite" style={{color: "purple"}} icon={faVenus} />
                {" "}
                <FontAwesomeIcon className="gendersprite" style={{color: "blue"}} icon={faMars} />
            </>
    }
}

export default function Home() {
    const {home, pokedex} = useFirebase()
    const [splitArray, setSplitArray] = useState([])
    const [boxIndex, setBoxIndex] = useState(0)

    async function redo() {
        const dbhome = database.home
        
        // pokedex.getPokedexByName("national")
        pokedex.resource("https://staging.pokeapi.co/api/v2/pokedex/national")
            .then(national => {
                for (const e of national.pokemon_entries) {
                    // pokedex.getPokemonSpeciesByName(e.pokemon_species.name)
                    //     .then(species => speciesfunc({e, species, pokedex, home, dbhome}))
                    //     .catch(err => {
                    //         console.error(err)

                            pokedex.resource(`https://staging.pokeapi.co/api/v2/pokemon-species/${e.pokemon_species.name}`)
                                .then(species => speciesfunc({e, species, pokedex, home, dbhome}))
                                .catch(err => console.error(err))
                        // })
                }
            })
            .catch(err => console.log(err))
    }

    async function update(obj) {
        const {e, id, caught} = obj

        e.preventDefault()

        await database.home.doc(id).update({
            caught: !caught
        })
    }

    useEffect(() => {
        if (home.length === 0) return

        setSplitArray(home.reduce((result, entry, index) => {
            const chunkIndex = Math.floor(index / 30)

            if (result[chunkIndex]) {
                result[chunkIndex] = [...result[chunkIndex], entry]
            } else {
                result[chunkIndex] = [entry]
            }

            return result
        }, []))
    }, [home])

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Navbar />
            <div className="container">
                <div className="header">
                    <h2 className="title">Home Boxes</h2>
                    <h2 className="title">
                        Caught:
                        {" "}
                        {home.filter(poke => poke.caught === true).length}
                        {" "}
                        /
                        {" "}
                        {home.length}
                    </h2>
                    <button className="redo" onClick={redo}>
                        <FontAwesomeIcon icon={faRedo} />
                    </button>
                </div>
                <div className="content">
                    {home.length > 0 && (
                        <>
                            <button
                                className="arrow-container"
                                disabled={boxIndex === 0}
                                onClick={() => setBoxIndex(index => index - 1)}
                            >
                                <span className="pic arrow-left"></span>
                            </button>
                            <div className="innercontent">
                                <h2 className="title" style={{paddingBottom: "1rem"}}>
                                    Box: {boxIndex + 1}
                                </h2>
                                <div className="grid">
                                    {splitArray[boxIndex]?.length > 0 && splitArray[boxIndex].map(pokemon => (
                                        <button
                                            className="pokecontainer"
                                            key={pokemon.number}
                                            onClick={e => update({e, id: pokemon.id, caught: pokemon.caught})}
                                        >
                                            <img
                                                className="pokesprite"
                                                src={pokemon.sprite}
                                                alt=""
                                                caught={`${pokemon.caught}`}
                                                name={pokemon.name}
                                            />
                                            <div role="tooltip">
                                                <p className="tooltiptitle">
                                                    {pokemon.species_name}
                                                </p>
                                                <div style={{width: "7.5rem"}}>
                                                    {getGender(pokemon.gender)}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                className="arrow-container"
                                disabled={boxIndex === (splitArray.length - 1)}
                                onClick={() => setBoxIndex(index => index + 1)}
                            >
                                <span className="pic arrow-right"></span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}