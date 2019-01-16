import Loadable from "react-loadable";
// import Loader from "../ui/Loader/Loader";

// const Home = Loadable({
// 	loader: () => import("../containers/Home/Home"),
// 	loading: "Loading..."
// });

const Login = Loadable({
	loader: () => import("@containers/Auth/Login/LoginForm"),
	loading: "Loading..."
});

const Register = Loadable({
	loader: () => import("@containers/Auth/Register/RegisterForm"),
	loading: "Loading..."
});

const Browse = Loadable({
	loader: () => import("@containers/Browse/Browse"),
	loading: "Loading..."
});

export { Login, Register, Browse };
