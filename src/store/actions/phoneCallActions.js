// Actions used in a good maaner. Proper error handling. Code clarity is very good.

import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase.js";

export const fetchData = () => (dispatch) => {
  dispatch({ type: "FETCH_CALL_LOGS_PENDING" });

  try {
    const callLogsRef = collection(db, "callLogs");

    const unsubscribe = onSnapshot(callLogsRef, (snapshot) => {
      const logs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({
        type: "FETCH_CALL_LOGS_SUCCESS",
        payload: logs,
      });
    });

    return unsubscribe;
  } catch (error) {
    dispatch({
      type: "FETCH_CALL_LOGS_ERROR",
      error: error.message || "An error occurred while fetching call logs",
    });
  }
};

export const handlePhoneCall = (item, onSuccess) => async (dispatch) => {
  try {
    const docRef = doc(collection(db, "callLogs"));
    const docId = docRef?.id;
    const payload = {
      createdAt: new Date(),
      number: item,
      id: docId,
    };
    await setDoc(docRef, payload);

    dispatch({
      type: "START_PHONE_CALL",
      payload,
    });
    onSuccess();
  } catch (err) {
    console.error(err.message || "An error occured while making the call");
  }
};

export const handleDelCall = (id) => async (dispatch) => {
  try {
    const docRef = doc(db, "callLogs", id);
    await deleteDoc(docRef);

    dispatch({
      type: "REMOVE_CALL_LOG_SUCCESS",
      payload: id,
    });
  } catch (err) {
    console.error(
      err.message || "An error occurred while deleting the call log"
    );
  }
};
