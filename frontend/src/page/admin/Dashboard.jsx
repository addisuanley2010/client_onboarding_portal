import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { FaUsers, FaProjectDiagram, FaUserClock, FaUserCheck, FaUserTimes, FaUserPlus, FaChartLine, FaDollarSign, FaCalculator, FaMoneyBillWave, FaSpinner, FaCheckCircle, FaEnvelope, FaUserTag, FaClock } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { totalUsers,usersByRole,usersByStatus,recentUsers } = useSelector((state) => state.dashboardList);
  useEffect(() => {
    dispatch({ type: 'usersList/dashboard' });
  }, [dispatch]);

  return (
    <div className="mt-24 px-4 mx-auto max-w-7xl  ">
      <h1 className="text-2xl font-bold mb-8 text-gray-800 flex items-center">
        <FaChartLine className="mr-2 text-blue-500" />
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Total Users</h2>
            <FaUsers className="text-blue-500 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-4">{totalUsers}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Users by Role</h2>
            <FaUserTag className="text-green-500 text-2xl" />
          </div>
          {usersByRole.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span className="capitalize text-gray-600 flex items-center">
                <FaUserCheck className="mr-2 text-green-500" />
                {item.role}
              </span>
              <span className="font-bold text-gray-800">{item.count}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Users by Status</h2>
            <FaUserClock className="text-purple-500 text-2xl" />
          </div>
          {usersByStatus.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span className="capitalize text-gray-600 flex items-center">
                {item.status === 'Approved' ? 
                  <FaCheckCircle className="mr-2 text-green-500" /> : 
                  <FaSpinner className="mr-2 text-yellow-500" />
                }
                {item.status}
              </span>
              <span className="font-bold text-gray-800">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-bold text-gray-800 p-6 border-b flex items-center">
          <FaUserPlus className="mr-2 text-blue-500" />
          Recent Users
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-1" />
                    Email
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaUserTag className="mr-1" />
                    Role
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaUserClock className="mr-1" />
                    Status
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    Created At
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status === 'Approved' ? <FaCheckCircle className="mr-1" /> : <FaSpinner className="mr-1" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;