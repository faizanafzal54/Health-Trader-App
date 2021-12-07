const defaultState = {
  isCreateMedicationOpen: false,
  medications: [],
};

const medicationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OpenCreateMedicationModal":
      return {
        ...state,
        isCreateMedicationOpen: true,
      };
    case "CloseCreateMedicationModal":
      return {
        ...state,
        isCreateMedicationOpen: false,
      };
    case "PushMedications":
      return {
        ...state,
        medications: [...state.medications, action.payload],
      };
    case "SetMedications":
      return {
        ...state,
        medications: action.payload,
      };
    default:
      return state;
  }
};

export default medicationReducer;
