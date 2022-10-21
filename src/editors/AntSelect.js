import { Select } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "antd/dist/antd.css";

const AntSelect = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);
  const refSelect = useRef(null);

  useEffect(() => {
    // focus on the input
    refSelect.current.focus();
  }, []);

  const handleChange = (value) => {
    setValue(value);
    console.log(`selected ${value}`);
  };

  useImperativeHandle(ref, () => {
    return {
      // the final value to send to the grid, on completion of editing
      getValue() {
        // this simple editor doubles any value entered into the input
        console.log("getValue Antd", value);
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
    <Select
      // showSearch
      // defaultValue="jack"
      size="large"
      style={{ width: 200 }}
      value={value}
      onChange={handleChange}
      ref={refSelect}
    >
      <Select.Option value="jack">Jack</Select.Option>
      <Select.Option value="lucy">Lucy</Select.Option>
      <Select.Option value="disabled">Disabled</Select.Option>
      <Select.Option value="Yiminghe">yiminghe</Select.Option>
    </Select>
  );
});

export default AntSelect;
