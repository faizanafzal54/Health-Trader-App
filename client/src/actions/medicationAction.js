import {
  createMedication,
  getMedications,
} from "../components/medications/medicationService";
import { toastify } from "./userActions";

export const createMedicationAction = (obj) => async (dispatch) => {
  try {
    const res = await createMedication(obj);
    if (res.status === 201) {
      dispatch({
        type: "CloseCreateMedicationModal",
      });
      dispatch({
        type: "PushMedications",
        payload: res.data.data.medication,
      });
      toastify("success", "Medication has been added");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getMedicationsAction = (userId) => async (dispatch) => {
  try {
    const res = await getMedications(userId);
    if (res.status === 200) {
      dispatch({
        type: "SetMedications",
        payload: res.data.data.medications,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const createMedicationModalAction = (boolean) => (dispatch) => {
  if (boolean) {
    dispatch({
      type: "OpenCreateMedicationModal",
    });
  } else {
    dispatch({
      type: "CloseCreateMedicationModal",
    });
  }
};
