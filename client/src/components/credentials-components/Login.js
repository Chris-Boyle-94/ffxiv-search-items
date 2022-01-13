import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setLoggedIn } from "../../actions";

const development = "http://localhost:3333";
const production = "https://moghead.herokuapp.com";
const baseUrl =
    process.env.NODE_ENV === "production" ? production : development;
const initialValues = {
    username: "",
    password: "",
};

const Login = ({ setLoggedIn }) => {
    const [formValues, setFormValues] = useState(initialValues);
    const history = useHistory();

    const handleClick = () => {
        history.push("/sign-up");
    };

    const handleChange = (e) => {
        e.preventDefault();
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${baseUrl}/users/login`,
                formValues
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_id", response.data.user_id);
            setLoggedIn(true);
            history.push("/");
        } catch (err) {
            console.log(err);
        }
        setFormValues(initialValues);
    };

    return (
        <div className="credentials">
            <div className="credentials__forms">
                <label className="credentials__forms__label">Login</label>
                <form
                    className="credentials__forms__form"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="credentials__forms__input"
                        name="username"
                        type="text"
                        value={formValues.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    <input
                        className="credentials__forms__input"
                        name="password"
                        type="password"
                        value={formValues.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <button className="credentials__button" type="submit">
                        Submit
                    </button>
                    <button
                        name="toLogin"
                        className="credentials__button"
                        onClick={handleClick}
                    >
                        Already have an account? Sign up!
                    </button>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { setLoggedIn })(Login);
