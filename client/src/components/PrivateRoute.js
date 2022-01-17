import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                console.log(props.location.pathname);
                if (localStorage.getItem("token")) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location.pathname },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default PrivateRoute;
