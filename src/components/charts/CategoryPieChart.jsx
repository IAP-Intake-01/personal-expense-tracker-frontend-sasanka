import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import instance from "../../services/AxiosOrder";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function PieChartCategory() {
  const [expensesData, setExpensesData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("expenses-current-month");

        const formattedData = response.data.map((expense) => ({
          id: expense.category,
          value: expense.total_amount,
          label: expense.category,
        }));

        setExpensesData(formattedData);
      } catch (error) {
        console.error("Failed to fetch expenses data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (event, itemIdentifier, item) => {
    setSelectedExpense(item); // Display details of selected category
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Paper
        elevation={4}
        sx={{ marginRight: "10%", marginLeft: "10%", padding: 2 }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Typography
            component="pre"
            sx={{
              maxWidth: { xs: "100%", md: "50%" },
              flexShrink: 1,
              overflow: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {selectedExpense ? (
              <>
                {selectedExpense.label.toUpperCase()}
                <br /><br />
                Total Amount: LKR {selectedExpense.value}
              </>
            ) : (
              ""
            )}
          </Typography>

          <PieChart
            series={[
              {
                data: expensesData, 
              },
            ]}
            onItemClick={handleClick}
            width={500}
            height={400}
            margin={{ right: 200 }}
          />
        </Stack>
      </Paper>
    </Box>
  );
}
