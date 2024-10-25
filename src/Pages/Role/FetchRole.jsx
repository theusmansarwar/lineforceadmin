import React, { useEffect, useState } from 'react';
import { fetchRole, deleteRole, editRole } from '../../DAL/role';
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const FetchRole = () => {
  const [roleData, setRoleData] = useState([]);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const getAllRoles = async () => {
    const result = await fetchRole();
    if (result.status === true) {
      console.log("ROLE RESULT IS ", result.data.data);
      setRoleData(result.data.data);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  const handleEditClick = (id, name) => {
    setEditingRoleId(id);
    setEditValue(name);
  };

  const handleSave = async (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editValue);
    formData.append('_method', 'put');

    const result = await editRole(formData, id);
    if (result.status === true) {
      alert(`Updated role ID ${id} with value: ${editValue}`);
      setEditingRoleId(null); 
      getAllRoles();
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteRole(id);
    if (result.status === true) {
      alert("Deleted successfully");
      getAllRoles();
    }
  };

  return (
    <div>
      <ul>
        {roleData.map((data) => (
          <li key={data.id}>
            {editingRoleId === data.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <span>{data.name}</span>
            )}
            {editingRoleId === data.id ? (
              <button onClick={(e) => handleSave(e, data.id)}>Save</button>
            ) : (
              <MdModeEditOutline onClick={() => handleEditClick(data.id, data.name)} />
            )}
            <MdDelete onClick={() => handleDelete(data.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchRole;
