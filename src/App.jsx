import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DataTreeView from "./components/NestedSelect";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress, FormControlLabel, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import UserCard from "./components/UserCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const sectors = [
//   {
//     id: 1,
//     name: "Sectors",
//     children: [
//       {
//         id: 2,
//         name: "Manufacturing",
//         children: [
//           {
//             id: 3,
//             name: "Construction materials",
//           },
//           {
//             id: 4,
//             name: "Electronics and Optics",
//           },
//           {
//             id: 5,
//             name: "Food and Beverage",
//             children: [
//               {
//                 id: 6,
//                 name: "Bakery &amp; confectionery products",
//               },
//               {
//                 id: 7,
//                 name: "Beverages",
//               },
//               {
//                 id: 8,
//                 name: "Fish &amp; fish products",
//               },
//               {
//                 id: 9,
//                 name: "Meat &amp; meat products",
//               },
//               {
//                 id: 10,
//                 name: "Milk &amp; dairy products",
//               },
//               {
//                 id: 11,
//                 name: "Other",
//               },
//               {
//                 id: 12,
//                 name: "Sweets &amp; snack food",
//               },
//             ],
//           },
//           {
//             id: 13,
//             name: "Furniture",
//             children: [
//               {
//                 id: 14,
//                 name: "Bathroom/sauna",
//               },
//               {
//                 id: 15,
//                 name: "Bedroom",
//               },
//               {
//                 id: 16,
//                 name: "Children???s room",
//               },
//               {
//                 id: 17,
//                 name: "Kitchen",
//               },
//               {
//                 id: 18,
//                 name: "Living room",
//               },
//               {
//                 id: 19,
//                 name: "Office",
//               },
//               {
//                 id: 20,
//                 name: "Other (Furniture)",
//               },
//               {
//                 id: 21,
//                 name: "Outdoor",
//               },
//               {
//                 id: 22,
//                 name: "Project furniture",
//               },
//             ],
//           },
//           {
//             id: 23,
//             name: "Machinery",
//             children: [
//               {
//                 id: 24,
//                 name: "Machinery components",
//               },
//               {
//                 id: 25,
//                 name: "Machinery equipment/tools",
//               },
//               {
//                 id: 26,
//                 name: "Manufacture of machinery",
//               },
//               {
//                 id: 27,
//                 name: "Maritime",
//                 children: [
//                   {
//                     id: 28,
//                     name: "Aluminium and steel workboats",
//                   },
//                   {
//                     id: 29,
//                     name: "Boat/Yacht building",
//                   },
//                   {
//                     id: 30,
//                     name: "Ship repair and conversion",
//                   },
//                 ],
//               },
//               {
//                 id: 31,
//                 name: "Metal structures",
//               },
//               {
//                 id: 32,
//                 name: "Other",
//               },
//               {
//                 id: 33,
//                 name: "Repair and maintenance service",
//               },
//             ],
//           },
//           {
//             id: 34,
//             name: "Metalworking",
//             children: [
//               {
//                 id: 35,
//                 name: "Construction of metal structures",
//               },
//               {
//                 id: 36,
//                 name: "Houses and buildings",
//               },
//               {
//                 id: 37,
//                 name: "Metal products",
//               },
//               {
//                 id: 38,
//                 name: "Metal works",
//                 children: [
//                   {
//                     id: 39,
//                     name: "CNC-machining",
//                   },
//                   {
//                     id: 40,
//                     name: "Forgings, Fasteners",
//                   },
//                   {
//                     id: 41,
//                     name: "Gas, Plasma, Laser cutting",
//                   },
//                   {
//                     id: 42,
//                     name: "MIG, TIG, Aluminum welding",
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             id: 43,
//             name: "Plastic and Rubber",
//             children: [
//               {
//                 id: 44,
//                 name: "Packaging",
//               },
//               {
//                 id: 45,
//                 name: "Plastic goods",
//               },
//               {
//                 id: 46,
//                 name: "Plastic processing technology",
//                 children: [
//                   {
//                     id: 47,
//                     name: "Blowing",
//                   },
//                   {
//                     id: 48,
//                     name: "Moulding",
//                   },
//                   {
//                     id: 49,
//                     name: "Plastics welding and processing",
//                   },
//                 ],
//               },
//               {
//                 id: 50,
//                 name: "Plastic profiles",
//               },
//             ],
//           },
//           {
//             id: 51,
//             name: "Printing",
//             children: [
//               {
//                 id: 52,
//                 name: "Advertising",
//               },
//               {
//                 id: 53,
//                 name: "Book/Periodicals printing",
//               },
//               {
//                 id: 54,
//                 name: "Labelling and packaging printing",
//               },
//             ],
//           },
//           {
//             id: 55,
//             name: "Textile and Clothing",
//             children: [
//               {
//                 id: 56,
//                 name: "Clothing",
//               },
//               {
//                 id: 57,
//                 name: "Textile",
//               },
//             ],
//           },
//           {
//             id: 58,
//             name: "Wood",
//             children: [
//               {
//                 id: 59,
//                 name: "Other (Wood)",
//               },
//               {
//                 id: 60,
//                 name: "Wooden building materials",
//               },
//               {
//                 id: 61,
//                 name: "Wooden houses",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 62,
//         name: "Other",
//         children: [
//           {
//             id: 63,
//             name: "Creative industries",
//           },
//           {
//             id: 64,
//             name: "Energy technology",
//           },
//           {
//             id: 65,
//             name: "Environment",
//           },
//         ],
//       },
//       {
//         id: 66,
//         name: "Service",
//         children: [
//           {
//             id: 67,
//             name: "Business services",
//           },
//           {
//             id: 68,
//             name: "Engineering",
//           },
//           {
//             id: 69,
//             name: "Information Technology and Telecommunications",
//             children: [
//               {
//                 id: 70,
//                 name: "Data processing, Web portals, E-marketing",
//               },
//               {
//                 id: 71,
//                 name: "Programming, Consultancy",
//               },
//               {
//                 id: 72,
//                 name: "Software, Hardware",
//               },
//               {
//                 id: 73,
//                 name: "Telecommunications",
//               },
//             ],
//           },
//           {
//             id: 74,
//             name: "Tourism",
//           },
//           {
//             id: 75,
//             name: "Translation services",
//           },
//           {
//             id: 76,
//             name: "Transport and Logistics",
//             children: [
//               {
//                 id: 77,
//                 name: "Air",
//               },
//               {
//                 id: 78,
//                 name: "Rail",
//               },
//               {
//                 id: 79,
//                 name: "Road",
//               },
//               {
//                 id: 80,
//                 name: "Water",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState("");
  const [sectors, setsectors] = useState("");
  const [allSectors, setAllSectors] = useState([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sectorName, setSectorName] = useState("");
  // console.log(sectors, "sectors");
  const getSectors = async () => {
    const res = await axios.get(`https://sumu-test.onrender.com/get-sectors`);
    console.log(res?.data, "res");
    setAllSectors(res?.data);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleTerm = (event) => {
    setAgreeToTerms(event.target.checked);
  };

  const handleSave = async () => {
    setLoading(true);

    if (!name) {
      toast.warn("please add a name");
      setLoading(false);
      return;
    }
    if (!agreeToTerms) {
      toast.warn("please agree to the terms and conditions.");
      setLoading(false);
      return;
    }
    if (!sectors || !sectors?.length) {
      toast.warn("please select your sector.");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sectors", sectors);
    formData.append("agreeToTerms", agreeToTerms);
    const res = await axios.post("https://sumu-test.onrender.com/user/", {
      name,
      sectors,
      sectorName,
      agreeToTerms,
    });
    if (res.data.status === "Saved") {
      getAllUsers();
      toast.success("Added successfully.");
      setLoading(false);
    }
    setLoading(false);
    // console.log(res, "res");

    // .then(function (response) {
    //   console.log(response, "after save");
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };

  const getAllUsers = async () => {
    const res = await axios.get("https://sumu-test.onrender.com/user/");
    setAllUsers(res?.data?.users);
    console.log(res);
  };
  const handleDelete = async (id) => {
    const res = await axios.delete(`https://sumu-test.onrender.com/user/${id}`);
    console.log(res);
    if (res?.status == 200) {
      getAllUsers();
      toast.success("Deleted successfully.");
    }
  };

  console.log(allUsers, "allUsers");

  useEffect(() => {
    getSectors();
    getAllUsers();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <div className="">
        <h1 className="text-[#646cff] font-extrabold py-2 px-10 text-center">
          List of all users
        </h1>
        <div className="w-full flex gap-10 flex-wrap">
          {allUsers?.map((user) => {
            return (
              <div key={user?.id} className="">
                <UserCard
                  id={user?._id}
                  name={user?.name}
                  sectors={user?.sectors}
                  sectorName={user?.sectorName}
                  agreeToTerms={user?.agreeToTerms}
                  handleDelete={handleDelete}
                  treeItems={allSectors}
                  getAllUsers={getAllUsers}
                />
              </div>
            );
          })}
          {!allUsers.length && (
            <p className="text-center text-red-700 text-3xl mx-auto">
              No user Found
            </p>
          )}
        </div>
      </div>
      {/* <ControlledTreeView /> */}
      <h1 className="text-[#646cff] font-extrabold py-2 px-10 text-center">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h1>
      <div className="w-fit mx-auto mt-10 p-4 border-4 border-gray-300 rounded">
        <div className="">
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="Name"
            onChange={handleName}
          />
        </div>
        <p className="text-base font-extrabold text-[#646cff]">
          Select your sector
        </p>
        <DataTreeView
          setSectorName={setSectorName}
          setAllSectors={setsectors}
          treeItems={allSectors}
        />
        <p className="text-xs text-[#787878]">
          use <kbd>Ctrl</kbd> + <kbd>Shift</kbd> for multiple select
        </p>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeToTerms}
              onChange={handleTerm}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label=" Agree to terms
        "
        />
        <br />
        <button
          type="submit"
          onClick={handleSave}
          className="bg-green-800 text-white h-[50px] overflow-hidden px-6 py-2.5 border border-gray-300 rounded"
        >
          {loading ? <CircularProgress color="inherit" /> : "Save"}
        </button>
      </div>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold underline text-red-600 text-center">
        Hello world!
      </h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  );
}

export default App;
