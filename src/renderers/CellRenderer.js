import { useState, useRef } from "react";
import React from "react";
import Tippy from "@tippyjs/react";

const CellRenderer = (params) => {
  const tippyRef = useRef();
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const field = params.colDef.field;
  const oid = params.data[field + "_text"];

  const dropDownContent = oid ? (
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
      <p onDoubleClick={visible ? hide : show} style={{ maxWidth: "350px" }}>
        {params.value}
      </p>
    </Tippy>
  );
};

export default CellRenderer;
