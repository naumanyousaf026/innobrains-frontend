import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ProductForm from "./ProductForm"; // Assuming the ProductForm is a separate component

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [showForm, setShowForm] = useState(false); // Toggle between form and product list
  const [editProduct, setEditProduct] = useState(null); // Store the product being edited

  // Fetch products data from the backend API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://apis.innobrains.pk/api/product");
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Handle Delete functionality
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `https://apis.innobrains.pk\/api/product/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle Edit functionality
  const handleEdit = (product) => {
    setEditProduct(product); // Set the product to be edited
    setShowForm(true); // Show the form for editing
  };

  const handleAddNewProduct = () => {
    setEditProduct(null); // Clear editProduct to add a new product
    setShowForm(true); // Show the form for adding
  };

  // Return to the product list view
  const handleFormClose = () => {
    setShowForm(false);
    fetchProducts(); // Fetch updated products after form submission
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 lg:w-[80%] ml-auto">
      {/* Top Section with dynamic header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-2xl font-semibold">
          {showForm
            ? editProduct
              ? "Edit Product"
              : "Add New Product"
            : "Products"}
        </h1>
        {!showForm && (
          <button
            onClick={handleAddNewProduct} // Show the ProductForm on button click
            className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-blue-600"
          >
            Add New Product
          </button>
        )}
      </div>

      {/* Conditionally show the form or the product table */}
      {showForm ? (
        <ProductForm
          product={editProduct} // Pass the product to be edited or null for a new product
          onClose={handleFormClose} // Close the form after submission or cancellation
        />
      ) : (
        <>
          {/* Product Table */}
          <div className="max-w-full lg:max-w-7xl mx-auto bg-white shadow-md rounded-lg">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className="border-b-1">
                  <tr>
                    <th className="px-2 py-2 sm:px-4">Image</th>
                    <th className="px-2 py-2 sm:px-4">Name</th>
                    <th className="px-2 py-2 sm:px-4 hidden lg:table-cell">
                      Description
                    </th>
                    <th className="px-2 py-2 sm:px-4">Link</th>
                    <th className="px-2 py-2 sm:px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        <img
                          src={`https://apis.innobrains.pk/uploads/${product.image}`}
                          alt={product.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2 hidden lg:table-cell">
                        {/* Show only on large screens and above */}
                        {product.description}
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href={product.link}
                          className="text-blue-500 hover:underline break-all"
                        >
                          {product.link}
                        </a>
                      </td>
                      <td className="px-4 py-2 flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(product)} // Edit button functionality
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)} // Delete button functionality
                          className="text-red-500 hover:text-red-600"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
            <span className="text-sm">
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, products.length)} of{" "}
              {products.length}
            </span>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 py-1 sm:px-3 sm:py-1 rounded ${
                  currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 py-1 sm:px-3 sm:py-1 rounded ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 sm:px-3 sm:py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSection;
