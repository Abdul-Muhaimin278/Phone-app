import { IoIosWifi } from "react-icons/io";
import arrowIcon from "../assets/icons/Arrow.svg";
import batteryIcon from "../assets/icons/battery.svg";
import { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";

// Code clarity is very good. Managed functionality in a good manner.

const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const hours = new Date().getHours() % 12 || 12;
      const minutes = new Date().getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="d-flex justify-content-center align-content-center bg-black text-white status-bar">
      <Row className="px-4 w-100 status-bar-container">
        {/* Time */}
        <Col className="d-flex align-items-center p-0 status-bar-time ">
          <span className=" status-time">{currentTime}</span>
          <img src={arrowIcon} alt="Arrow Icon" />
        </Col>

        <Col className="d-flex justify-content-end align-items-center p-0 status-bar-icon">
          <div className="status-bar-dots">....</div>
          <div className="d-flex align-items-center justify-content-center status-bar-wifi">
            <IoIosWifi />
          </div>
          <div className="status-bar-battery-container">
            <img
              className="status-bar-battery"
              src={batteryIcon}
              alt="Battery Icon"
            />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default StatusBar;
