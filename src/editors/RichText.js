import React, { forwardRef, useImperativeHandle, useState } from "react";

import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";
import { Modal } from "antd";
import FroalaEditor from "react-froala-wysiwyg";

const RichText = (props, ref) => {
  console.log("rich");
  const [values, setValues] = useState("");
  const [modal, setModal] = useState(false);

  const onChangeHandler = (value) => {
    setValues(value);
    // setValues((prev) => ({
    //   ...prev,
    //   value: e.target?.value,
    // }));
  };

  const handleOk = (val) => {
    setModal(false);
    // this.getValue();
  };

  const handleCancel = () => {
    setModal(false);
  };

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return values;
      },
    };
  });
  return (
    <Modal title="Details" open={modal} onOk={handleOk} onCancel={handleCancel}>
      <FroalaEditor
        tag="textarea"
        model={values}
        onModelChange={onChangeHandler}
      />
    </Modal>
  );
};

export default forwardRef(RichText);
