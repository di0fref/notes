import Tooltip from "./Tooltip";
import {FaMoon, FaSun} from "react-icons/all";
import React, {useEffect, useState} from "react";

function ThemeSwitcher() {
    const [theme, setTheme] = useState()

    useEffect(() => {
        let toggle = document.getElementById("theme-toggle");
        let storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        if (storedTheme) {
            document.documentElement.setAttribute('data-theme', storedTheme)
        }
        setTheme(storedTheme)
        toggle.onclick = function () {
            let currentTheme = document.documentElement.getAttribute("data-theme");
            let targetTheme = "light";

            if (currentTheme === "light") {
                targetTheme = "dark";
            }
            document.documentElement.setAttribute('data-theme', targetTheme)
            localStorage.setItem('theme', targetTheme);
        };
    }, [theme])
    return (
        <button id="theme-toggle" className={"noprint"} type="button">
            <Tooltip title={"Dark theme"}>
                <span className="d-block-light d-none hover:text-hover-accent"><FaMoon/></span>
            </Tooltip>
            <Tooltip title={"Light theme"}>
                <span className="d-block-dark d-none hover:text-hover-accent"><FaSun/></span>
            </Tooltip>
        </button>
    )
}

export default ThemeSwitcher
