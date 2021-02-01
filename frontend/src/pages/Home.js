import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import ResponsiveDrawer from "../components/Drawer";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Home(props) {
  const classes = useStyles();

  const { token } = props;
  const axios = useAxios(token);
  const [bookstores, setBookstores] = useState([]);
  const [emptyStocks, setEmptyStocks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get("/bookstores").then((res) => {
      setBookstores(res.data);
    });

    const interval = setInterval(() => {
      axios.get("/status/bookstores-books/").then((res) => {
        setEmptyStocks(res.data);
        setIsOpen(true);
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
        <div className={classes.modalContent}>
          <List
            subheader={
              <ListSubheader color="primary" id="out-of-stock-subheader">
                <Typography variant="h3">Out Of Stock</Typography>
              </ListSubheader>
            }>
            {emptyStocks.map((emptyStock) => (
              <ListItem key={emptyStock.id} divider={true}>
                <ListItemText
                  primary={emptyStock.bookstore_name}
                  secondary={
                    <>
                      <Typography variant="h5">
                        {emptyStock.book_author}
                      </Typography>
                      <p>{emptyStock.book_title}</p>
                    </>
                  }
                />
                <List></List>
              </ListItem>
            ))}
          </List>
        </div>
      </Modal>
    </>
  );
}
