import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import { connect } from "react-redux";
import { click } from "../actions";
import { useHistory } from "react-router-dom";
import moogle from "../imgs/moogle.jpg";

const Header = ({ click }) => {
    const token = localStorage.getItem("token");
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
    };

    const handleClick = () => {
        click();
        history.push("/");
    };

    return (
        <div className="header">
            <div className="header__logo-title">
                <img className="header__logo" src={moogle} alt="moogle" />
                <h1 className="header__title" onClick={handleClick}>
                    Moghead
                </h1>
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
                            Login
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

export default connect(null, { click })(Header);
