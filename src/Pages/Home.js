import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Add from "../Components/Button/Add";
import HomePage from "../Components/Button/HomePage";
import AdvanceSearch from "../Components/Button/AdvanceSearch";
import AnalyticsView from "../Components/Button/AnalyticsView";
import Delete from "../Components/Button/Delete";
import Edit from "../Components/Button/Edit";
import Predict from "../Components/Button/Predict";
import Refresh from "../Components/Button/Refresh";
import Footer from "../Components/Footer";
import LogoHeader from "../Components/LogoHeader";
import SearchField from "../Components/SearchField";
import SimpleSnackbar from "../Components/Snackbar";
import DataTable from "../Components/Table";

function Home() {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [snackopen, setSnackopen] = useState(false);
  const [status, setStatus] = useState("");
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <LogoHeader />
      <Typography
        variant="h4"
        style={{
          fontSize: "1.7rem",
          paddingLeft: 20,
          color: "#db4437",
          paddingBottom: 4,
        }}
      >
        <b>Invoice List</b>
      </Typography>
      <div style={{ backgroundColor: "#a9a9a9", paddingTop: 30 }}>
        <Grid container sx={{ pl: 2, pr: 2 }} spacing={1}>
          <Grid item lg={6} style={{ display: "flex", justifyContent: "flex-start" }}>
            <HomePage />
            <Add
              setSnackopen={setSnackopen}
              setStatus={setStatus}
              refresh={refresh}
              setRefresh={setRefresh}
              setSelect={setSelect}
            />
            <AnalyticsView />
          </Grid>
          <Grid item lg={6} style={{ display: "flex", justifyContent: "flex-end" }}>
            <SearchField search={search} setSearch={setSearch} />
            <AdvanceSearch
              setSearchedData={setSearchedData}
              setSnackopen={setSnackopen}
              setStatus={setStatus}
            />
          </Grid>
        </Grid>

        <DataTable
          search={search}
          setSelect={setSelect}
          searchedData={searchedData}
          refresh={refresh}
        />

        <div style={{ display: "flex", justifyContent: "flex-start", marginLeft: "20px", marginTop: "20px" }}>
          <Refresh setSearchedData={setSearchedData} />
          <Edit
            select={select}
            setSnackopen={setSnackopen}
            setStatus={setStatus}
            refresh={refresh}
            setRefresh={setRefresh}
            setSelect={setSelect}
          />
          <Delete
            select={select}
            setSnackopen={setSnackopen}
            setStatus={setStatus}
            refresh={refresh}
            setRefresh={setRefresh}
            setSelect={setSelect}
          />
          <Predict
            select={select}
            setSnackopen={setSnackopen}
            setStatus={setStatus}
            refresh={refresh}
            setRefresh={setRefresh}
            setSelect={setSelect}
          />
        </div>
      </div>
      <Footer />
      <SimpleSnackbar open={snackopen} setOpen={setSnackopen} status={status} />
    </div>
  );
}

export default Home;
