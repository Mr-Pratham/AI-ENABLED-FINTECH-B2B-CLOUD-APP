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
  Typography,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DialogChart from "../Chart/Dialog";
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
          width: "8rem", // Set width to fit the content
          padding: "0.5rem 0.5rem", // Adjust padding as needed
          margin: "0.25rem",
          whiteSpace: "nowrap" // Add margin for spacing between buttons
        }
      },
    },
  },
});

export default function AnalyticsView() {
  const [open, setOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [newData, setNewData] = useState({
    invoice_currency: "",
    customer_number: "",
  });
  const [chart, setChart] = useState({
    invoicecurrency: "",
    customernumber: "",
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
      invoice_currency: "",
      customer_number: "",
    });
  };

  const handleAnalytics = async (e) => {
    e.preventDefault();
    const {
      invoice_currency,
      customer_number,
    } = newData;
    await axios
      .post(
        "http://localhost:8080/JDBC/analytics",
        queryString.stringify({
          invoice_currency,
          customer_number,
        })
      )
      .then((res) => {
        setOpen(false);
        setChart({
          invoicecurrency: res.data.business.map(item => item.invoice_currency),
          customerNumber: res.data.business.map(item => item.customer_number),

        })
        setNewData({
          ...newData,
          invoice_currency: "",
          customer_number: "",

        });
        setChartOpen(true);
      })
      .catch((err) => {
        setOpen(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth>
        ANALYTICS VIEW
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
        <DialogTitle style={{ backgroundColor: "#666767", color: "white" }}>
          Analytics View
        </DialogTitle>
        <DialogContent style={{ paddingTop: 20, backgroundColor: "#ffffff" }}>
          <DialogContentText component={"div"}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} md={6}>
                <Typography style={{ color: "white" }}>
                  Distribution Channel
                </Typography>
                <TextField
                  label="Invoice Currency"
                  variant="filled"
                  fullWidth
                  name="invoice_currency"
                  value={newData.invoice_currency}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography style={{ color: "white" }}>
                  Customer Number
                </Typography>
                <TextField
                  label="Customer Number"
                  variant="filled"
                  fullWidth
                  name="customer_number"
                  value={newData.customer_number}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#666767" }}>
          <Button
            onClick={handleAnalytics}
            fullWidth
            variant="outline"
            style={{
              color: "white", borderColor: "white", backgroundColor: '#fc7500', width: '50%'
            }}
          >
            SUBMIT
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            fullWidth
            variant="outline"
            style={{ color: "white", borderColor: "white", backgroundColor: ' #db4437', width: '50%' }}
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
      <DialogChart open={chartOpen} setOpen={setChartOpen} chart={chart} />
    </ThemeProvider>
  );
}
