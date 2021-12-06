import { createMedication } from "../components/medications/medicationService";

export const createMedicationAction = (obj) => async (dispatch) => {
  try {
    const res = await createMedication(obj);
    if (res.status === 201) {
    }
  } catch (err) {
    console.log(err);
  }
};
