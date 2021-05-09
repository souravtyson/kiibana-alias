import { StrictMode } from "react";
import ReactDOM from "react-dom";
import SideBar from './components/SideBar'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
