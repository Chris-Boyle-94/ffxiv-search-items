import { useState } from "react";

import SignUp from "./SignUp";
import Login from "./Login";

const Credentials = () => {
    const [hasAccount, setHasAccount] = useState(false);

    const handleClick = (e) => {
        setHasAccount(!hasAccount);
    };

    return (
        <div>
            {!hasAccount ? (
                <div>
                    <Login />
                    <button onClick={handleClick}>
                        Don't have an account? Sign up!
                    </button>
                </div>
            ) : (
                <div>
                    <SignUp />
                    <button onClick={handleClick}>
                        Already have an account? Login!
                    </button>
                </div>
            )}
        </div>
    );
};

export default Credentials;
