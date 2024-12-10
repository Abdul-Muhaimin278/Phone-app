const initialState = {
  callData: [],
  loading: false,
  pulsing: false,
};

// Properly handled state
// Unnecessary use of callActice

export const handleCallAppData = (state = initialState, action) => {
  switch (action?.type) {
    case "FETCH_CALL_LOGS_PENDING":
      return { ...state, loading: true };

    case "FETCH_CALL_LOGS_SUCCESS":
      return { ...state, callData: action?.payload, loading: false };

    case "FETCH_CALL_LOGS_ERROR":
      return { ...state, loading: false };

    case "FIREBASE_SAVE_PENDING":
      return { ...state, pulsing: true };

    case "FIREBASE_SAVE_SUCCESS":
      return {
        ...state,
        callData: [action?.payload, ...state.callData],
        pulsing: false,
      };

    case "FIREBASE_SAVE_ERROR":
      return { ...state, pulsing: false };

    case "REMOVE_CALL_LOG_SUCCESS":
      return {
        ...state,
        callData: state?.callData?.filter((log) => log?.id !== action?.payload),
      };

    default:
      return state;
  }
};
