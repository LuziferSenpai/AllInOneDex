import React from "react";
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import {FirebaseProvider} from "./contexts/FirebaseContext"
import Home from "./components/Home"
import Dex from "./components/Dex"
import "./style.css"

function App() {
    return (
        <Router forceRefresh={true}>
            <FirebaseProvider>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/kanto">
                        <Dex
                            name="Kanto"
                            dexname="kanto"
                            dexid={2}
                            caught= {{
                                Rot: false,
                                Blau: false,
                                Gelb: false,
                                Feuerrot: false,
                                Blattgrün: false,
                                "Let’s Go, Evoli!": true,
                                "Let’s Go, Pikachu!": false
                            }}
                            games={[
                                "Rot",
                                "Blau",
                                "Gelb",
                                "Feuerrot",
                                "Blattgrün",
                                "Let’s Go, Evoli!",
                                "Let’s Go, Pikachu!",
                            ]}
                        />
                    </Route>
                    <Route exact path="/johto">
                        <Dex
                            name="Johto"
                            dexname="johto"
                            dexid={3}
                            caught= {{
                                Gold: false,
                                Silber: false,
                                Kristall: false
                            }}
                            games={[
                                "Gold",
                                "Silber",
                                "Kristall"
                            ]}
                        />
                    </Route>
                    <Route exact path="/johto-akt">
                        <Dex
                            name="Johto"
                            dexname="johto-akt"
                            dexid={7}
                            caught= {{
                                HeartGold: false,
                                SoulSilver: false
                            }}
                            games={[
                                "HeartGold",
                                "SoulSilver"
                            ]}
                        />
                    </Route>
                    <Route exact path="/hoenn">
                        <Dex
                            name="Hoenn"
                            dexname="hoenn"
                            dexid={4}
                            caught= {{
                                Rubin: false,
                                Saphir: false,
                                Smaragd: false
                            }}
                            games={[
                                "Rubin",
                                "Saphir",
                                "Smaragd"
                            ]}
                        />
                    </Route>
                    <Route exact path="/hoenn-akt">
                        <Dex
                            name="Hoenn"
                            dexname="hoenn-akt"
                            dexid={15}
                            caught={{
                                "Omega Rubin": false,
                                "Alpha Saphir": false
                            }}
                            games={[
                                "Omega Rubin",
                                "Alpha Saphir"
                            ]}
                        />
                    </Route>
                    <Route exact path="/sinnoh">
                        <Dex
                            name="Sinnoh"
                            dexname="sinnoh"
                            dexid={6}
                            caught= {{
                                Perl: false,
                                Diamant: false,
                                Platin: false
                            }}
                            customrule={true}
                            customnumber={152}
                            secondcaught={{Platin: false}}
                            games={[
                                "Perl",
                                "Diamant",
                                "Platin"
                            ]}
                        />
                    </Route>
                    <Route exact path="/einall">
                        <Dex
                            name="Einall"
                            dexname="einall"
                            dexid={8}
                            caught= {{
                                Schwarz: false,
                                Weiß: false
                            }}
                            games={[
                                "Schwarz",
                                "Weiß"
                            ]}
                        />
                    </Route>
                    <Route exact path="/einall-akt">
                        <Dex
                            name="Einall"
                            dexname="einall-akt"
                            dexid={9}
                            caught= {{
                                "Schwarz 2": false,
                                "Weiß 2": false
                            }}
                            games={[
                                "Schwarz 2",
                                "Weiß 2"
                            ]}
                        />
                    </Route>
                    <Route exact path="/kalos-zentral">
                        <Dex
                            name="Kalos Zentral"
                            dexname="kalos-zentral"
                            dexid={12}
                            caught= {{
                                X: false,
                                Y: false
                            }}
                            games={[
                                "X",
                                "Y"
                            ]}
                        />
                    </Route>
                    <Route exact path="/kalos-kuesten">
                        <Dex
                            name="Kalos Küste"
                            dexname="kalos-kueste"
                            dexid={13}
                            caught= {{
                                X: false,
                                Y: false
                            }}
                            games={[
                                "X",
                                "Y"
                            ]}
                        />
                    </Route>
                    <Route exact path="/kalos-gebirgs">
                        <Dex
                            name="Kalos Gebirgs"
                            dexname="kalos-gebirgs"
                            dexid={14}
                            caught= {{
                                X: false,
                                Y: false
                            }}
                            games={[
                                "X",
                                "Y"
                            ]}
                        />
                    </Route>
                    <Route exact path="/alola">
                        <Dex
                            name="Alola"
                            dexname="alola"
                            dexid={16}
                            caught= {{
                                Sonne: false,
                                Mond: false
                            }}
                            games={[
                                "Sonne",
                                "Mond"
                            ]}
                        />
                    </Route>
                    <Route exact path="/alola-akt">
                        <Dex
                            name="Alola"
                            dexname="alola-akt"
                            dexid={21}
                            caught= {{
                                Ultrasonne: false,
                                Ultramond: false
                            }}
                            games={[
                                "Ultrasonne",
                                "Ultramond"
                            ]}
                        />
                    </Route>
                    <Redirect to="/home" />
                </Switch>
            </FirebaseProvider>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))