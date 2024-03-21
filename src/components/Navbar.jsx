import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import cn from "classnames";
import style from "./Styles/Navbar.module.sass";
import Button from "./Button";

const Navbar = ({ container }) => {
    const [searchModalShow, setSearchModalShow] = useState(false);
    const [hotKey, setHotKey] = useState([]);

    const toggleSearch = () => {
        setSearchModalShow((cur) => !cur);
    };

    const handleKeyPress = (e) => {
        console.log(e);
    };

    useEffect(() => {
        document.onkeydown = (e) => {
            const key = e.key.toLowerCase();
            if (key == "escape") {
                e.preventDefault();
                setSearchModalShow(false);
            }
            if (key === "control" || key == "k") e.preventDefault();
            setHotKey((cur) => (key == "control" ? [key] : key == "k" ? [...cur, key] : [...cur]));
        };

        document.onkeyup = () => {
            setHotKey([]);
        };
    }, []);

    useEffect(() => {
        const [hot, key] = hotKey;
        if (hot == "control" && key == "k") setSearchModalShow(1);
    }, [hotKey]);

    return (
        <nav className={cn(style.nav)}>
            <div className={cn({ container: container })}>
                <Button text="search" onClick={toggleSearch}>
                    <span className="tag ml-1">ctrl</span> <span className="tag">K</span>
                </Button>
            </div>
            {searchModalShow && <Search focused outerOnCLick={() => setSearchModalShow(false)} />}
        </nav>
    );
};

export default Navbar;
