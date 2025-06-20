import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ManageUser = () => {
  const { users } = useSelector((state) => state.usersList);
  const dispatch = useDispatch();

  const [usersList, setUsersList] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    dispatch({ type: "usersList/user-list" });
  }, [dispatch]);

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  const handleDelete = (email) => {
    setUserToDelete(email);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    dispatch({
      type: "usersList/delete-user",
      payload: { email: userToDelete, callBack },
    });
    setShowConfirmDialog(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setUserToDelete(null);
  };

  const callBack = (email) => {
    setUsersList(usersList.filter((user) => user.email !== email));
  };

  const callBack2 = (email, status) => {
    setUsersList((prevList) =>
      prevList.map((user) => {
        if (user.email === email) {
          return { ...user, status: status };
        }
        return user;
      })
    );
  };

  const handleStatusChange = (email, status) => {
    dispatch({
      type: "usersList/update-status",
      payload: { email, status, callBack2 },
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-auto my-4 md:my-16 bg-gray-50 px-4 md:px-12 py-16 md:py-4">
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="min-w-full overflow-x-auto">
          {/* Desktop view */}
          <table className="min-w-full divide-y divide-gray-200 hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersList?.map((user, id) => (
                <tr key={user.email}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {id + 1}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.companyName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.companySize} employees
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {user.contactPerson}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.industryType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {user.serviceNeeded}
                    </div>
                    {user.customService && (
                      <div className="text-sm text-gray-500">
                        {user.customService}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {user.budgetRange}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.expectedTimeline}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : user.status === "In Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : user.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <select
                      value={user.status}
                      onChange={(e) =>
                        handleStatusChange(user.email, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-1 bg-white focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => handleDelete(user.email)}
                      disabled={user.role === "admin"}
                      className={`font-bold py-1 px-3 rounded ml-2 ${
                        user.role === "admin"
                          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-700 text-white"
                      }`} >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {usersList?.map((user) => (
              <div key={user.email} className="bg-white shadow rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {user.companyName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user.companySize} employees
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.contactPerson}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                  </div>
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.industryType}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Service Needed:</p>
                    <p className="text-sm text-gray-900">
                      {user.serviceNeeded}
                    </p>
                    {user.customService && (
                      <p className="text-sm text-gray-500">
                        {user.customService}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Budget & Timeline:</p>
                    <p className="text-sm text-gray-900">{user.budgetRange}</p>
                    <p className="text-sm text-gray-500">
                      {user.expectedTimeline}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Project Description:</p>
                    <p className="text-sm text-gray-700">
                      {user.projectDescription}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status:</p>
                    <div
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : user.status === "In Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : user.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <select
                        value={user.status}
                        onChange={(e) =>
                          handleStatusChange(user.email, e.target.value)
                        }
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm appearance-none bg-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Review">In Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDelete(user.email)}
                        disabled={user.role === "admin"}
                        className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md ${
                          user.role === "admin"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
