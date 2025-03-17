import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import ServiceForm from "./ServiceForm";

const Service = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 9;
  const [showForm, setShowForm] = useState(false);
  const [editService, setEditService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("https://apis.innobrains.pk/api/service");
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      const response = await fetch(
        `https://apis.innobrains.pk/api/service/${serviceId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setServices((prevServices) =>
          prevServices.filter((service) => service._id !== serviceId)
        );
      } else {
        throw new Error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const handleEdit = (service) => {
    setEditService(service);
    setShowForm(true);
  };

  const handleAddNewService = () => {
    setEditService(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchServices();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 lg:w-[80%] ml-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {showForm
            ? editService
              ? "Edit Service"
              : "Add New Service"
            : "Services"}
        </h1>
        {!showForm && (
          <button
            onClick={handleAddNewService}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Service
          </button>
        )}
      </div>

      {showForm ? (
        <ServiceForm service={editService} onClose={handleFormClose} />
      ) : (
        <>
          <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className="border-b-1">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Service Name</th>
                    <th className="px-4 py-2 hidden md:table-cell">
                      Description
                    </th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentServices.map((service) => (
                    <tr key={service._id} className="border-t">
                      <td className="px-4 py-2">
                        <img
                          src={`https://apis.innobrains.pk/ServiceImage/${service.image}`}
                          alt={service.name}
                          className="w-16 h-16 rounded-md"
                          onError={(e) => {
                            e.target.src = "/images/default-image.jpg"; // Handle image error
                          }}
                        />
                      </td>
                      <td className="px-4 py-2">{service.name}</td>
                      <td className="px-4 py-2 hidden md:table-cell">
                        {service.description}
                      </td>
                      <td className="px-4 py-2 flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
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

          <div className="flex justify-between items-center mt-4">
            <span>
              Showing {indexOfFirstService + 1}-{" "}
              {Math.min(indexOfLastService, services.length)} of{" "}
              {services.length}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
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
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
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

export default Service;
