import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const baseUrl = process.env.baseUrl || "http://localhost:3333";
const initialValues = {
    username: "",
    password: "",
};

const SignUp = () => {
    const [formValues, setFormValues] = useState(initialValues);
    const history = useHistory();

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
            const signup = await axios.post(
                `${baseUrl}/users/register`,
                formValues
            );
            if (signup) {
                const login = await axios.post(
                    `${baseUrl}/users/login`,
                    formValues
                );
                localStorage.setItem("token", login.data.token);
                localStorage.setItem("user_id", login.data.user_id);
                history.push("/");
            }
        } catch (err) {
            console.log(err);
        }
        setFormValues(initialValues);
    };

    return (
        <div>
            <label>Sign Up</label>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    type="text"
                    value={formValues.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignUp;
