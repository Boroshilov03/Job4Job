
import React, { useEffect, useState } from "react";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import UserTradeListsUI from "./UserTradeListsUI.jsx";
import { useUser } from "../../AuthPageComp/AuthProvider.jsx";

function UserTradeLists({onCardSelect}) {

    const user = useUser();

    const [UserList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState(""); // State to hold the selected value

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/alljobsbyuser/${user.id}`);
                const data = await response.json();
                setUserList(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleSelectChange = (event) => {
        onCardSelect(event.target.value)
        setSelectedValue(event.target.value);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-50px)] -mt-20">
                <CircularProgress color="secondary" size={50} />
            </div>
        );
    }

    return (
        <>
            <FormControl>
                <InputLabel style={{ color: 'white' }}>Choose an item</InputLabel>
                <Select value={selectedValue} onChange={handleSelectChange}>
                    {UserList.map((value, index) => (
                        <MenuItem key={index} value={value}>
                            <UserTradeListsUI data={value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}

export default UserTradeLists;
