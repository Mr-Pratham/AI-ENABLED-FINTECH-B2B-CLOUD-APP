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
            backgroundColor: "none",
            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              borderBottom: "3px solid white",
            }
          }
        },
        outlined: {
          borderColor: "white",
          width: "8rem",
          padding: "0.5rem 1rem",
          margin: "0.25rem"
        }
      },
    },
  },
});

export default function Add(props) {
  const { setSnackopen, setStatus, setRefresh, refresh, setSelect } = props;
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({
    order_id: "",
    sales_org: "",
    distribution_channel: "",
    customer_number: "",
    comapany_code: "",
    order_currency: "",
    creation_data: "",
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
      order_id: "",
      sales_org: "",
      distribution_channel: "",
      customer_number: "",
      comapany_code: "",
      order_currency: "",
      creation_data: "",
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const {
      order_id,
      sales_org,
      distribution_channel,
      customer_number,
      comapany_code,
      order_currency,
      creation_data,
    } = newData;
    await axios
      .post(
        "http://localhost:8080/BACKEND-JAVA/AddInvoice",
        queryString.stringify({
          order_id,
          sales_org,
          distribution_channel,
          customer_number,
          comapany_code,
          order_currency,
          creation_data,
        })
      )
      .then((res) => {
        // If the request is successful
        // (then block), it updates various states and
        // shows a success message using the setStatus and setSnackopen functions.
        setStatus(res.data);
        setOpen(false);
        setSnackopen(true);
        setNewData({
          ...newData,
          order_id: "",
          sales_org: "",
          distribution_channel: "",
          customer_number: "",
          comapany_code: "",
          order_currency: "",
          creation_data: "",
        });
        setRefresh(refresh + 1);
        setSelect([]);
      })
      .catch((err) => {
        setSnackopen(true);
        setStatus(err);
        setOpen(false);
        setRefresh(refresh + 1);
        setSelect([]);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        fullWidth
      >
        ADD
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" >
        <DialogTitle style={{ backgroundColor: "#666767", color: "white" }}>ADD DATA</DialogTitle>
        <DialogContent style={{ paddingTop: 10, backgroundColor: "#ffffff" }}>
          <DialogContentText component={'div'}>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="CUSTOMER ORDER ID"
                  variant="filled"
                  fullWidth
                  name="order_id"
                  value={newData.order_id}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="SALES ORG"
                  variant="filled"
                  fullWidth
                  name="sales_org"
                  value={newData.sales_org}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Distribution Channel"
                  variant="filled"
                  fullWidth
                  name="distribution_channel"
                  value={newData.distribution_channel}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="CUSTOMER NUMBER"
                  variant="filled"
                  fullWidth
                  name="customer_number"
                  value={newData.customer_number}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="COMPANY CODE"
                  variant="filled"
                  fullWidth
                  name="comapany_code"
                  value={newData.comapany_code}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="ORDER CURRENCY"
                  variant="filled"
                  fullWidth
                  name="order_currency"
                  value={newData.order_currency}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="ORDER CREATION DATE"
                  variant="filled"
                  fullWidth
                  name="creation_data"
                  value={newData.creation_data}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#666767" }}>
          <Tooltip title="You have to filled all the Information">
            <span style={{ width: "100%", marginRight: 10 }}>
              <Button
                onClick={handleAdd}
                fullWidth
                variant="outline"
                disabled={
                  newData.order_id === "" ||
                    newData.sales_org === "" ||
                    newData.distribution_channel === "" ||
                    newData.customer_number === "" ||
                    newData.comapany_code === "" ||
                    newData.order_currency === "" ||
                    newData.creation_data === ""
                    ? true
                    : false
                }
                style={{ color: "white", borderColor: "white", backgroundColor: '#fc7500', width: '50%' }}
              >
                ADD
              </Button>
            </span>
          </Tooltip>
          <Button onClick={handleClose} fullWidth variant="outline" style={{ color: "white", borderColor: "white", backgroundColor: ' #db4437', width: '50%' }}>
            CLEAR DATA
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
