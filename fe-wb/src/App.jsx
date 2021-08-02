import React, { useEffect, useState } from "react";
import TTSpages from "./pages/TTSpages";
import Torrent from "./pages/Torrent";
import axios from "./axios/axios";
import { Container, Grid } from "@material-ui/core";

const App = () => {
  const [char, setChar] = useState("null");

  useEffect(() => {
    axios
      .get("/")
      .then((res) => setChar(res.data))
      .catch((_) => console.log("err char"));
  }, []);

  return (
    <Container fixed disableGutters>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10} md={7}>
          <TTSpages char={char} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Torrent />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
