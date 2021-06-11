import "./App.css";
import { routes } from "./routes/index";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Layout from "./container/Layout/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Switch>
            {routes.map((route, kr) => {
              return <Route key={kr} {...route}></Route>;
            })}
          </Switch>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
