import { AgGridReact } from "ag-grid-react";
import ReactDOM, { render } from "react-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import "./App.css";
import AntSelect from "./AntSelect";
import AntInputField from "./AntInputField";
import CellRenderer from "./CellRenderer";
import fieldProperties from "./getEditor";
import Renderer from "./getRenderer";

const KEY_BACKSPACE = "Backspace";
const KEY_DELETE = "Delete";
const KEY_F2 = "F2";
const KEY_ENTER = "Enter";
const KEY_TAB = "Tab";

const DoublingEditor = memo(
  forwardRef((props, ref) => {
    const [value, setValue] = useState(parseInt(props.value));
    const refInput = useRef(null);

    useEffect(() => {
      // focus on the input
      refInput.current.focus();
    }, []);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
      return {
        // the final value to send to the grid, on completion of editing
        getValue() {
          // this simple editor doubles any value entered into the input
          return value * 2;
        },

        // Gets called once before editing starts, to give editor a chance to
        // cancel the editing before it even starts.
        isCancelBeforeStart() {
          return false;
        },

        // Gets called once when editing is finished (eg if Enter is pressed).
        // If you return true, then the result of the edit will be ignored.
        isCancelAfterEnd() {
          // our editor will reject any value greater than 1000
          return value > 1000;
        },
      };
    });

    return (
      <input
        type="number"
        ref={refInput}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{ width: "100%" }}
      />
    );
  })
);

const NumericEditor = memo(
  forwardRef((props, ref) => {
    const createInitialState = () => {
      let startValue;
      let highlightAllOnFocus = true;

      if (props.eventKey === KEY_BACKSPACE || props.eventKey === KEY_DELETE) {
        // if backspace or delete pressed, we clear the cell
        startValue = "";
      } else if (props.charPress) {
        // if a letter was pressed, we start with the letter
        startValue = props.charPress;
        highlightAllOnFocus = false;
      } else {
        // otherwise we start with the current value
        startValue = props.value;
        if (props.eventKey === KEY_F2) {
          highlightAllOnFocus = false;
        }
      }

      return {
        value: startValue,
        highlightAllOnFocus,
      };
    };

    const initialState = createInitialState();
    const [value, setValue] = useState(initialState.value);
    const [highlightAllOnFocus, setHighlightAllOnFocus] = useState(
      initialState.highlightAllOnFocus
    );
    const refInput = useRef(null);

    // focus on the input
    useEffect(() => {
      // get ref from React component
      const eInput = refInput.current;
      eInput.focus();
      if (highlightAllOnFocus) {
        eInput.select();

        setHighlightAllOnFocus(false);
      } else {
        // when we started editing, we want the caret at the end, not the start.
        // this comes into play in two scenarios:
        //   a) when user hits F2
        //   b) when user hits a printable character
        const length = eInput.value ? eInput.value.length : 0;
        if (length > 0) {
          eInput.setSelectionRange(length, length);
        }
      }
    }, []);

    /* Utility Methods */
    const cancelBeforeStart =
      props.charPress && "1234567890".indexOf(props.charPress) < 0;

    const isLeftOrRight = (event) => {
      return ["ArrowLeft", "ArrowLeft"].indexOf(event.key) > -1;
    };

    const isCharNumeric = (charStr) => {
      return !!/\d/.test(charStr);
    };

    const isKeyPressedNumeric = (event) => {
      const charStr = event.key;
      return isCharNumeric(charStr);
    };

    const deleteOrBackspace = (event) => {
      return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.key) > -1;
    };

    const finishedEditingPressed = (event) => {
      const key = event.key;
      return key === KEY_ENTER || key === KEY_TAB;
    };

    const onKeyDown = (event) => {
      if (isLeftOrRight(event) || deleteOrBackspace(event)) {
        event.stopPropagation();
        return;
      }

      if (!finishedEditingPressed(event) && !isKeyPressedNumeric(event)) {
        if (event.preventDefault) event.preventDefault();
      }

      if (finishedEditingPressed(event)) {
        props.stopEditing();
      }
    };

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
      return {
        // the final value to send to the grid, on completion of editing
        getValue() {
          return value;
        },

        // Gets called once before editing starts, to give editor a chance to
        // cancel the editing before it even starts.
        isCancelBeforeStart() {
          return cancelBeforeStart;
        },

        // Gets called once when editing is finished (eg if Enter is pressed).
        // If you return true, then the result of the edit will be ignored.
        isCancelAfterEnd() {
          // will reject the number if it greater than 1,000,000
          // not very practical, but demonstrates the method.
          return value > 1000000;
        },
      };
    });

    return (
      <input
        ref={refInput}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => onKeyDown(event)}
        style={{ width: "100%" }}
      />
    );
  })
);

function App() {
  const [gridData, setGridData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:1001/data")
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setGridData(data);
        });
    };
    fetchData();
  }, []);

  // if (!gridData) {
  //   <h1>Loading....</h1>;
  // }

  const columnTypes = useMemo(() => {
    return {
      editableColumn: {
        cellStyle: (params) => {
          if (params.value === "Harry" || params.value === "Sad") {
            return { backgroundColor: "lightgrey" };
          }
        },
      },
    };
  }, []);

  let column = gridData?.columns.map((ele) => {
    const column = {
      ...ele,
    };
    if (ele.cellEditor) {
      column["cellEditor"] = fieldProperties[ele.cellEditor];
    }
    if (ele.cellRenderer) {
      column["cellRenderer"] = Renderer[ele.cellRenderer];
    }
    return column;
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          columnDefs={column}
          rowData={gridData?.data}
          defaultColDef={{
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
          columnTypes={columnTypes}
          // onCellEditingStarted={(value) => {
          //   console.log("onCellEditingStarted", value);
          // }}
          // onCellEditingStopped={(value) => {
          //   console.log("onCellEditingStopped", value);
          // }}
          onCellClicked={(value) => {
            // console.log("onCellClicked", value);
            if (value.value === "Harry" || value.value === "Sad") {
              return (value.colDef.editable = false);
            }
            return (value.colDef.editable = true);
          }}
          // pagination={true}
          // paginationPageSize={2}
        />
      </div>
    </div>
  );
}

export default App;

// const columnDefs = useMemo(() => [
//   {
//     headerName: "Select Name",
//     field: "select",
//     cellEditor: AntSelect,
//     cellRenderer: CellRenderer,
//     cellEditorPopup: true,
//     // editable: true,
//     width: 200,
//     // initialWidth: 400,
//     // flex: 2,
//     // cellStyle: (params) => {
//     //   if (params.value === "Harry") {
//     //     return { color: "black", backgroundColor: "lightgrey" };
//     //   }
//     //   return null;
//     // },
//     type: "editableColumn",
//   },
//   {
//     headerName: "Name",
//     field: "name",
//     cellEditor: AntInputField,
//     cellRenderer: CellRenderer,
//     cellEditorPopup: true,
//     // editable: true,
//     width: 280,
//     type: "editableColumn",
//   },
//   {
//     headerName: "Doubling",
//     field: "number",
//     cellEditor: DoublingEditor,
//     cellEditorPopup: true,
//     // editable: true,
//     // editable: (params) => params.data.number !== 10,
//     width: 300,
//     type: "editableColumn",
//   },
// ]);

// const [rowData] = useState(gridData?.data);

// let columns = gridData?.columns;
// console.log("columns", columns);
