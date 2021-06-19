import { StrictMode } from "react";
import ReactDOM from "react-dom";
import SideBar from './components/SideBar'
import { BrowserRouter } from 'react-router-dom'
import Categories from "components/old/Categories";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <SideBar />
      {/* <StackedBar /> */}
      {/* <Categories /> */}
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
