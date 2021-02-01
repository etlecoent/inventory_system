import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import useAxios from "../hooks/useAxios";

const columns = [
  { field: "book_id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "author", headerName: "Author", width: 150 },
  { field: "quantity", headerName: "Quantity", width: 120 },
];

export default function BooksList(props) {
  const { bookstoreId, token } = props;
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
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "85vh",
            width: "100%",
          }}>
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyItems: "center",
            height: "85vh",
            width: "100%",
          }}>
          <DataGrid rows={books} columns={columns} pageSize={10} />
        </div>
      )}
    </>
  );
}
