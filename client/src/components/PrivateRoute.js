import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(rest);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem("token")) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default PrivateRoute;
