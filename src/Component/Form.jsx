import React from "react";
import styles from "../styles.module.css";

export default function Form({
  data,
  handleChange,
  handleSubmit,
  handleUpdateData,
}) {
  return (
    <div className={styles.PanelContent_second}>
      <h2>Enter Details</h2>
      <div className={styles.formContent}>
        <form onSubmit={handleSubmit}>
          <div className="left">
            <label>ID</label>
            <input
              type="number"
              name="id"
              onChange={handleChange}
              required
              value={data.id}
            />
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              onChange={handleChange}
              required
              value={data.first_name}
            />
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              onChange={handleChange}
              required
              value={data.last_name}
            />
          </div>

          <div className="right">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              required
              value={data.email}
            />

            <label>Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              required
              value={data.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label>Age</label>
            <input
              type="number"
              name="age"
              onChange={handleChange}
              required
              value={data.age}
            />
          </div>

          <div className={styles.buttoncontainer}>
            <button type="submit" className={styles.add}>
              Add
            </button>
            <button
              type="button"
              className={styles.update}
              onClick={handleUpdateData}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
