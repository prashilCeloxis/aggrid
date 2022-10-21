const gridData = {
  columns: [
    {
      headerName: "Select Name",
      field: "select",
      cellEditor: "AntSelect",
      cellRenderer: "CellRenderer",
      cellEditorPopup: true,
      // editable: true,
      width: 200,
      // initialWidth: 400,
      // flex: 2,
      // cellStyle: (params) => {
      //   if (params.value === "Harry") {
      //     return { color: "black", backgroundColor: "lightgrey" };
      //   }
      //   return null;
      // },
      type: "editableColumn",
    },
    {
      headerName: "Name",
      field: "name",
      cellEditor: "AntInputField",
      cellRenderer: "CellRenderer",
      cellEditorPopup: true,
      // editable: true,
      width: 280,
      type: "editableColumn",
    },
    {
      headerName: "Doubling",
      field: "number",
      cellEditor: "DoublingEditor",
      cellEditorPopup: true,
      // editable: true,
      // editable: (params) => params.data.number !== 10,
      width: 300,
      type: "editableColumn",
    },
  ],

  data: [
    { select: "jack", name: "Happy", number: 10 },
    { select: "Harry", name: "Sad", number: 3 },
    { select: "Sally", name: "Happy", number: 20 },
    { select: "Mary", name: "Sad", number: 5 },
    { select: "John", name: "Happy", number: 15 },
    { select: "Jack", name: "Happy", number: 25 },
  ],
};

module.exports = {
  gridData,
};
