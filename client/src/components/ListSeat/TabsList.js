import React from "react";
import { Tabs, Tab } from "@material-ui/core";

const TabsList = ({ value, handleChange, label1, label2, label3 }) => {
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label={label1} />
        <Tab label={label2} />
        {label3 ? <Tab label={label3} /> : null}
      </Tabs>
    </>
  );
};

export default TabsList;
