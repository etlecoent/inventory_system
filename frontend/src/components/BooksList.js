import { useEffect, useState } from "react";
import { DataGrid, CellParams } from "@material-ui/data-grid";
import clsx from "clsx";
import useAxios from "../hooks/useAxios";
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
  { field: "book_id", headerName: "ID", width: 100 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 120,
    cellClassName: (params: CellParams) =>
      clsx("cell", {
        negative: params.value <= 0,
      }),
  },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "author", headerName: "Author", flex: 1 },
  { field: "summary", headerName: "Summary", flex: 1 },
];

export default function BooksList(props) {
  const { bookstoreId, token } = props;
  const classes = useStyles();
  const axios = useAxios(token);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`bookstores/${bookstoreId}/books`)
      .then((res) => {
        setIsLoading(false);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, [bookstoreId]);

  return (
    <div
      style={{
        display: "flex",
        justifyItems: "center",
        height: "85vh",
        width: "100%",
      }}>
      <DataGrid
        rows={books}
        columns={columns}
        pageSize={10}
        className={classes["root"]}
        loading={isLoading}
      />
    </div>
  );
}
