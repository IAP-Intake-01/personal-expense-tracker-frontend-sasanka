import React from "react";
import AddExpense from "../../../components/forms/AddExpenseForm";
import DataTable from "../../../components/forms/ExpensesTable";
import PieChartCategory from "../../../components/charts/CategoryPieChart";
import MonthBarChart from "../../../components/charts/MonthlyBarChart";

const routes = [
  {
    path: "/expenses",
    element: <AddExpense />,
    key: "add-expenses",
  },
  {
    path: "/data-table",
    element: <DataTable />,
    key: "data-table",
  },
  {
    path: "/reports/category",  // Corrected path spelling
    element: <PieChartCategory />,
    key: "category-pie-chart",
  },
  {
    path: "/reports/month-expenses",
    element: <MonthBarChart />,
    key: "month-bar-chart",
  },
];


export default routes;
