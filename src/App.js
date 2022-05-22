import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import routes from "./routes/index.js";
import { HashRouter, useRoutes } from "react-router-dom";
import store from "./store/index";
import { Provider } from "react-redux";

const Pages = () => {
  let element = useRoutes(routes);
  return element;
};
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {<Pages />}
      </HashRouter>
    </Provider>
  );
}

export default App;
