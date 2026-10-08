import React from "react";
export default class ErrorBoundary
  extends React.Component {
state = {hasError: false,message: "",};
static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message:error.message ||"Unexpected application error.",};}
componentDidCatch(error,info) {
    console.error("CampusCare error:",
      error,
      info
    );
  }
render() {
   if (this.state.hasError) {
     return (
        <div className="state-box error">
          <h1>CampusCare could not display this section.</h1>
          <p>{this.state.message}</p>
          <button className="button"
            onClick={() => window.location.reload()}>Reload </button>
            </div>);}
return this.props.children;
  }
}