import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import instance from "../../services/AxiosOrder";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import UpdateExpense from "../forms/UpdateExpense";

const columns = [
  { field: "category", headerName: "Category", width: 100 },
  { field: "amount", headerName: "Amount", type: "number", width: 150 },
  { field: "date", headerName: "Date", width: 250 },
  { field: "description", headerName: "Description", width: 400 }
];

export default function DataTable() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("expense-tracker-token");
        const response = await instance.get("get-all-expenses", {
          headers: {
            Authorization: ` ${token}`,
          },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleSelectionChange = (selectionModel) => {
    setSelectedIds(selectionModel);
    if (selectionModel.length === 1) {
      const selectedExpenseData = expenses.find(
        (expense) => expense.id === selectionModel[0]
      ); // Get selected expense data
      setSelectedExpense(selectedExpenseData); // Set selected expense data for update
    } else {
      setSelectedExpense(null); // Reset selected expense if not exactly one is selected
    }
  };

  const handleDelete = async () => {
    try {
      for (const id of selectedIds) {
        await instance.delete(`/delete-expense/${id}`);
      }
      alert("Selected expenses deleted successfully");
      setExpenses(
        expenses.filter((expense) => !selectedIds.includes(expense.id))
      );
      setSelectedIds([]);
    } catch (error) {
      console.error("Failed to delete expenses:", error);
      alert("Failed to delete selected expenses");
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenUpdateDialog = () => {
    if (selectedIds.length !== 1) {
      // Check if exactly one expense is selected
      alert("Please select exactly one expense to update."); // Alert if not
      return;
    }
    setOpenUpdateDialog(true); // Open update dialog if one expense is selected
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setSelectedExpense(null); // Reset selected expense when closing
  };

  return (
    <Box sx={{ m: 5, borderRadius: 2, width: "full" }}>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={expenses}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          loading={loading}
          onRowSelectionModelChange={handleSelectionChange}
          getRowId={(row) => row.id}
        />
      </Paper>

      <Box sx={{ mt: -7.6, ml: 15 }}>
        {/* Delete Button */}
        <Button
          variant="outlined"
          color={selectedIds.length === 0 ? "default" : "error"}
          onClick={handleOpenDeleteDialog}
          disabled={selectedIds.length === 0}
          sx={{ mt: 2, ml: 2 }}
        >
          Delete Selected
        </Button>

        {/* Update Button */}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenUpdateDialog}
          disabled={selectedIds.length !== 1}
          sx={{ mt: 2, ml: 2 }}
        >
          Update Selected
        </Button>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the selected expenses? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      <UpdateExpense
        expenseId={selectedExpense?.id}
        expenseData={selectedExpense}
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
      />
    </Box>
  );
}
