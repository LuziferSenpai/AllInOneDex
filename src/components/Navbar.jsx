import React from "react"
import {NavLink} from "react-router-dom"

export default function Navbar() {
    return (
        <div className="nav">
            <NavLink to="/home" activeClassName="navactive">Home</NavLink>
            <NavLink to="/kanto" activeClassName="navactive">Kanto</NavLink>
            <div className="dropdown">
                <div className="dropdownselectiontext">Johto</div>
                <div className="dropdownmenu">
                    <NavLink to="/johto" activeClassName="navactive">Gold / Silber / Kristall</NavLink>
                    <NavLink to="/johto-akt" activeClassName="navactive">Hearth Gold / Soul Silver</NavLink>
                </div>
            </div>
            <div className="dropdown">
                <div className="dropdownselectiontext">Hoenn</div>
                <div className="dropdownmenu">
                    <NavLink to="/hoenn" activeClassName="navactive">Rubin / Saphir / Smaragd</NavLink>
                    <NavLink to="/hoenn-akt" activeClassName="navactive">Omega Rubin / Alpha Saphir</NavLink>
                </div>
            </div>
            <NavLink to="/sinnoh" activeClassName="navactive">Sinnoh</NavLink>
            <div className="dropdown">
                <div className="dropdownselectiontext">Einall</div>
                <div className="dropdownmenu">
                    <NavLink to="/einall" activeClassName="navactive">Schwarz / Weiß</NavLink>
                    <NavLink to="/einall-akt" activeClassName="navactive">Schwarz 2 / Weiß 2</NavLink>
                </div>
            </div>
            <div className="dropdown">
                <div className="dropdownselectiontext">Kalos</div>
                <div className="dropdownmenu">
                    <NavLink to="/kalos-zentral" activeClassName="navactive">Zentral</NavLink>
                    <NavLink to="/kalos-kuesten" activeClassName="navactive">Küsten</NavLink>
                    <NavLink to="/kalos-gebirgs" activeClassName="navactive">Gebirgs</NavLink>
                </div>
            </div>
            <div className="dropdown">
                <div className="dropdownselectiontext">Alola</div>
                <div className="dropdownmenu">
                    <NavLink to="/alola" activeClassName="navactive">Sonne / Mond</NavLink>
                    <NavLink to="/alola-akt" activeClassName="navactive">Ultra Sonne / Ultra Mond</NavLink>
                </div>
            </div>
            {/* <NavLink to="/galar" activeClassName="navactive">Galar</NavLink> */}
        </div>
    )
}