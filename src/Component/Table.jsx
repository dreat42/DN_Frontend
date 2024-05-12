import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";

export default function Table({ formData, setFormData }) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dn-backend-h186.onrender.com/get");

      const responseData = await response.json();

      console.log(responseData);
      setFormData(responseData);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.PanelContent_third}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
