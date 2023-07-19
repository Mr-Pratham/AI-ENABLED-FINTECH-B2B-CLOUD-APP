import React from "react";
import { TextField } from "@mui/material";

function SearchField(props) {
  const { search, setSearch } = props;
  return (
    <TextField
      id="filled-basic"
      label="Search Customer Order Id"
      variant="filled"
      style={{
        backgroundColor: "white",
        borderRadius: "6px",
        marginRight: "10px",
        marginBottom: "10px",
        marginTop: "2px"
      }}
      value={search}
      type="text"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchField;
