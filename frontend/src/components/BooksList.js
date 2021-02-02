import { DataGrid } from "@material-ui/data-grid";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .negative": {
      backgroundColor: "red",
      fontWeight: "600",
    },
  },
});

const columns = [
  { field: "stock_id", headerName: "Stock_id", width: 120 },
  { field: "id", headerName: "Book_id", width: 120 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 120,
    cellClassName: (params) =>
      clsx("cell", {
        negative: params.value <= 0,
      }),
  },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "author", headerName: "Author", flex: 1 },
  { field: "summary", headerName: "Summary", flex: 1 },
];

export default function BooksList(props) {
  const { data, isLoading } = props;
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyItems: "center",
        height: "85vh",
        width: "100%",
      }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        className={classes["root"]}
        loading={isLoading}
      />
    </div>
  );
}
