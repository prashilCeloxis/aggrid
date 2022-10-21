import { DatePicker, Select } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "antd/dist/antd.css";
import moment from "moment";

const DateField = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);
  const refSelect = useRef(null);

  useEffect(() => {
    refSelect.current.focus();
  }, []);

  const onChangeHandler = (value) => {
    setValue(value);
  };

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return moment(value).format("YYYY/MM/DD");
      },
    };
  });

  return (
    <DatePicker
      ref={refSelect}
      allowClear={false}
      value={moment(value, "YYYY/MM/DD")}
      onChange={onChangeHandler}
    />
  );
});

export default DateField;
