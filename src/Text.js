import { GlobalEvents } from "@bryntum/gantt/gantt.umd.js";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { IChangeEvent, Picker } from "react-shared-components";
import {
  ClzPickListOption,
  ClzPickListSelectedValue,
  ClzPickListValue,
} from "src/api/types";
import { GanttContainer } from "src/gantt/GanttContainer";

import { BryntumCellEditorRefAttributes } from "src/gantt/types";
import store from "src/store";
import "./CellPickListEditor.scss";

const CellPickListEditor = forwardRef((ref) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);

  const pickerItems = options.map((option) => ({
    id: option.internalId,
    content: option.name,
  }));

  useImperativeHandle(ref, () => ({
    getValue: () => ({ selectedValue, options }),
    setValue: (value) => {
      setSelectedValue(value.selectedValue);
      setOptions(value.options);
    },
    focus: () => {
      // We need to suspend Bryntum events because otherwise finishEditing (triggers on mouse down) happens
      // before we applied new value here.
      GlobalEvents.suspendEvents();
    },
    isValid: () => true,
  }));

  const handleChange = (e) => {
    setSelectedValue({
      Color: "",
      Name: pickerItems.find((item) => item.id === e.value)?.content || "",
      id: "",
      internalId: e.value,
    });
    // Resuming events with timeout because of async nature of react setState. Otherwise finishEditing happens
    // before new value is applied.
    setTimeout(() => {
      GanttContainer.getInstance().features.cellEdit.finishEditing();
      GlobalEvents.resumeEvents();
    }, 0);
  };

  console.log("rendered");

  return (
    <div className="clz-cell-picklist-editor">
      <Picker
        name="picker1"
        overlayClassName="clz-cell-picklist-editor-overlay"
        value={selectedValue?.internalId || ""}
        onChange={handleChange}
        onOpenChange={() => {}}
        defaultOpen={store.getState().app.antdDropdownDefaultOpen}
        items={pickerItems}
      />
    </div>
  );
});

export default CellPickListEditor;
