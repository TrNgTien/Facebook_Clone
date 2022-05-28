import React from "react";
import Header from "./components/Header";
import "./Layout.scss";
function Layout(props: any) {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}

export default Layout;
