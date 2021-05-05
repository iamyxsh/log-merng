import { BrowserRouter, Switch, Route } from "react-router-dom"
import HomePage from "./components/HomePage/HomePage"
import SignIn from "./components/SignIn/SignIn"

const MainRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={SignIn} />
				<Route path="/home" exact component={HomePage} />
			</Switch>
		</BrowserRouter>
	)
}

export default MainRouter
