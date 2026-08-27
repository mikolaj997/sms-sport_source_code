import React, { useState } from "react";
import translations from "./translations";

const ShortcutPopup = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);

  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (e) => {
    if (isVisible && !e.target.closest(".popup")) {
      setIsVisible(false);
    }
  };
  return (
    <div>
      {!isVisible && (
        <button className="btn" onClick={() => togglePopup()}>
          ?
        </button>
      )}

      {isVisible && (
        <div
          className="popup"
          style={{
            margin: "35px 0",
            background: "#fff",
            padding: "5px",
            border: "1px solid #ccc",
            width: "500px",
            maxWidth: "90vw",
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            lineHeight: "1.5",
          }}
        >
          <button
            onClick={togglePopup}
            style={{
              margin: 0,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            X
          </button>

          <div>
            <strong>{translations[language].keyboardShortcuts}</strong>{" "}
            {translations[language].keyboardShortcutsDescription}
            <br />
            <strong>{translations[language].markerColors}</strong>{" "}
            {translations[language].markerColorsDescription}
          </div>
        </div>
      )}
    </div>
  );
};
export default ShortcutPopup;
