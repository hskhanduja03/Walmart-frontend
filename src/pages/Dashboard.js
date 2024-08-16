import React, { useState, useEffect } from 'react';
import Dashboardcartup from '../components/Dashboardcartup';
import TopLoader from 'react-top-loading-bar';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [salesLength, setSalesLength] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setProgress(70);
    const fetchData = async () => {
      const queryProducts = `query Products { 
        products {
          productName
          costPrice
          sellingPrice
          quantity
          categoryName
          productId
        }
      }`;

      const querySalesLength = `query Query {
        salesLength
      }`;

      try {
        const [productsResponse, salesResponse] = await Promise.all([
          fetch(process.env.REACT_APP_BACKEND_LINK, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ query: queryProducts }),
          }),
          fetch(process.env.REACT_APP_BACKEND_LINK, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              query: querySalesLength,
            }),
          }),
        ]);

        if (!productsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const productsResult = await productsResponse.json();
        const salesResult = await salesResponse.json();

        setDashboardData(productsResult.data.products);
        setSalesLength(salesResult.data.salesLength);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setProgress(100);
      }
    };

    fetchData();
  }, []);

  // Prepare data for the bar chart with top 5 products based on profit
  const getProfitChartData = () => {
    if (!dashboardData) return { labels: [], datasets: [] };

    // Calculate profit for each product and sort by highest profit
    const productsWithProfit = dashboardData.map(product => ({
      productName: product.productName,
      profit: product.sellingPrice - product.costPrice,
      quantity: product.quantity,
    }));

    // Sort by profit and take top 5
    const topProducts = productsWithProfit
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 5);

    const labels = topProducts.map(product => product.productName);
    const profits = topProducts.map(product => product.profit);

    return {
      labels,
      datasets: [
        {
          label: 'Profit',
          data: profits,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(255, 159, 64, 0.8)',
        },
      ],
    };
  };

  // Compute the most selling category
  const getMostSellingCategory = () => {
    if (!dashboardData) return { categoryName: "", quantity: 0 };

    // Calculate total quantity per category
    const categoryQuantities = dashboardData.reduce((acc, product) => {
      acc[product.categoryName] = (acc[product.categoryName] || 0) + product.quantity;
      return acc;
    }, {});

    // Find the category with the highest quantity
    const mostSellingCategory = Object.keys(categoryQuantities).reduce((maxCategory, category) => 
      categoryQuantities[category] > categoryQuantities[maxCategory] ? category : maxCategory
    , Object.keys(categoryQuantities)[0]);

    return {
      categoryName: mostSellingCategory,
      quantity: categoryQuantities[mostSellingCategory],
    };
  };

  // Compute the most profitable product
  const getMostProfitableProduct = () => {
    if (!dashboardData) return { productName: "", profit: 0 };

    // Calculate profit for each product
    const productsWithProfit = dashboardData.map(product => ({
      productName: product.productName,
      profit: product.sellingPrice - product.costPrice,
    }));

    // Find the product with the highest profit
    const mostProfitableProduct = productsWithProfit.reduce((maxProduct, product) => 
      product.profit > maxProduct.profit ? product : maxProduct
    , { productName: "", profit: 0 });

    return mostProfitableProduct;
  };

  const mostSellingCategory = getMostSellingCategory();
  const mostProfitableProduct = getMostProfitableProduct();

  return (
    <>
      <section className="topdasboard body-font">
        <TopLoader
          progress={progress}
          color="#00bcd4"
          height={4}
          className="absolute top-16 left-0 right-0 z-50"
        />
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {dashboardData && (
              <Dashboardcartup
                num={dashboardData.length}
                title={"Total listed products"}
              />
            )}
            {salesLength !== null && (
              <Dashboardcartup num={salesLength} title={"Total Sales"} />
            )}
            {mostProfitableProduct && (
              <Dashboardcartup
                num={mostProfitableProduct.profit}
                title={"Most Profitable Product"}
                subTitle={mostProfitableProduct.productName}
              />
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-rows-2 md:grid-cols-2 m-5 gap-5">
          <div className="h-screen flex justify-center items-center border-2 p-5 bg-gray-100 rounded-lg shadow-lg">
            <Bar
              data={getProfitChartData()}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Top 5 Most Profitable Products',
                    font: {
                      size: 20,
                    },
                    color: '#333',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(200, 200, 200, 0.2)',
                    },
                    ticks: {
                      color: '#555',
                      font: {
                        size: 14,
                      },
                    },
                  },
                  x: {
                    grid: {
                      color: 'rgba(200, 200, 200, 0.2)',
                    },
                    ticks: {
                      color: '#555',
                      font: {
                        size: 14,
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div className="h-screen flex justify-center items-center border-2 p-5 bg-gray-100 rounded-lg shadow-lg">
            <Bar
              data={{
                labels: [mostSellingCategory.categoryName],
                datasets: [
                  {
                    label: 'Quantity Sold',
                    data: [mostSellingCategory.quantity],
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Most Selling Category',
                    font: {
                      size: 20,
                    },
                    color: '#333',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(200, 200, 200, 0.2)',
                    },
                    ticks: {
                      color: '#555',
                      font: {
                        size: 14,
                      },
                    },
                  },
                  x: {
                    grid: {
                      color: 'rgba(200, 200, 200, 0.2)',
                    },
                    ticks: {
                      color: '#555',
                      font: {
                        size: 14,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;