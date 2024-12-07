import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, handleDelCall } from "../store/actions/phoneCallActions";
import { Layout } from "../layout";
import { Spinner } from "reactstrap";

// Implement All | Missed tabs functionality. No need for that.
// Otherwise code clarity is very good.

const RecentLog = () => {
  const dispatch = useDispatch();
  const { callData, loading } = useSelector((state) => state?.call);
  // console.log(callData);

  const [activeFilter, setActiveFilter] = useState("All");
  const [deleting, setDeleting] = useState(null);

  const formateDate = (firestoreTimestamp) => {
    const jsDate = new Date(
      firestoreTimestamp.seconds * 1000 +
        firestoreTimestamp.nanoseconds / 1000000
    );
    const formattedDate = jsDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedDate;
  };

  const handleDeleteCallLog = (callId) => {
    setDeleting(callId);
    dispatch(handleDelCall(callId));
  };

  useEffect(() => {
    const unsubscribe = dispatch(fetchData());

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Layout>
      <section className="d-flex flex-column bg-black overflow-y-auto  text-white recents">
        <div className="mx-auto w-100 recents-container">
          <div className="d-flex align-items-center header">
            <span className="text-primary cursor-pointer edit-btn">Edit</span>
            <div className="d-flex mx-auto text-white filter-buttons">
              <button
                className={`filter px-4 ${
                  activeFilter === "All" ? "active" : "non-active"
                }`}
                onClick={() => setActiveFilter("All")}
              >
                All
              </button>
              <button
                className={`filter px-3 ${
                  activeFilter === "Missed" ? "active" : "non-active"
                }`}
                onClick={() => setActiveFilter("Missed")}
              >
                Missed
              </button>
            </div>
          </div>
          <div className="title px-3">
            <h2 className="text-white my-3">Recents</h2>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center w-100 my-5">
              <Spinner className="recent-spinner" />
            </div>
          ) : (
            callData?.map((log) => (
              <div className="call-list" key={log?.id}>
                <div className="d-flex justify-content-between align-items-center call-item">
                  <div className="d-flex flex-column text-start call-log-info">
                    <h5 className="logs-contact-name text-danger m-0">
                      {log?.number}
                    </h5>
                    <p className="call-type m-0">Phone Call Audio</p>
                  </div>
                  <div className="call-details d-flex justify-content-center align-items-center">
                    <span className="call-time">
                      {formateDate(log?.createdAt)}
                    </span>
                    <button
                      className=" delete-button cursor-pointer"
                      onClick={() => handleDeleteCallLog(log?.id)}
                    >
                      {deleting === log?.id ? (
                        <Spinner size="sm" color="danger" />
                      ) : (
                        <RiDeleteBin6Line />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
};

export default RecentLog;
