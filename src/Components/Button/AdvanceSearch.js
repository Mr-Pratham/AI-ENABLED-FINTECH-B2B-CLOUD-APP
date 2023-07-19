import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const queryString = require("query-string");

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#8fd163 ",
          textTransform: "none",
          color: "white",
          boxShadow: "none",
          fontSize: "0.8rem",
          border: "none",
          "&.Mui-disabled": {
            color: "white",
            opacity: 0.7,
            border: "none"

          },
          "&:hover": {
            backgroundColor: "#8fd163 ",
            "&:before": {
              content: '""',
              position: "absolute",
              top: "0",
              right: "0",
              height: '0',
              width: '0',
              borderBottom: "3px solid white"
            }
          }
        },
        outlined: {
          backgroundColor: "none",
          width: "8rem",
          padding: "0.5rem 0.5rem",
          margin: "0.25rem",
        }
      },
    },
  },
});

export default function AdvanceSearch(props) {
  const { setSearchedData, setSnackopen, setStatus } = props;
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({
    customer_order_id: "",
    cust_number: "",
    sales_org: "",
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setNewData({ ...newData, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewData({
      ...newData,
      customer_order_id: "",
      cust_number: "",
      sales_org: "",
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const { customer_order_id, cust_number, sales_org } = newData;
    await axios
      .post(
        "http://localhost:8080/JDBC/advanceSearch",
        queryString.stringify({
          customer_order_id,
          cust_number,
          sales_org,
        })
      )
      .then((res) => {
        res.data.length > 0
          ? setStatus("Data Fetched Successfully")
          : setStatus("No data Found");
        setSearchedData(res.data);
        setOpen(false);
        setSnackopen(true);
        setNewData({
          ...newData,
          customer_order_id: "",
          cust_number: "",
          sales_org: "",
        });
      })
      .catch((err) => {
        setSnackopen(true);
        setStatus(err);
        setOpen(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        fullWidth
      >
        ADVANCED
        SEARCH
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
        <DialogTitle style={{ backgroundColor: "#666767", color: "white" }}>Advanced Search</DialogTitle>
        <DialogContent style={{ paddingTop: 10, backgroundColor: "#ffffff" }}>
          <DialogContentText component={'div'}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 2, md: 5 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} md={6}>
                <TextField
                  label="Customer Order Id"
                  variant="filled"
                  fullWidth
                  name="customer_order_id"
                  value={newData.customer_order_id}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Customer No."
                  variant="filled"
                  fullWidth
                  name="cust_number"
                  value={newData.cust_number}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Sales Org"
                  variant="filled"
                  fullWidth
                  name="sales_org"
                  value={newData.sales_org}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: " #666767" }}>
          <Tooltip title="You have to filled all the Information">
            <span style={{ width: "100%" }}>
              <Button
                onClick={handleSearch}
                fullWidth
                variant="outline"
                style={{ color: "white", borderColor: "white", backgroundColor: '#fc7500', width: '50%', borderRadius: 5 }}
                disabled={
                  newData.customer_order_id === "" ||
                    newData.cust_number === "" ||
                    newData.sales_org === "" 
                    ? true
                    : false
                }
              >
                SEARCH
              </Button>
            </span>
          </Tooltip>
          <Button onClick={handleClose} autoFocus fullWidth variant="outline" style={{ color: "white", borderColor: "white", backgroundColor: ' #db4437', width: '50%' }}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
