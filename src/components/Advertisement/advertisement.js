import React from "react";
import classes from "./advertisement.module.css";
import { Button } from "@mui/material";

const Advertisement = ({ data }) => {
  return (
    <div className={classes.advertisement}>
      <p className={classes.headlines}>{data.headline}</p>
      <p className={classes.primaryText}>{data.primaryText}</p>
      <p className={classes.description}>{data.description}</p>

      <div className={classes.action}>
        <p className={classes.companyName}>{data.companyName}</p>
        <Button
          className={classes.btn}
          variant="outlined"
          onClick={() => window.open(data.companyUrl, "_blank")}
        >
          {data.cta}
        </Button>
      </div>
    </div>
  );
};

export default Advertisement;

//company name, primary text, headline, and description in a single query will be a good idea
