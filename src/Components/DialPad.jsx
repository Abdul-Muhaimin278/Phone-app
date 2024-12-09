import { useState } from "react";
import { IoIosCall } from "react-icons/io";
import removeBtn from "../assets/icons/delete-icon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handlePhoneCall } from "../store/actions/phoneCallActions";
import { Layout } from "../layout";
import { Spinner } from "reactstrap";

// Code clarity is quite good. Made proper functions and managed functionality in a good manner.

const DialPad = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentNumber, setCurrentNumber] = useState("");
  const [calling, setCalling] = useState(false);

  const dialPadValues = [
    { no: "1", chars: "" },
    { no: "2", chars: "ABC" },
    { no: "3", chars: "DEF" },
    { no: "4", chars: "GHI" },
    { no: "5", chars: "JKL" },
    { no: "6", chars: "MNO" },
    { no: "7", chars: "PQRS" },
    { no: "8", chars: "TUV" },
    { no: "9", chars: "WXYZ" },
    { no: "*", chars: "" },
    { no: "0", chars: "+" },
    { no: "#", chars: "" },
  ];

  const handleButtonClick = (value) => {
    if (currentNumber.length < 15) {
      setCurrentNumber((prev) => prev + value);
    } else {
      alert("Phone number cannot exceed 15 characters.");
    }
  };

  const handleRemoveNumBtn = () => {
    setCurrentNumber(currentNumber.slice(0, -1));
  };

  const handleCallBtn = async () => {
    if (!currentNumber) return;

    setCalling(true);
    dispatch(handlePhoneCall(currentNumber, () => navigate("/call"))).then(() =>
      setCalling(false)
    );
  };

  return (
    <Layout>
      <section className="d-flex flex-column align-items-center justify-content-around overflow-y-auto overflow-x-hidden bg-black text-white dialpad-container">
        <div className="d-flex flex-column align-items-center justify-content-between my-auto dialpad-number">
          <input
            type="text"
            readOnly
            value={currentNumber}
            className="bg-transparent border-0 text-center fs-1 text-white number-preview"
          />
          <p className="text-primary my-1 cursor-pointer">Add Number</p>
        </div>
        <div className="d-grid align-items-center justify-content-center mb-2 dialpad-grid">
          {dialPadValues?.map((item) => (
            <button
              key={item?.no}
              className="d-flex flex-column justify-content-center align-items-center rounded-circle text-white dialpad-button"
              onClick={() => handleButtonClick(item?.no)}
            >
              <h3 className="m-0 fw-light">{item?.no}</h3>
              <p className="m-0">{item?.chars}</p>
            </button>
          ))}
          <button
            className=" rounded-circle dialpad-call"
            onClick={handleCallBtn}
            disabled={!currentNumber}
          >
            {calling ? (
              <Spinner color="light" className="fw-light" />
            ) : (
              <IoIosCall color="white" />
            )}
          </button>
          <button
            className="d-flex justify-content-center align-items-center"
            onClick={handleRemoveNumBtn}
            disabled={!currentNumber}
          >
            <img src={removeBtn} alt="Delete Icon" />
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default DialPad;
