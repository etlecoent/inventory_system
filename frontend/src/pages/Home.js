import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import ResponsiveDrawer from "../components/Drawer";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    top: "50%",
    left: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Home(props) {
  const classes = useStyles();

  const { token } = props;
  const axios = useAxios(token);
  const [bookstores, setBookstores] = useState([]);
  const [emptyStocksInfos, setEmptyStocksInfos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get("/bookstores").then((res) => {
      setBookstores(res.data);
    });

    const interval = setInterval(() => {
      axios.get("/bookstores-books/").then((res) => {
        const emptyStocks = res.data.filter((e) => e.quantity <= 0);
        if (emptyStocks.length) {
          const stocksInfos = [];
          emptyStocks.forEach((element) => {
            const booksInfos = axios.get(`/books/${element.book_id}`);
            const bookstoresInfos = axios.get(
              `/bookstores/${element.bookstore_id}`
            );
            stocksInfos.push([bookstoresInfos, booksInfos]);
          });
          Promise.all(stocksInfos.map(Promise.all, Promise)).then((infos) => {
            const xxxx = infos.map((info) => {
              return {
                bookstore: { ...info[0].data },
                book: { ...info[1].data },
              };
            });
            console.log(xxxx);
            setEmptyStocksInfos(xxxx);
            setIsOpen(true);
          });
        }
      });
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ResponsiveDrawer bookstores={bookstores} token={token} />
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={() => setIsOpen(false)}>
        <List>
          {emptyStocksInfos.map((emptyStock) => (
            <ListItem key={emptyStock.id}>
              <ListItemText
                primary={`${emptyStock.book.title} by ${emptyStock.book.author} is out of stock at ${emptyStock.bookstore.name}`}
              />
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  );
}
