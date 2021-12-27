import { useState } from "react";
import axios from "axios";

const baseUrl = process.env.baseUrl || "http://localhost:3333";
const initialValues = {
    username: "",
    password: "",
};

const Login = () => {
    const [formValues, setFormValues] = useState(initialValues);

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
            console.log(response);
        } catch (err) {
            console.log(err);
        }
        setFormValues(initialValues);
    };

    return (
        <div>
            <label>Login</label>
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

export default Login;
