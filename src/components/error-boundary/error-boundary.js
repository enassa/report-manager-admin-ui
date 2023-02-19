import { Error } from "@mui/icons-material";
import { React, Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    //=================== Update state so the next render will show the fallback UI. ===================
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    //=================== You can also log the error to an error reporting service ===================
  }

  render() {
    if (this.state.hasError) {
      //=================== You can render any custom fallback UI ===================
      return (
        <div className="h-full w-full flex justify-center items-center ">
          <p className=" text-3xl flex flex-col items-center">
            <Error style={{ fontSize: 50 }} className="text-red-300 text-2xl" />
            <span className="text-gray-300 text-sm">
              Error: Could not process your request
            </span>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
