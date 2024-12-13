import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSavePhoneCall } from "../store/actions/phoneCallActions";
import { BsCameraVideoFill, BsFillMicMuteFill } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoIosKeypad } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import { RxInfoCircled } from "react-icons/rx";

const actionButtons = [
  { icon: HiSpeakerWave, label: "Speaker" },
  { icon: BsCameraVideoFill, label: "FaceTime" },
  { icon: BsFillMicMuteFill, label: "Mute" },
  { icon: IoPersonAddSharp, label: "Add" },
  { icon: MdCallEnd, label: "End", className: "end-call" },
  { icon: IoIosKeypad, label: "Keypad" },
];

const CallScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pulsing } = useSelector((state) => state?.call);
  const location = useLocation();
  const number = location.state?.number;

  const handleCallEnd = (label) => {
    if (label === "End") handleSaveAndNavigate();
  };

  const handleSaveAndNavigate = () => {
    dispatch(handleSavePhoneCall(number, () => navigate("/recent")));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSaveAndNavigate();
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
          {actionButtons?.map((item, index) => {
            return (
              <div key={index}>
                <button
                  className={`d-grid align-items-center justify-content-center text-white action-button ${
                    item?.className || ""
                  }`}
                  onClick={() => handleCallEnd(item?.label)}
                  disabled={pulsing}
                >
                  <item.icon
                    className={`button-icons ${
                      item?.label === "End" && pulsing ? "pulse-animation" : ""
                    }`}
                  />
                </button>
                <p className="text-white text-center m-0">{item?.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CallScreen;
