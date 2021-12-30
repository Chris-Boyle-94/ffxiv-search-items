import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import moogle from "../imgs/moogle.jpg";

const Header = () => {
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
    };

    return (
        <div className="header">
            <div className="header__logo-title">
                <img className="header__logo" src={moogle} alt="moogle" />
                <h1 className="header__title">Moghead</h1>
            </div>
            <SearchForm />
            <nav className="header__container">
                <li>
                    <Link className="header__text" to="/">
                        Home
                    </Link>
                </li>
                {token ? (
                    <li>
                        <Link className="header__text" to="/favorites">
                            Favorites
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link className="header__text" to="/cred">
                            Login/Sign up
                        </Link>
                    </li>
                )}
                <li>
                    <Link className="header__text" to="/" onClick={logout}>
                        Logout
                    </Link>
                </li>
            </nav>
        </div>
    );
};

export default Header;
