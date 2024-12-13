const initialState = {
  callData: [],
  lastLog: null,
  hasMoreLogs: true,
  loading: false,
  pulsing: false,
  loadingMore: false,
};

// Properly handled state
// Unnecessary use of callActice

export const handleCallAppData = (state = initialState, action) => {
  switch (action?.type) {
    case "LOAD_MORE_PENDING":
      return { ...state, loadingMore: true };

    case "FETCH_CALL_LOGS_PENDING":
      return { ...state, loading: true };

    case "LOAD_MORE_SUCCESS": {
      const { logs, lastLog, hasMoreLogs } = action.payload;
      return {
        ...state,
        callData: [...state.callData, ...logs],
        lastLog,
        hasMoreLogs,
        loadingMore: false,
      };
    }

    case "FETCH_CALL_LOGS_SUCCESS": {
      const { logs, lastLog, hasMoreLogs } = action.payload;
      return { ...state, callData: logs, lastLog, hasMoreLogs, loading: false };
    }

    case "LOAD_MORE_ERROR":
      return { ...state, loadingMore: false };

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
