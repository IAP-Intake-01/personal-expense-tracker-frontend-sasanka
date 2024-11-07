import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import instance from '../../services/AxiosOrder';
import { Box } from '@mui/material';

const MonthBarChart = () => {
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const monthNames = [
        'Jan.', 'Feb.', 'March', 'April', 'May', 'June',
        'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('get-monthly-expenses');
                setMonthlyExpenses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const dataset = monthlyExpenses.map((expense) => ({
        month: monthNames[expense.month -1],  // Convert month number to name
        total: parseFloat(expense.total) || 0,  // Ensure total is a valid number (parse string to float)
    }));

    return (
        <Box sx={{m:10}}>
            <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <BarChart
                    dataset={dataset}
                    yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    series={[{ dataKey: 'total', label: 'Total Expenses' }]}
                    layout="horizontal"
                    grid={{ vertical: true }}
                    width={1000}
                    height={400}
                />
            )}
        </div>
        </Box>
    );
};

export default MonthBarChart;
