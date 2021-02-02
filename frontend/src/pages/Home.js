import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

import ResponsiveDrawer from "../components/ResponsiveDrawer";
import AlertModal from "../components/AlertModal";

export default function Home(props) {
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
        if (res.data.length) {
          setEmptyStocks(res.data);
          setIsOpen(true);
        }
      });
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ResponsiveDrawer reload={isOpen} bookstores={bookstores} token={token} />
      <AlertModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        emptyStocks={emptyStocks}
      />
    </>
  );
}
