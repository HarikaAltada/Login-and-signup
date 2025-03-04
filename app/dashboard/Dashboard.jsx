"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    fetch("/api/user", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(() => {
        router.push("/");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { 
      name: "Date of Birth", 
      selector: (row) => {
        if (!row.dob) return "N/A";
        const date = new Date(row.dob);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      }, 
      sortable: true 
    },
  ];

  const customStyles = {
    table: { style: { overflowY: "auto", backdropFilter: "blur(10px)" } },
    headCells: {
      style: {
        backgroundColor: "#4A5C82",
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center",
        padding: "12px",
        fontSize: "14px",
        backdropFilter: "blur(10px)",
      },
    },
    cells: {
      style: {
        backgroundColor: "#222C48",
        color: "#ffffff",
        fontSize: "13.5px",
        textAlign: "center",
        padding: "10px",
        border: "none",
      },
    },
    rows: {
      style: { backgroundColor: "#222C48", border: "none" },
      stripedStyle: { backgroundColor: "#2A3654", border: "none" },
    },
    pagination: {
      style: {
        backgroundColor: "#222C48",
        color: "#ffffff",
        borderTop: "1px solid #2A3654",
      },
      pageButtonsStyle: {
        color: "#ffffff",
        "&:hover": { backgroundColor: "#374151" },
        "& svg": { fill: "#ffffff !important" },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Logout Button */}
      <div className="w-full flex justify-end p-2">
        <button
          onClick={handleLogout}
          className="bg-gray-600 mr-7 cursor-pointer hover:bg-gray-600 text-white px-5 py-2 rounded-3xl"
        >
          Logout
        </button>
      </div>

      <div className="w-full max-w-7xl">
        <p className="text-white text-center mb-6 text-lg font-semibold">List of Users</p>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <FontAwesomeIcon icon={faSpinner} className="text-white h-5 w-5 text-3xl animate-spin" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={users}
            pagination
            highlightOnHover
            striped
            customStyles={customStyles}
          />
        )}
      </div>
    </div>
  );
}
