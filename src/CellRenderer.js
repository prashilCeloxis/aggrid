import { useState, useRef } from "react";
import React from "react";
import Tippy from "@tippyjs/react";

const CellRenderer = (params) => {
  console.log("params", params.value);
  const tippyRef = useRef();
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const dropDownContent =
    params.value === "Harry" ? (
      <div className="menu-container">
        <div
          className="menu-item"
          style={{ backgroundColor: "red", color: "white" }}
        >
          Not Edit
        </div>
      </div>
    ) : (
      ""
    );

  return (
    <Tippy
      ref={tippyRef}
      content={dropDownContent}
      visible={visible}
      onClickOutside={hide}
      allowHTML={true}
      arrow={false}
      appendTo={document.body}
      interactive={true}
      placement="right"
    >
      <span onDoubleClick={visible ? hide : show}>{params.value}</span>
    </Tippy>
  );
};

export default CellRenderer;
