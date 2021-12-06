const defaultState = {
  isCreateMedicationOpen: false,
  medications: [],
};

const medicationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OpenModal":
      return {
        ...state,
        isCreateMedicationOpen: true,
      };
    case "CloseModal":
      return {
        ...state,
        isCreateMedicationOpen: false,
      };
    case "PushMedications":
      return {
        ...state,
        medications: action.payload.medications,
      };
    case "SetMedications":
      return {
        ...state,
        medications: action.payload.medications,
      };
    default:
      return state;
  }
};

export default medicationReducer;
