import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EmployeeDetail = () => {
  const { id } = useParams();
  const employee = useSelector((state) => state.employees.find((e) => e.id === id));

  if (!employee) return <div>Employee not found</div>;

  return (
    <div>
      <h2>{employee.name}</h2>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <img src={employee.profileImage} alt="Profile" width={150} />
    </div>
  );
};

export default EmployeeDetail;
