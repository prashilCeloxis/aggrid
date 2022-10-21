import { Input, Select } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const AntInputField = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);
  const refInput = useRef(null);

  useEffect(() => {
    // focus on the input
    refInput.current.focus();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      // the final value to send to the grid, on completion of editing
      getValue() {
        // this simple editor doubles any value entered into the input
        // console.log("getValue Antd", value);
        return value;
      },

      // Gets called once before editing starts, to give editor a chance to
      // cancel the editing before it even starts.
      // isCancelBeforeStart() {
      //   return false;
      // },

      // Gets called once when editing is finished (eg if Enter is pressed).
      // If you return true, then the result of the edit will be ignored.
      // isCancelAfterEnd() {
      //   // our editor will reject any value greater than 1000
      //   return value;
      // },
    };
  });

  return (
    <Input
      // type="number"
      // type="string"
      ref={refInput}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      style={{ width: "100%" }}
    />
  );
});

export default AntInputField;
