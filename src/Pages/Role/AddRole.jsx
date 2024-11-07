import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { addRole } from "../../DAL/role";
const AddRole = () => {
  const [name, setName] = useState("");
  const handleRole = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    const result = await addRole(formData);
    if (result.status == true) {
      alert(result?.message);
    }
  };
  return (
    <div className="form-area">
      <form onSubmit={handleRole}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Role
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="name"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRole;
