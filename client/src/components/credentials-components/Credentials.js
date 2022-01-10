import { useState } from "react";

import SignUp from "./SignUp";
import Login from "./Login";

const Credentials = ({ account }) => {
    const [hasAccount, setHasAccount] = useState(account);

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

export default Credentials;
