/* eslint-disable no-console */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import { Button, Link } from "@material-ui/core";
import EditLocationIcon from "@material-ui/icons/EditLocation";

import linksApi from "../../apis/links";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px 0",
  },
  button: {
    margin: "0 20px",
  },
}));

const getShortUrlLink = (slug) => (
  <Link
    target="_blank"
    rel="noreferrer"
    href={`http://localhost:3000/${slug}`}
  >{`http://localhost:3000/${slug}`}</Link>
);

const handlePin = async (slug, pinned) => {
  try {
    const response = await linksApi.update({
      slug,
      payload: { link: { pinned: !pinned } },
    });
    console.log(response, "response from update pin");
  } catch (error) {
    console.log(error, "error from update pin");
  }
};

const ListLinks = ({ links }) => {
  const classes = useStyles();

  console.log(links, "from linklist");

  return (
    <List className={classes.root}>
      {links.map((link) => {
        return (
          <ListItem key={link.id} button>
            <ListItemIcon>{link.pinned && <EditLocationIcon />}</ListItemIcon>
            <ListItemText
              primary={getShortUrlLink(link.slug)}
              secondary={link.url}
            />
            <Button
              onClick={() => handlePin(link.slug, link.pinned)}
              variant="outlined"
              className={classes.button}
            >
              {link.pinned ? "Unpin" : "Pin"}
            </Button>
            <span>Clicks: {link.clicked || 0}</span>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListLinks;
