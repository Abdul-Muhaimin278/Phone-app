// Actions used in a good maaner. Proper error handling. Code clarity is very good.

import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../config/firebase.js";

export const fetchData = (order, lastLog) => (dispatch) => {
  if (lastLog) {
    dispatch({ type: "LOAD_MORE_PENDING" });
  } else {
    dispatch({ type: "FETCH_CALL_LOGS_PENDING" });
  }

  try {
    const callLogsRef = collection(db, "callLogs");
    const lim = 2;
    let callLogsQuery = query(
      callLogsRef,
      orderBy("createdAt", order),
      limit(lim)
    );

    if (lastLog) {
      callLogsQuery = query(callLogsQuery, startAfter(lastLog));
    }

    const unsubscribe = onSnapshot(callLogsQuery, (snapshot) => {
      const logs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      const hasMoreLogs = snapshot.docs.length >= lim;

      if (lastLog) {
        dispatch({
          type: "LOAD_MORE_SUCCESS",
          payload: { logs, lastLog: lastVisibleDoc, hasMoreLogs },
        });
      } else {
        dispatch({
          type: "FETCH_CALL_LOGS_SUCCESS",
          payload: { logs, lastLog: lastVisibleDoc, hasMoreLogs },
        });
      }
    });

    return unsubscribe;
  } catch (error) {
    dispatch({
      type: lastLog ? "LOAD_MORE_ERROR" : "FETCH_CALL_LOGS_ERROR",
      error: error.message || "An error occurred while fetching call logs",
    });
  }
};

export const handleSavePhoneCall = (item, onSuccess) => async (dispatch) => {
  dispatch({
    type: "FIREBASE_SAVE_PENDING",
  });
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
      type: "FIREBASE_SAVE_SUCCESS",
      payload,
    });
    onSuccess();
  } catch (err) {
    console.error(err.message || "An error occured while making the call");
    dispatch({
      type: "FIREBASE_SAVE_ERROR",
    });
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
