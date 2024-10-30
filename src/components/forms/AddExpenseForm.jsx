import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import instance from "../../services/AxiosOrder";
import SchoolIcon from "@mui/icons-material/School";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

export default function AddExpense() {
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const categories = [
    "education",
    "food",
    "clothes",
    "transport",
    "entertainment",
  ];

  const icons = [
    <SchoolIcon />,
    <RamenDiningIcon />,
    <ShoppingBagIcon />,
    <EmojiTransportationIcon />,
    <SportsEsportsIcon />,
  ];

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const expenseData = {
      category: categories[value],
      amount: isNaN(parseFloat(amount)) ? 0 : parseFloat(amount),
      description: description,
    };

    const isTokenExpired = (token) => {
      if (!token) return true;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      return Date.now() > expirationTime;
    };

    const token = localStorage.getItem("expense-tracker-token");
    if (isTokenExpired(token)) console.log("Expense Data:", expenseData);
    console.log("Token:", token);

    try {
      const response = await instance.post("add-expense", expenseData, {
        headers: {
          Authorization: ` ${token}`,
        },
      });

      alert(response.data);

      setAmount("");
      setDescription("");
      setValue(0);
    } catch (error) {
      console.error("Error adding expense:", error);

      if (error.response) {
        alert(
          `Failed to add expense: ${error.response.data.message || error.message}`
        );
      } else if (error.request) {
        alert("Failed to add expense: No response from the server");
      } else {
        alert("Failed to add expense: " + error.message);
      }
    }
  };

  return (
    <Box sx={{ mt: 10 }}>
      <React.Fragment>
        <Paper
          elevation={4}
          sx={{ marginRight: "10%", marginLeft: "10%", padding: 2 }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon label tabs example"
              >
                {categories.map((category, index) => (
                  <Tab key={category} icon={icons[index]} label={category} />
                ))}
              </Tabs>

              <FormControl fullWidth sx={{ m: 1, mt: 5 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  sx={{ width: "auto" }}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">LKR :</InputAdornment>
                  }
                  label="Amount"
                  required
                  value={amount}
                  onChange={handleAmountChange}
                />
                <Box>
                  <TextField
                    sx={{ m: 1 }}
                    id="standard-basic"
                    label="Description"
                    variant="standard"
                    value={description}
                    onChange={handleDescriptionChange}
                    fullWidth
                    multiline 
                    minRows={1}
                    maxRows={4}
                  />
                </Box>
              </FormControl>

              <Button variant="outlined" type="submit" sx={{ m: 1 }}>
                Add Expense
              </Button>
            </Box>
          </form>
        </Paper>
      </React.Fragment>
    </Box>
  );
}
