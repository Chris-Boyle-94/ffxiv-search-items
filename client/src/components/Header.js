import { Link, useHistory } from "react-router-dom";
import SearchForm from "./SearchForm";
import { connect } from "react-redux";
import { click, setLoggedIn, search } from "../actions";
import moogle from "../imgs/moogle.jpg";

const Header = ({ click, setLoggedIn, isLoggedIn, search }) => {
    const history = useHistory();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        if (isLoggedIn) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
            setLoggedIn(false);
        }
    };
    const handleClick = () => {
        click(false);
        search("");
        history.push("/");
    };

    return (
        <div className="header">
            <div className="header__logo-title">
                <img
                    className="header__logo"
                    src={moogle}
                    alt="moogle"
                    onClick={handleClick}
                />
                <h1 className="header__title" onClick={handleClick}>
                    Moghead
                </h1>
            </div>
            <SearchForm />
            {isLoggedIn || token ? (
                <nav className="header__container">
                    <li>
                        <Link className="header__text" to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="header__text" to="/favorites">
                            Favorites
                        </Link>
                    </li>
                    <li>
                        <Link className="header__text" to="/" onClick={logout}>
                            Logout
                        </Link>
                    </li>
                </nav>
            ) : (
                <nav className="header__container">
                    <li>
                        <Link
                            className="header__text"
                            to="/"
                            onClick={handleClick}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="header__text" to="/login">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link className="header__text" to="/sign-up">
                            Sign up
                        </Link>
                    </li>
                </nav>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        hasAccount: state.hasAccount,
    };
};

export default connect(mapStateToProps, { click, setLoggedIn, search })(Header);
