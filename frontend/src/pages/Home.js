import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

import ResponsiveDrawer from "../components/Drawer";

export default function Home(props) {
  const { token } = props;
  const axios = useAxios(token);
  const [bookstores, setBookstores] = useState([]);

  useEffect(() => {
    axios.get("/bookstores").then((res) => {
      setBookstores(res.data);
    });
  }, []);

  return <ResponsiveDrawer bookstores={bookstores} />;
}
