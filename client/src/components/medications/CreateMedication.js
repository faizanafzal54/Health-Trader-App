import { Modal, Box, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMedicationAction } from "../../actions/medicationAction";

function CreateMedication(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [rate, setRate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [medicationGroup, setMedicationGroup] = useState([]);

  const createHandler = async () => {
    dispatch(
      createMedicationAction({
        userId: userState?.user?._id,
        name,
        dose,
        rate,
        additionalInfo,
        medicationGroup,
      })
    );
  };

  return (
    <div>
      <Modal
        className="m-4 overflow-auto"
        open={props.isCreateModalOpen}
        onClose={() => props.setCreateModal(false)}
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
              <h4>Add new Medication</h4>
              <button
                onClick={() => props.setCreateModal(false)}
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
                    <span>Medication Info</span>
                  </div>
                  <div className="text">
                    <span>Add information for your new medication.</span>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="app-field-div mt-20">
                        <label htmlFor="name">Medication Name</label>
                        <input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="app-field-div mt-10">
                        <label htmlFor="dose">Dose</label>
                        <input
                          id="dose"
                          value={dose}
                          onChange={(e) => setDose(e.target.value)}
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="app-field-div mt-10">
                        <label htmlFor="rate">Rate</label>
                        <input
                          id="rate"
                          value={rate}
                          onChange={(e) => setRate(e.target.value)}
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="app-field-div mt-10">
                        <label htmlFor="additionalInfo">
                          Additional Info/Instructions
                        </label>
                        <textarea
                          id="additionalInfo"
                          value={additionalInfo}
                          onChange={(e) => setAdditionalInfo(e.target.value)}
                          className="form-control"
                          placeholder="Name"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-start">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="number-circle">2</div>
                    <span>Group & Circles</span>
                  </div>
                  <div className="text">
                    <span>Pair your medication with a group or circles.</span>
                  </div>
                  <div className="group mt-20">
                    <h4>Assign to a Group</h4>
                    <div>
                      <Checkbox
                        onChange={() => console.log()}
                        className="ps-0"
                        color="success"
                      />
                      <label>Morning Vitamins</label>
                    </div>
                  </div>
                  <div className="group mt-20">
                    <h4>Assign to a Group</h4>
                    <div>
                      <Checkbox
                        onChange={() => console.log()}
                        className="ps-0"
                        color="success"
                      />
                      <label>Morning Vitamins</label>
                    </div>
                    <div className="text-center">
                      <button onClick={createHandler} className="btn">
                        Add new Medication
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

export default CreateMedication;
