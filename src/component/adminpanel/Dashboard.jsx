import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    services: 0,
    products: 0,
    blogs: 0,
    visitors: 0,
  });

  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [ordersData, setOrdersData] = useState({ labels: [], datasets: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Use your actual API endpoints
        const [productsRes, servicesRes, blogsRes] = await Promise.all([
          axios.get("https://apis.innobrains.pk/api/product"),
          axios.get("https://apis.innobrains.pk/api/service"),
          axios.get("https://apis.innobrains.pk/api/blog"),
        ]);

        // For visitors, you might still need a placeholder or another endpoint
        const visitorsCount = 1250; // Placeholder value, replace with actual API call if available

        // Update stats with the total counts from your APIs
        setStats({
          products: productsRes.data.length,
          services: servicesRes.data.length,
          blogs: blogsRes.data.length,
          visitors: visitorsCount,
        });

        // Dummy Data for Sales (you can replace this with actual sales data API)
        const dummySales = [
          { date: "January", amount: 100 },
          { date: "February", amount: 150 },
          { date: "March", amount: 200 },
          { date: "April", amount: 250 },
          { date: "May", amount: 300 },
          { date: "June", amount: 350 },
        ];

        const salesLabels = dummySales.map((sale) => sale.date);
        const salesValues = dummySales.map((sale) => sale.amount);

        setSalesData({
          labels: salesLabels,
          datasets: [
            {
              label: "Sales",
              data: salesValues,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });

        // Dummy Data for Orders (you can replace this with actual orders data API)
        const dummyOrders = [
          { date: "January", count: 30 },
          { date: "February", count: 45 },
          { date: "March", count: 60 },
          { date: "April", count: 75 },
          { date: "May", count: 90 },
          { date: "June", count: 105 },
        ];

        const ordersLabels = dummyOrders.map((order) => order.date);
        const ordersValues = dummyOrders.map((order) => order.count);

        setOrdersData({
          labels: ordersLabels,
          datasets: [
            {
              label: "Total Orders",
              data: ordersValues,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load dashboard data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 lg:w-[80%] ml-auto flex items-center justify-center">
        <p className="text-xl">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 lg:w-[80%] ml-auto flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 lg:w-[80%] ml-auto">
      <div className="p-2 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex space-x-4">
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded">
              New
            </button> */}
            {/* <button className="bg-gray-200 px-4 py-2 rounded">Filters</button> */}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card for Services */}
          <div className="bg-green-600 text-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Services</h2>
            <p className="mt-4 text-4xl">{stats.services}</p>
          </div>

          {/* Card for Products */}
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Products</h2>
            <p className="mt-4 text-4xl">{stats.products}</p>
          </div>

          {/* Card for Blogs */}
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Blogs</h2>
            <p className="mt-4 text-4xl">{stats.blogs}</p>
          </div>

          {/* Card for Visitors */}
          <div className="bg-red-600 text-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Visitors</h2>
            <p className="mt-4 text-4xl">{stats.visitors}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Sales Value Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Sales Value</h2>
            <Line data={salesData} />
          </div>

          {/* Total Orders Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Total Orders</h2>
            <Bar data={ordersData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;