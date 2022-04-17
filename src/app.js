import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { login, logout } from "./actions/auth";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log("uid", user.uid);
    store.dispatch(login(user.uid)); //dispatching login
    renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
  } else {
    store.dispatch(logout()); //dispatching logout
    renderApp();
    history.push("/");
  }
});

// - open public/index.html page for modification
// - open package.json file for modification of name property
// - open components/LoginPage.js to modify h1 tags to BoilerPlate and p tags to Tag line for app
// - open components/ExpenseDashboard.js component for modification and rename to Dashboard
// - open routers/AppRouters.js file to remove all these and it usage
// import AddExpensePage from "../components/AddExpensePage";
// import EditExpensePage from "../components/EditExpensePage";
// - open store/configurestore.js file and remove and its usage
// import expensesReducer from "../reducers/expenses";
// import filtersReducer from "../reducers/filters";
// - remove import { startSetExpenses } from "./actions/expenses"; and it usage
// - tests/components/ExpenseDashboard should be renamed to Dashboard and it usage should be renamed as well
// - startup dev-server and jest
// - remove the previous git respository 
// C:\react-course-projects\xpensify-app9-boilerplate>git init
// 

// - push to remote github