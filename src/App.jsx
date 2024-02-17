import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from "./hook/useFetchdata";
import profileFallback from "./assets/profile-img.jpeg";

const App = () => {
  const { data, loading, error } = useFetch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetail, setshowDetail] = useState(false);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="spinner-border text-white" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-white">Error: {error}</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-white">No results found.</p>;
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setshowDetail(true);
  };
  const handleClose = () => {
    setSelectedUser(null);
    setshowDetail(false);
  };

  return (
    <div className="detail-container">
      <div className="detail gap-3">
        <ul className="list-group user-list">
          <li className="list-group-item fs-2 fw-bolder">Users</li>
          {data.map((item, index) => (
            <li
              className={`list-group-item d-flex justify-content-between align-items-center ${
                selectedUser === item ? "active" : ""
              }`}
              key={index}
            >
              <img
                src={profileFallback}
                className="profile-img"
                alt="profile-img"
              />
              <div className="w-100">
                <h5 className="mb-1">
                  {item.profile.firstName} {item.profile.lastName}
                </h5>
                <p className="mb-1">{item.jobTitle}</p>
              </div>
              <button
                className="badge bg-primary rounded-pill"
                onClick={() => handleUserClick(item)}
              >
                View
              </button>
            </li>
          ))}
        </ul>

        {showDetail && (
          <div className="user-details">
            <h2>User Details</h2>
            <img className="rounded" src={profileFallback || selectedUser?.avatar} alt="profile-img" />
            <p>
              <span className="fw-bolder">Username:</span>{" "}
              {selectedUser.profile.username}
            </p>
            <p>
              <span className="fw-bolder">Name:</span>{" "}
              {selectedUser.profile.firstName} {selectedUser.profile.lastName}
            </p>
            <p>
              <span className="fw-bolder">Email:</span>{" "}
              {selectedUser.profile.email}
            </p>
            <p>
              <span className="fw-bolder">Job Title:</span>{" "}
              {selectedUser.jobTitle}
            </p>
            <p>
              <span className="fw-bolder">Bio:</span> {selectedUser.Bio}
            </p>
            <button
              type="button"
              className="btn btn-info"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
