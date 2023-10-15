

import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useEffect, useState} from "react";
import LocationSelector from "./CategoriesSelector/LocationSelector.jsx";
import JobCategories from "./CategoriesSelector/JobCategories.jsx";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import {LocationData} from "../../../Data/LocationData.jsx";
import {JobCategoriesData} from "../../../Data/JobCategoriesData.jsx";
import {supabase} from "../../../Data/SupabaseData.jsx";


export default function JobAddButtonUI({passData}) {

    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        deadline: '',
        user_id: '',
        timestamp: Date.now(),
        currentUser: "",
        otherUser: "",
        username: ''
    });

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                if (value.data?.user) {
                    setFormData({
                        ...formData,
                        "user_id": value.data.user.id,
                        "username": value.data.user.email.split('@')[0]
                    });
                }
            });
        }
        getUserData();
    }, []);



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(formData)
        passData(formData);

        setOpen(false);

        setFormData({
            title: '',
            description: '',
            category: '',
            location: '',
            deadline: '',
            user_id: '',
            timestamp: '',
            currentUser: "",
            otherUser: "",
            username: ''
        });
    };

    return (
        <React.Fragment>
            <Button
                sx={{
                    backgroundColor: "rgb(88 28 135)", // Use the correct syntax for specifying background color
                    color: "white",
                    '&:hover': {
                        backgroundColor: "rgb(99,11,169)", // Darker purple on hover
                    }
                }}
                className="bg-purple-900 text-white px-2 py-1 rounded-md flex transition-colors duration-300 border-2 border-purple-500 hover:bg-purple-950"
                variant="outlined"
                color="info"
                startDecorator={<AddCircleOutlineRoundedIcon />}
                onClick={() => setOpen(true)}
            >
                Add Jobs
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ backgroundColor: "rgb(126 34 206)", width: "500px" }}>
                    <DialogTitle sx={{ color: "white", fontSize: "1.8rem" }}>Add Jobs</DialogTitle>
                    <DialogContent sx={{ color: "white", fontSize: "1rem" }}>
                        Fill in the information to add jobs.
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Job Title</FormLabel>
                                    <Input
                                        autoFocus
                                        required
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Job Description</FormLabel>
                                    <Input
                                        required
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Categories</FormLabel>
                                    <select
                                        className="w-full p-2 border rounded-md bg-white text-gray-700"
                                        placeholder="Choose one…"
                                        required
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>Select a category...</option>
                                        {JobCategoriesData.map((value, index) => (
                                            <option key={index} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Location</FormLabel>
                                    <select
                                        className="w-full p-2 border rounded-md bg-white text-gray-700"
                                        placeholder="Choose one…"
                                        required
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>Select a location...</option>

                                        {LocationData.map((value, index) => (
                                            <option key={index} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Deadline</FormLabel>
                                    <Input
                                        type="date"
                                        required
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <Button type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
