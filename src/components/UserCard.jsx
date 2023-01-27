import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import DataTreeView from "./NestedSelect";

export default function UserCard({
  id,
  name,
  sectors,
  agreeToTerms,
  handleDelete,
  treeItems,
  getAllUsers,
}) {
  const [enableUpdate, setEnableUpdate] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedSectors, setUpdatedSectors] = useState("");
  //   const [allSectors, setAllSectors] = useState([]);
  const [updatedAgreeToTerms, setUpdatedAgreeToTerms] = useState(agreeToTerms);

  const updateUser = async (id) => {
    const res = await axios.patch(`http://localhost:4000/user/${id}`, {
      name: updatedName,
      sectors: updatedSectors,
      agreeToTerms: updatedAgreeToTerms,
    });
    console.log(res, "update res");
    if (res.status == 200) {
      getAllUsers();
      setEnableUpdate(false);
    }
  };

  const handleName = (event) => {
    setUpdatedName(event.target.value);
  };
  const handleTerm = (event) => {
    setUpdatedAgreeToTerms(event.target.checked);
  };

  return (
    <div className="min-w-[200px] min-h-[200px] border border-[#e6e6e6] rounded p-4">
      {enableUpdate ? (
        <div className="">
          <div className="w-fit mx-auto">
            <div className="">
              <TextField
                helperText="Please enter your name"
                id="demo-helper-text-misaligned"
                label="Name"
                // defaultValue={name}
                value={updatedName}
                onChange={handleName}
              />
            </div>
            <DataTreeView
              setAllSectors={setUpdatedSectors}
              selected={sectors}
              treeItems={treeItems}
            />
            <p className="text-xs text-[#787878]">
              use <kbd>Ctrl</kbd> + <kbd>Shift</kbd> for multiple select
            </p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={updatedAgreeToTerms}
                  onChange={handleTerm}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label=" Agree to terms
        "
            />
            <br />
            <div className="flex justify-between items-center">
              <button
                // onClick={handleSave}
                onClick={() => setEnableUpdate(false)}
                className="bg-gray-400 text-white px-6 py-2.5 border border-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => updateUser(id)}
                className="bg-green-800 text-white px-6 py-2.5 border border-gray-300 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <p>{name}</p>
          <p>{sectors}</p>
          <p>{agreeToTerms}</p>
          <div className="flex items-center justify-between gap-1">
            <button
              onClick={() => setEnableUpdate(true)}
              className="bg-green-800 text-white px-4 py-2"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(id)}
              className="bg-red-800 text-white px-4 py-2"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
