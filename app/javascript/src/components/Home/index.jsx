/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import HttpIcon from "@material-ui/icons/Http";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import linksApi from "../../apis/links";
import ListLinks from "./ListLinks";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    margin: "0 auto",
  },
}));

const Home = () => {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await linksApi.list();
      console.log(response, "response from fetch links");
      setLinks(response.data.links);
    } catch (error) {
      console.log(error, "error from fetchLinks");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await linksApi.create({ link: { url } });
      console.log(response, "response from create link");
      setUrl("");
      fetchLinks();
    } catch (error) {
      console.log(error, "error from create link");
    }
  };

  return (
    <Container component="main" fullWidth>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <HttpIcon />
        </Avatar>
        <Typography component="h1" variant="h2">
          URL Shortener
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="link"
            label="URL"
            name="link"
            autoComplete="link"
            autoFocus
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            placeholder="Shorten your link"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
          >
            Shorten
          </Button>
        </form>
      </div>
      <ListLinks fetchLinks={fetchLinks} links={links} />
    </Container>
  );
};

export default Home;
