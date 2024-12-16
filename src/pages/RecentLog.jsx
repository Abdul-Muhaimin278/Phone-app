import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, handleDelCall } from "../store/actions/phoneCallActions";
import { Button, Input, Spinner } from "reactstrap";

const RecentLog = () => {
  const dispatch = useDispatch();
  const { callData, loading, hasMoreLogs, lastLog, loadingMore } = useSelector(
    (state) => state?.call
  );

  const [deleting, setDeleting] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [orderFilter, setOrderFilter] = useState("desc");

  const formateDate = (time) => {
    const jsDate = new Date(time?.seconds * 1000 + time?.nanoseconds / 1000000);
    const formattedDate = jsDate.toLocaleTimeString("en-PK", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Karachi",
    });
    return formattedDate;
  };

  const handleDeleteCallLog = (callId) => {
    setDeleting(callId);
    dispatch(handleDelCall(callId));
  };

  const handleSortBy = (order) => {
    setOrderFilter(order);
    dispatch(fetchData(order, null));
  };

  const handleLoadMore = () => {
    dispatch(fetchData(orderFilter, lastLog));
  };

  useEffect(() => {
    const unsubscribe = dispatch(fetchData("desc", null));
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <section className="d-flex flex-column justify-content-between bg-black overflow-y-auto text-white recents">
      <div className="mx-auto w-100 recents-container">
        <div className="d-flex align-items-center justify-content-between header">
          <span className="text-primary cursor-pointer edit-btn">Edit</span>
          <div className="text-white filter-buttons">
            <button
              className={`filter px-4 ${
                activeFilter === "All" ? "active" : "non-active"
              }`}
              onClick={() => setActiveFilter("All")}
            >
              All
            </button>
            <button
              className={`filter ${
                activeFilter === "Missed" ? "active" : "non-active"
              }`}
              onClick={() => setActiveFilter("Missed")}
            >
              Missed
            </button>
          </div>
          <div>
            <Input
              bsSize="sm"
              type="select"
              className="text-bg-dark border-0"
              onChange={(e) => handleSortBy(e.target.value)}
            >
              <option disabled>Sort by</option>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Input>
          </div>
        </div>

        <div className="title px-3">
          <h2 className="text-white my-3">Recents</h2>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center w-100 spinner-container">
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
                    className="delete-button cursor-pointer"
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
      {hasMoreLogs && (
        <Button
          color="danger"
          className="mx-auto mt-3"
          onClick={handleLoadMore}
          disabled={loadingMore || loading}
        >
          {loadingMore ? <Spinner size="sm" /> : "Load More"}
        </Button>
      )}
    </section>
  );
};

export default RecentLog;
