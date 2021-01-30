/* eslint-disable no-console */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import linksApi from "../apis/links";

const ShortLinkRedirect = () => {
  const params = useParams();

  const getLinkBySlug = async () => {
    try {
      const response = await linksApi.show(params.slug);
      console.log(response, "response from getLink");
      window.location.href = response.data.link.url;
    } catch (err) {
      console.log(err, "error from get link");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    console.log(params, "params");
    getLinkBySlug();
  }, []);

  return <div></div>;
};

export default ShortLinkRedirect;
