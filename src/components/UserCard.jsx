import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DataTreeView from "./NestedSelect";

export default function UserCard({
  id,
  name,
  sectors,
  agreeToTerms,
  handleDelete,
  treeItems,
  getAllUsers,
  sectorName,
}) {
  const [enableUpdate, setEnableUpdate] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedSectors, setUpdatedSectors] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [allSectors, setAllSectors] = useState([]);
  const [updatedAgreeToTerms, setUpdatedAgreeToTerms] = useState(agreeToTerms);
  const [updatedSectorName, setUpdatedSectorName] = useState(sectorName);

  console.log(treeItems.flat(), "treeItems");

  const checkSector = (id) => {};

  const updateUser = async (id) => {
    setLoading(true);

    if (!updatedName) {
      toast.warn("please add a name");
      setLoading(false);
      return;
    }
    if (!updatedAgreeToTerms) {
      toast.warn("please agree to the terms and conditions.");
      setLoading(false);
      return;
    }
    if (!updatedSectors || !updatedSectors.length) {
      toast.warn("please select your sector.");
      setLoading(false);
      return;
    }
    const res = await axios.patch(`https://sumu-test.onrender.com/user/${id}`, {
      name: updatedName,
      sectors: updatedSectors,
      agreeToTerms: updatedAgreeToTerms,
      sectorName: updatedSectorName,
    });
    // console.log(res, "update res");
    if (res.status == 200) {
      getAllUsers();
      setLoading(false);
      setEnableUpdate(false);
      toast.success("Updated successfully.");
    }
    setLoading(false);
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
            <p className="text-green-800 font-extrabold">{updatedSectorName}</p>

            <p className="text-base font-extrabold text-[#646cff]">
              Update your sector
            </p>
            <DataTreeView
              setAllSectors={setUpdatedSectors}
              setSectorName={setUpdatedSectorName}
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
                className="bg-green-800 text-white overflow-hidden h-[50px] px-6 py-2.5 border border-gray-300 rounded"
              >
                {loading ? <CircularProgress color="inherit" /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2">
          <div className="flex items-center gap-4 min-h-[100px]">
            <p className="pt-1 text-green-800 ">Name:</p>
            <p className="text-xl font-extrabold">{name}</p>
          </div>

          <p className="pt-1 text-green-800 ">Sectors:</p>
          <p>
            {sectorName || "sector name"}
            {sectors?.length > 1 && "& more"}
          </p>
          <p className="min-h-[100px]">{agreeToTerms}</p>
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
