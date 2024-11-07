import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import instance from "../../services/AxiosOrder"; // Axios instance import

export default function UpdateExpense({ expenseId, expenseData, open, onClose }) {
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(""); // State variable for amount
  const [description, setDescription] = useState(""); // State variable for description
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

  // Update the state whenever expenseData changes
  useEffect(() => {
    if (expenseData) {
      setAmount(expenseData.amount || "");
      setDescription(expenseData.description || "");
      setValue(categories.indexOf(expenseData.category)); // Set the selected tab based on category
    }
  }, [expenseData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpdate = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Check if expenseId is defined
    if (!expenseId) {
      console.error("Expense ID is undefined");
      alert("Invalid expense ID.");
      return; // Prevent request with undefined ID
    }

    try {
      const response = await instance.put(`/update-expense/${expenseId}`, {
        category: categories[value], // Selected category
        amount: amount,
        description: description,
      });
      alert(response.data); // Show success message
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Failed to update expense:", error);
      alert("Failed to update expense");
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>UPDATE FORM</DialogTitle>
        <form onSubmit={handleUpdate}> {/* Form submission handling */}
          <DialogContent>
            <Box sx={{ mt: 3 }}>
              <Paper
                elevation={4}
                sx={{ marginRight: "10%", marginLeft: "10%", padding: 2 }}
              >
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
                        <InputAdornment position="start">
                          LKR :
                        </InputAdornment>
                      }
                      label="Amount"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)} // Update amount state
                    />
                    <Box>
                      <TextField
                        sx={{ m: 1 }}
                        id="standard-basic"
                        label="Description"
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Update description state
                        fullWidth
                        multiline
                        minRows={1}
                        maxRows={4}
                      />
                    </Box>
                  </FormControl>
                </Box>
              </Paper>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">UPDATE CONFIRM</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
