const initialState = {
  callData: [],
  loading: false,
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

    case "START_PHONE_CALL":
      return { ...state, callData: [action?.payload, ...state.callData] };

    case "REMOVE_CALL_LOG_SUCCESS":
      return {
        ...state,
        callData: state?.callData?.filter((log) => log?.id !== action?.payload),
      };

    default:
      return state;
  }
};
