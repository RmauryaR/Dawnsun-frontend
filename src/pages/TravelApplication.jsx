import React, { useState, useEffect } from "react";
import "../styles/TravelApplication.css";
const initialData = [
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "2 June, 2025",
    departureDate: "3 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "IT",
    designation: "BD",
    arrivalDate: "4 June, 2025",
    departureDate: "5 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "6 June, 2025",
    departureDate: "8 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "20 June, 2025",
    departureDate: "21 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "IT",
    designation: "BD",
    arrivalDate: "28 June, 2025",
    departureDate: "29 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "DEVELOPMENT",
    designation: "BD",
    arrivalDate: "15 June, 2025",
    departureDate: "16 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "IT",
    designation: "BD",
    arrivalDate: "18 June, 2025",
    departureDate: "19 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "4 June, 2025",
    departureDate: "5 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
];

const TravelApplication = () => {
  const [travelData, setTravelData] = useState(initialData);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const filteredData = travelData.filter((item) => {
    const values = Object.values(item).join(" ").toLowerCase();
    return values.includes(searchText.toLowerCase());
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".status-dropdown-wrapper")) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...travelData];
    updatedData[index].status = newStatus;
    setTravelData(updatedData);
    setOpenDropdownIndex(null);
  };

  return (
    <div className="travel-page">
      <div className="travel-header">
        <h2>Travel Application</h2>
        <div className="travel-actions">
          <button className="export-btn">Export to Excel</button>
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="search-btn"
              onClick={() => setSearchText(searchText)}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="travel-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL ID</th>
              <th>CONTACT NO.</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>ARRIVAL DATE</th>
              <th>DEPARTURE DATE</th>
              <th>PREFERENCE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, itemsPerPage).map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>
                  <span className="email-chip">{item.email}</span>
                </td>
                <td>{item.contact}</td>
                <td>{item.department}</td>
                <td>{item.designation}</td>
                <td>{item.arrivalDate}</td>
                <td>{item.departureDate}</td>
                <td>{item.preference}</td>
                <td>
                  <div className="status-dropdown-wrapper">
                    <button
                      className={`status-btn ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      onClick={() =>
                        setOpenDropdownIndex(
                          openDropdownIndex === idx ? null : idx
                        )
                      }
                    >
                      {item.status} ▾
                    </button>
                    {openDropdownIndex === idx && (
                      <div className="status-options">
                        <button
                          onClick={() => handleStatusChange(idx, "Decline")}
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleStatusChange(idx, "Approve")}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(idx, "In Process")}
                        >
                          In Process
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  );
};

export default TravelApplication;
