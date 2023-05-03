import { Edit, Person } from "@mui/icons-material";
import React from "react";
import PopUpButton from "./Button";

export default function EditProfile() {
  const profileEditor = () => {
    let ejectProfile = () => {
      let { studentInfo } = this.props;
      let properties = Object.keys(studentInfo);
      // console.log(properties)
      if (Array.isArray(properties)) {
        return properties.map((item, index) => {
          if (item === "image") {
            // this.setState({userInfoImage:convertFileToUrl(studentInfo[item])})
            return;
          } else {
            return (
              <div
                key={`pf${index}`}
                style={{ paddingLeft: 4 }}
                className="a-center height-100 width-100-cent"
              >
                <div
                  style={{ padding: 15 }}
                  className="all-center round-up elevated-blend min-height-50 height-50 min-width-50 width-50"
                >
                  <Person />
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #e6e6e6",
                    marginLeft: "5%",
                  }}
                  className="j-center margin-l-5 f-column width-100-cent"
                >
                  <span style={{ color: "#a8aeb4" }}>
                    {
                      // replaceUnderscoreWithSpace(item)
                      item
                    }
                  </span>
                  <input
                    defaultValue={studentInfo[item]}
                    onChange={(e) => {
                      this.handleOnChange(item, e.target.value);
                    }}
                    style={{
                      border: 0,
                      color: "#1e1e1e",
                      fontSize: "1.1rem",
                      width: "90%",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            );
          }
        });
      }
    };
    return (
      <div className="width-100-cent a-center padding-30 height-100-cent j-start f-column">
        <div
          style={{ border: "2px dashed #f1f1f1" }}
          className="width-80-cent curved-corners-light  height-200 min-height-200 all-center"
        >
          <div className=" width-150 height-150 min-width-150 min-height-150 position-relative">
            <input
              ref={this.imageInput}
              onChange={(e) => this.processFiles("image", e.target.files)}
              style={{ display: "none" }}
              accept={`file_extension|${
                false ? null : ".jpg, .png,.jpeg,.JPEG,.JPG"
              }`}
              type="file"
              id="files"
              name="files"
              // required={field.required?field.required:false}
              // multiple={field.multiple?field.multiple:false}
            />
            <div
              style={{ backgroundImage: `url(${this.state.userInfoImage})` }}
              className="fill-entire-page fit-bg round-up nate-grey-bg-light overflow-hidden"
            >
              {/* <img className="width-100-cent height-100-cent" src={randomImages}/> */}
            </div>
            <span
              style={{
                backgroundColor: "rgb(0,0,0,0.8)",
                padding: 2,
                borderRadius: "15px 15px 15px 15px",
              }}
              className="position-absolute width-50 height-50 min-width-50 min-height-50 cursor-pointer bottom-10 right-0 all-center nate-black-partial-bg nate-white-text round-up"
            >
              <span
                onClick={() => {
                  this.imageInput.current.click();
                }}
                style={{
                  border: "1px solid white",
                  borderRadius: "15px 15px 15px 15px",
                }}
                className="width-100-cent all-center height-100-cent round-up"
              >
                <Edit />
              </span>
            </span>
          </div>
        </div>
        <div className="width-80-cent height-100-cent y-auto margin-t-20">
          {ejectProfile()}
        </div>
        <div className="width-100-cent height-40 j-end">
          <PopUpButton
            handleClick={() => {
              this.updateData();
            }}
            disabled={!this.state.enableUpdateButton}
            buttonText="Save"
          />
        </div>
      </div>
    );
  };
  return (
    <div>
      {this.state.showPopUp ? (
        <div
          onClick={(e) => {
            this.setState({ showPopUp: !this.state.showPopUp });
          }}
          style={{ zIndex: 2 }}
          className="over-lay cursor-pointer anime-fade-in all-center"
        >
          {
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ zIndex: 2 }}
              className={` transition-all-fast nate-white-bg  pop-up-rise anime-fade-in ${
                this.props.loading
                  ? "reduce-to-nothing round-up overflow-hidden "
                  : "curved-corners overflow-hidden width-50-cent height-90-cent opacity-1"
              }`}
            >
              {this.getPopUpPage()}
            </div>
          }
        </div>
      ) : null}
    </div>
  );
}
