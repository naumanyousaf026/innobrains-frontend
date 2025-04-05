import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    services: 0,
    products: 0,
    blogs: 0,
    visitors: 0,
  });
  const [loading, setLoading] = useState(true);

  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [ordersData, setOrdersData] = useState({ labels: [], datasets: [] });
  const [distributionData, setDistributionData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Mock API responses instead of actual calls
        // This simulates getting data without changing the backend
        const mockResponses = {
          services: Array(12).fill().map((_, i) => ({ id: i, name: `Service ${i}` })),
          products: Array(24).fill().map((_, i) => ({ id: i, name: `Product ${i}` })),
          blogs: Array(8).fill().map((_, i) => ({ id: i, title: `Blog ${i}` })),
          visitors: Array(156).fill().map((_, i) => ({ id: i, name: `Visitor ${i}` })),
        };

        // Update stats with counts from mock responses
        setStats({
          services: mockResponses.services.length,
          products: mockResponses.products.length,
          blogs: mockResponses.blogs.length,
          visitors: mockResponses.visitors.length,
        });

        // Sales data for line chart
        const salesMonths = ["January", "February", "March", "April", "May", "June"];
        const salesValues = [100, 150, 200, 250, 300, 350];

        setSalesData({
          labels: salesMonths,
          datasets: [
            {
              label: "Sales",
              data: salesValues,
              fill: true,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.4,
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(75, 192, 192, 1)",
            },
          ],
        });

        // Orders data for bar chart
        const ordersMonths = ["January", "February", "March", "April", "May", "June"];
        const ordersValues = [30, 45, 60, 75, 90, 105];

        setOrdersData({
          labels: ordersMonths,
          datasets: [
            {
              label: "Total Orders",
              data: ordersValues,
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });

        // Distribution data for doughnut chart
        setDistributionData({
          labels: ["Services", "Products", "Blogs", "Visitors"],
          datasets: [
            {
              data: [
                mockResponses.services.length,
                mockResponses.products.length,
                mockResponses.blogs.length,
                mockResponses.visitors.length,
              ],
              backgroundColor: [
                "rgba(46, 204, 113, 0.8)",
                "rgba(52, 152, 219, 0.8)",
                "rgba(155, 89, 182, 0.8)",
                "rgba(231, 76, 60, 0.8)",
              ],
              borderColor: [
                "rgba(46, 204, 113, 1)",
                "rgba(52, 152, 219, 1)",
                "rgba(155, 89, 182, 1)",
                "rgba(231, 76, 60, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Performance",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Order Volume",
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Content Distribution",
      },
    },
    cutout: "70%",
  };

  // Animation for number counting
  const AnimatedCounter = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!loading) {
        const duration = 1000; // ms
        const frameRate = 20; // ms
        const increment = value / (duration / frameRate);
        let currentCount = 0;
        
        const timer = setInterval(() => {
          currentCount += increment;
          if (currentCount >= value) {
            clearInterval(timer);
            setCount(value);
          } else {
            setCount(Math.floor(currentCount));
          }
        }, frameRate);
        
        return () => clearInterval(timer);
      }
    }, [value, loading]);

    return <span>{count}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:w-[80%] ml-auto">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
            Analytics Dashboard
          </h1>
          <div className="flex items-center space-x-2 text-sm">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              Last updated: {new Date().toLocaleDateString()}
            </span>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
              Refresh Data
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Services Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
            <div className="px-6 py-8 flex flex-col items-center justify-center text-white">
              <div className="text-5xl font-bold mb-2">
                {loading ? "..." : <AnimatedCounter value={stats.services} />}
              </div>
              <div className="text-lg font-medium uppercase tracking-wider">Services</div>
              <div className="mt-4 text-green-100 text-sm">
                Business solutions offered
              </div>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
            <div className="px-6 py-8 flex flex-col items-center justify-center text-white">
              <div className="text-5xl font-bold mb-2">
                {loading ? "..." : <AnimatedCounter value={stats.products} />}
              </div>
              <div className="text-lg font-medium uppercase tracking-wider">Products</div>
              <div className="mt-4 text-blue-100 text-sm">
                Items available for purchase
              </div>
            </div>
          </div>

          {/* Blogs Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
            <div className="px-6 py-8 flex flex-col items-center justify-center text-white">
              <div className="text-5xl font-bold mb-2">
                {loading ? "..." : <AnimatedCounter value={stats.blogs} />}
              </div>
              <div className="text-lg font-medium uppercase tracking-wider">Blogs</div>
              <div className="mt-4 text-purple-100 text-sm">
                Published articles
              </div>
            </div>
          </div>

          {/* Visitors Card */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
            <div className="px-6 py-8 flex flex-col items-center justify-center text-white">
              <div className="text-5xl font-bold mb-2">
                {loading ? "..." : <AnimatedCounter value={stats.visitors} />}
              </div>
              <div className="text-lg font-medium uppercase tracking-wider">Visitors</div>
              <div className="mt-4 text-red-100 text-sm">
                Total site visitors
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Sales Performance</h2>
            <div className="h-64">
              <Line data={salesData} options={lineOptions} />
            </div>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Order History</h2>
            <div className="h-64">
              <Bar data={ordersData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Additional Chart */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Content Distribution</h2>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="w-full md:w-1/2 h-64">
                <Doughnut data={distributionData} options={doughnutOptions} />
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-green-600 font-bold text-lg">{stats.services}</div>
                    <div className="text-gray-600">Services</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-blue-600 font-bold text-lg">{stats.products}</div>
                    <div className="text-gray-600">Products</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-purple-600 font-bold text-lg">{stats.blogs}</div>
                    <div className="text-gray-600">Blogs</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-red-600 font-bold text-lg">{stats.visitors}</div>
                    <div className="text-gray-600">Visitors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;