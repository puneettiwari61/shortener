/* eslint-disable no-console */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import { Link } from "@material-ui/core";

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
}));

const getShortUrlLink = (slug) => (
  <Link
    target="_blank"
    rel="noreferrer"
    href={`http://localhost:3000/${slug}`}
  >{`http://localhost:3000/${slug}`}</Link>
);

const ListLinks = ({ links }) => {
  const classes = useStyles();

  console.log(links, "from linklist");

  return (
    <List className={classes.root}>
      {links.map((link) => {
        return (
          <ListItem key={link.id} button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary={getShortUrlLink(link.slug)}
              secondary={link.url}
            />
            <span>Clicks: {link.clicked || 0}</span>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListLinks;
