import React, { Component } from "react";
import Loader from "../loader/Loader";
import { HourglassBottom, Report } from "@mui/icons-material";

export default class OverlayLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const myClasses = {
      NULL: null,
      mainContainer: `fixed top-0 right-0 z-[9999999] flex flex-col justify-center items-center pointer-events-auto w-full h-full  top-0 left-0`,
    };
    const styles = {
      mainContainer: {
        backgroundColor: this.props.bgColor
          ? this.props.bgColor
          : "rgb(255,255,255,0.8",
      },
    };
    return (
      <div className={myClasses.mainContainer} style={styles.mainContainer}>
        {this.props.noIcon ? (
          <Loader />
        ) : (
          <Loader
            loaderColor="rgb(55,79,99)"
            loaderIcon={<HourglassBottom style={{ color: "rgb(55,79,99)" }} />}
          />
        )}
        {this.props.loaderText && (
          <span className="text-bgTrade mt-3">{this.props.loaderText}</span>
        )}
      </div>
    );
  }
}
