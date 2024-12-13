import { Row, Col } from "reactstrap";
import { FaUserCircle } from "react-icons/fa";
import { IoIosKeypad } from "react-icons/io";
import { TbClockHour9Filled } from "react-icons/tb";
import { IoStar } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

// Code clarity is very good.

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: IoStar, label: "Favourites" },
    { icon: TbClockHour9Filled, label: "Recents", path: "/recent" },
    { icon: FaUserCircle, label: "Contacts" },
    { icon: IoIosKeypad, label: "Keypad", path: "/dial" },
  ];

  const handleTabBtns = (path) => {
    navigate(path);
  };

  return (
    <section className="d-flex justify-content-center align-items-center bg-black text-white w-100 tabbar-container pb-1">
      <Row className="d-flex justify-content-between align-items-center text-center w-100 tabbar-row">
        {navItems?.map((item, index) => {
          const isActive = location.pathname === item?.path;

          return (
            <Col key={index} className="px-0">
              <button
                onClick={() => item?.path && handleTabBtns(item?.path)}
                disabled={!item?.path}
              >
                <div className="tabbar-icon">
                  <item.icon
                    size={22}
                    color={isActive ? "dodgerblue" : "#333"}
                  />
                </div>
                <p
                  className="tabbar-label m-0"
                  style={{
                    color: isActive ? "dodgerblue" : "#333",
                  }}
                >
                  {item?.label}
                </p>
              </button>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default TabBar;
