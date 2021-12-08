const defaultState = {
  isCreateMedicationOpen: false,
  isCreateGroupOpen: false,
  medications: [],
  groups: [],
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
    case "OpenCreateGroupModal":
      return {
        ...state,
        isCreateGroupOpen: true,
      };
    case "CloseCreateGroupModal":
      return {
        ...state,
        isCreateGroupOpen: false,
      };
    case "PushGroups":
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case "SetGroups":
      return {
        ...state,
        groups: action.payload,
      };

    default:
      return state;
  }
};

export default medicationReducer;
