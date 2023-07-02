from nicegui import ui
from pathlib import Path


def load_directory():
    items = Path("./Python").iterdir()

    grid.options['rowData'] = [
        {"name": i.name, "type": "Folder" if i.is_dir() else "File"} for i in items]
    grid.update()


def onRowClicked(e):
    print(e)


ui.button("Load Directory", on_click=load_directory)

grid = ui.aggrid({
    "columnDefs": [
        {
            "headerName": "名称",
            "field": "name",
            "rowDrag": True,
            "headerCheckboxSelection": True,
            "checkboxSelection": True,
        },
        {
            "headerName": "类型",
            "field": "type"
        }
    ],
    "rowData": [],
    "onRowClicked": onRowClicked,
    "defaultColDef": {
        "width": 170,
        "flex": 1,
        "sortable": True,
        "filter": True,
        "editable": True,
    },
    "enableRangeSelection": True,
    "rowDragManaged": True,
    "rowDragMultiRow": True,
    "rowSelection": 'multiple',
    "suppressMoveWhenRowDragging": True,
    "animateRows": True,
})


ui.run(reload=False, native=True)
