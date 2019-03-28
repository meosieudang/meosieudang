import React from "react";
import { Tabs, Tab } from "@material-ui/core";

const TabsList = ({ value, handleChange, label1, label2 }) => {
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
      </Tabs>
    </>
  );
};

export default TabsList;
