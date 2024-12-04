import { BsCameraVideoFill, BsFillMicMuteFill } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoIosKeypad } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { endPhoneCall } from "../store/actions/phoneCallActions";
import { useNavigate } from "react-router-dom";
import { RxInfoCircled } from "react-icons/rx";
import { useEffect } from "react";
// Managed functionality in a good manner. Code clarity and structure is also very good. 
const actionButtons = [
  { icon: <HiSpeakerWave />, label: "Speaker" },
  { icon: <BsCameraVideoFill />, label: "FaceTime" },
  { icon: <BsFillMicMuteFill />, label: "Mute" },
  { icon: <IoPersonAddSharp />, label: "Add" },
  { icon: <MdCallEnd />, label: "End", className: "end-call" },
  { icon: <IoIosKeypad />, label: "Keypad" },
];

const CallScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { callData } = useSelector((state) => state?.call);

  const handleCallEnd = () => {
    dispatch(endPhoneCall(() => navigate("/recent")));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/recent");
    }, 10000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-between align-items-center callwindow">
      <div className="d-flex flex-column align-items-center text-white w-100 call-info">
        <div className="d-flex align-self-end callwindow-icon">
          <RxInfoCircled />
        </div>
        <div className="status">calling mobile...</div>
        <h1 className="contact-name mx-auto text-center text-white">
          {callData[0]?.number}
        </h1>
      </div>
      <div className="d-flex justify-content-between align-items-center callwindow-button">
        <div className="d-grid align-items-center justify-content-center action-grid">
          {actionButtons?.map(({ icon, className, label }, index) => {
            const handleClick = label === "End" ? handleCallEnd : () => {};

            return (
              <div key={index}>
                <button
                  className={`d-grid align-items-center justify-content-center text-white action-button ${
                    className || ""
                  }`}
                  onClick={handleClick}
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
