import React from "react";
import { toastify } from "../../actions/userActions";

function UploadFiles() {
  return (
    <div className="card p-5">
      <input
        className="form-control-file"
        type="file"
        placeholder="Upload File"
      />
      <div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() =>
            toastify("warning", "Module currently under development")
          }
        >
          {" "}
          Submit
        </button>
      </div>
    </div>
  );
}

export default UploadFiles;
