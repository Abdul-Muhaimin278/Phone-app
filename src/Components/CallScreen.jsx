import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSavePhoneCall } from "../store/actions/phoneCallActions";
import { BsCameraVideoFill, BsFillMicMuteFill } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoIosKeypad } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import { RxInfoCircled } from "react-icons/rx";

const actionButtons = [
  { icon: <HiSpeakerWave />, label: "Speaker" },
  { icon: <BsCameraVideoFill />, label: "FaceTime" },
  { icon: <BsFillMicMuteFill />, label: "Mute" },
  { icon: <IoPersonAddSharp />, label: "Add" },
  { icon: <MdCallEnd />, label: "End", className: "end-call" },
  { icon: <IoIosKeypad />, label: "Keypad" },
];

const CallScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const number = location.state?.number;

  const [isPulsing, setIsPulsing] = useState(false);

  const saveCallAndNavigate = async () => {
    setIsPulsing(true);
    await dispatch(
      handleSavePhoneCall(number, () => {
        setTimeout(() => navigate("/recent"), 500);
      })
    ).then(() => setIsPulsing(false));
  };

  const handleCallEnd = () => {
    saveCallAndNavigate();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveCallAndNavigate();
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-between align-items-center mx-auto callwindow">
      <div className="d-flex flex-column align-items-center text-white w-100 call-info">
        <div className="d-flex align-self-end callwindow-icon">
          <RxInfoCircled />
        </div>
        <div className="status">calling mobile...</div>
        <h1 className="contact-name mx-auto text-center text-white">
          {number}
        </h1>
      </div>
      <div className="d-flex justify-content-between align-items-center callwindow-button">
        <div className="d-grid align-items-center justify-content-center w-100 action-grid">
          {actionButtons?.map(({ icon, className, label }, index) => {
            const handleClick = label === "End" ? handleCallEnd : () => {};

            return (
              <div key={index}>
                <button
                  className={`d-grid align-items-center justify-content-center text-white action-button ${
                    className || ""
                  } ${label === "End" && isPulsing ? "pulse-animation" : ""}`}
                  onClick={handleClick}
                  disabled={isPulsing}
                >
                  <span className="button-icons mb-2">{icon}</span>
                </button>
                <p className="text-white text-center m-0">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CallScreen;
