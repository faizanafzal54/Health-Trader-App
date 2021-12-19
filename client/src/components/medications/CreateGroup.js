import { Modal, Box, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroupAction } from "../../actions/medicationAction";

function CreateGroup(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const medicalState = useSelector((state) => state.medication);

  const [name, setName] = useState("");


  const createHandler = async () => {
    dispatch(
      createGroupAction({
        userId: userState?.user?._id,
        name,
      })
    );
  };

  return (
    <div>
      <Modal
        className="m-4 overflow-auto"
        open={medicalState.isCreateGroupOpen}
        onClose={() => props.groupModalHander(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: "background.paper",
            maxWidth: "710px",
            margin: "0 auto",
            borderRadius: "8px",
            boxShadow: (theme) => theme.shadows[5],
          }}
        >
          <div className="card create-medication">
            <div className="title-div d-flex justify-content-between align-items-center">
              <h4>Create a Medication Group</h4>
              <button
                onClick={() => props.groupModalHander(false)}
                className="btn"
              >
                X
              </button>
            </div>
            <div className="fields">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="number-circle">1</div>
                    <span>Select Medications</span>
                  </div>
                  <div className="text">
                    <span>Select the medications you want to include.</span>
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-start">
                      {medicalState.medications
                        .filter((med) => med.group === "")
                        .map((med) => (
                          <div key={med._id}>
                            <Checkbox
                              onChange={() => console.log()}
                              className="ps-0"
                              color="success"
                            />
                            <label>{med.name}</label>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-start">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="number-circle">2</div>
                    <span>Group Info</span>
                  </div>
                  <div className="text">
                    <span>Add a name for your medication group.</span>
                  </div>
                  <div className="group mt-20">
                    <div className="app-field-div">
                      <label htmlFor="name">Group name</label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        id="name"
                      />
                    </div>
                    <div className="text-center">
                      <button onClick={createHandler} className="btn">
                        Add new Group
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateGroup;
