const gridData = {
  columns: [
    {
      headerName: "Select Name",
      field: "select",
      cellEditor: "AntSelect",
      // cellRenderer: "CellRenderer",
      cellEditorPopup: true,
      // editable: true,
      width: 100,
      flex: 1,

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
      // cellRenderer: "CellRenderer",
      cellEditorPopup: true,
      // editable: true,
      width: 100,
      flex: 1,

      type: "editableColumn",
    },
    {
      headerName: "Date",
      field: "date",
      cellEditor: "DateField",
      cellEditorPopup: true,
      // editable: true,
      // editable: (params) => params.data.number !== 10,
      width: 100,
      type: "editableColumn",
      // cellRenderer: "CellRenderer",
      flex: 1,
    },
    {
      headerName: "RichText",
      field: "richtext",
      // cellEditor: "RichText",
      cellEditor: "agLargeTextCellEditor",
      cellEditorPopup: true,
      flex: 2,
      // type: "editableColumn",
      minWidth: 550,
      // cellRenderer: "CellRenderer",
    },
  ],

  data: [
    {
      select: "jack",
      name: "Happy",
      number: 10,
      date: "2022-09-20",
      richtext:
        "This option updates the React model as soon as a key is released in the editor. Note that it may affect performance.",
    },
    {
      select: "Harry",
      name: "Sad",
      number: 3,
      select_text: "g1",
      name_text: "g1",
      date: "2022-10-20",
      richtext:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      select: "Sally",
      name: "Happy",
      number: 20,
      date: "2022-10-20",
      richtext:
        " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      select: "Mary",
      name: "Sad",
      number: 5,
      name_text: "g1",
      date: "2022-10-20",
      richtext:
        " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      select: "John",
      name: "Happy",
      number: 15,
      date: "2022-10-20",
      richtext:
        " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      select: "Jack",
      name: "Happy",
      number: 25,
      number_text: "g1",
      date: "2022-10-20",
      richtext:
        " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ],
};

module.exports = {
  gridData,
};
