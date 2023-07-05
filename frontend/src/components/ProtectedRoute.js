import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function ProtectedRoute({element: Component, ...props}) {
  return props.loggedIn ? <><Header footerRef={props.footerRef} mainRef={props.mainRef} loggedIn={props.loggedIn} userEmail={props.userEmail} handleLogin={props.handleLogin} pathName="/sign-in">Выйти</Header><Component {...props}/><Footer footerRef={props.footerRef} /></> : <Navigate to="/sign-in" replace/>;
}