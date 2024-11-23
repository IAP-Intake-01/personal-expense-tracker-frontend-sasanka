import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddExpenses from "../forms/AddExpenseForm";
import DataTable from "../forms/ExpensesTable";
import PieChartCatagory from "../charts/CategoryPieChart";
import SignOut from "../../common/components/SignOut";
import { Navigate, Route, Routes } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TableChartIcon from '@mui/icons-material/TableChart';
import MonthBarChart from "../charts/MonthlyBarChart";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "expenses",
    title: "Add Expenses",
    icon: <AddCircleIcon />,
  },
  {
    segment: "data-table",
    title: "Data Table",
    icon: <TableChartIcon />,
  },
  {
    segment: "catagory",
    title: "Month Expenses for Category",
    icon: <DescriptionIcon />,
  },
  {
    segment: "month-expenses",
    title: "Month Expenses Chart",
    icon: <BarChartIcon />,
  },


];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardContent() {
  const router = useDemoRouter("");

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div
              style={{
                margin: "3px",
                marginRight: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CurrencyExchangeIcon
                fontSize="large"
                style={{ color: "#1976d2" }}
              />
            </div>

            <Typography
              variant="h6"
              style={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Personal Expenses Tracker
            </Typography>
          </Box>
        ),
        title: (
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SignOut />
            </Box>

          </Box>
        ),
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        {router.pathname === "/dashboard" || router.pathname === "/" ? (
          <DataTable />
        ) : router.pathname === "/expenses" ? (
          <AddExpenses />
        ) : router.pathname === "/data-table" ? (
          <DataTable />
        ) : router.pathname === "/catagory" ? (
          <PieChartCatagory />
        ) : router.pathname === "/month-expenses" ? (
          <MonthBarChart />
        ) : null}
      </DashboardLayout>
    </AppProvider>
  );
}

function Dashboard() {
  return (
    <Box>
      <Routes>
        <Route path="/dashboard" element={<DashboardContent />} />
        <Route path="/expenses" element={<AddExpenses />} />
        <Route path="/data-table" element={<DataTable />} />
        <Route path="/reports/catagory" element={<PieChartCatagory />} />
        <Route path="/reports/month-expenses" element={<MonthBarChart />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Box>
  );
}

export default Dashboard;
