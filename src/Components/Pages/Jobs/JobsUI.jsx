
import JobAddButtonUI from "./JobAddButtonUI.jsx";
import React, {useEffect, useState} from "react";
import JobsCardUI from "./JobsCardUI.jsx";
import addJob from "../../DataAPIHandler/AddJob.jsx";
import {CircularProgress} from "@mui/material";
import Alert from '@mui/material/Alert';


function JobsUI(){

    const [formDataList, setFormDataList] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleRemoveCard = (cardID) => {
        setFormDataList(formDataList.filter((card) => card._id !== cardID));
    };

        useEffect(() => {
            async function fetchData() {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/view_all_jobs`);
                    const data = await response.json();
                    setFormDataList(data)
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            }

            fetchData();
        }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-50px)] -mt-20">
                <CircularProgress color="secondary" size={70} />
            </div>
        );
    }

    const receiveFormData = async (data) => {
        const response = await addJob(data);

        if (response === "Job added successfully") {
            setFormDataList([data, ...formDataList]);
            return (
                <Alert severity="success">Job added successfully!</Alert>
            );
        } else {
            console.error(response);
        }
    };


    return (
        <div className={"px-3 flex flex-col gap-3"}>
            <div className={"flex justify-between items-center"}>
                <h1 className={"text-purple-100 font-bold text-3xl"}>Jobs Listings</h1>

                <div className="flex justify-end">
                    <JobAddButtonUI passData={receiveFormData}/>
                </div>
            </div>

            {
                formDataList.reverse().map((value, index) => (
                    <JobsCardUI key={index} data={value} onRemove={handleRemoveCard}/>
                ))
            }
        </div>
    )

}

export default JobsUI