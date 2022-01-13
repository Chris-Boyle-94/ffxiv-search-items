import { connect } from "react-redux";
import { setHasAccount } from "../../actions";

import SignUp from "./SignUp";
import Login from "./Login";

const Credentials = ({ account, hasAccount, setHasAccount }) => {
    if (account) {
        setHasAccount(true);
    } else {
        setHasAccount(false);
    }

    const handleClick = (e) => {
        setHasAccount(!hasAccount);
    };

    return (
        <div className="credentials">
            {hasAccount ? (
                <div>
                    <Login />
                    <button
                        className="credentials__button"
                        onClick={handleClick}
                    >
                        Don't have an account? Sign up!
                    </button>
                </div>
            ) : (
                <div>
                    <SignUp />
                    <button
                        className="credentials__button"
                        onClick={handleClick}
                    >
                        Already have an account? Login!
                    </button>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        hasAccount: state.hasAccount,
    };
};

export default connect(mapStateToProps, { setHasAccount })(Credentials);
