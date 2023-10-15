

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
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {LocationData} from "../../../Data/LocationData.jsx";
import JobCategories from "./CategoriesSelector/JobCategories.jsx";
import LocationSelector from "./CategoriesSelector/LocationSelector.jsx";
import "./JobTradeButtonUI.css"
import UserTradeLists from "./UserTradeLists.jsx";
import {useUser} from "../../AuthPageComp/AuthProvider.jsx";
import addJob from "../../DataAPIHandler/AddJob.jsx";
import createTrade from "../../DataAPIHandler/CreateTrade.jsx";
import {useState} from "react";

export default function JobTradeButtonUI({cardTitleChosen, cardDescriptionChosen, otherChosenID}) {

    const user = useUser();

    const [open, setOpen] = React.useState(false);
    const [SelfCardChoseID, setSelfCardChoseID] = useState('')

    function selfTradeChose(cardChose){
        setSelfCardChoseID(cardChose["_id"])
    }

    const tradeSubmitHandler = async () => {
        try {
            if (!cardTitleChosen || !cardDescriptionChosen) {
                throw new Error('Invalid data. Please select valid choices.');
            }

            const response = await createTrade(otherChosenID, SelfCardChoseID, user["email"].split('@')[0]);

            if (response === "Trade offer created successfully") {
                alert("Trade offer created successfully");
            } else {
                throw new Error(response);
            }
        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        }
        setOpen(false);
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
                startDecorator={<SwapHorizRoundedIcon />}
                onClick={() => setOpen(true)}
            >
                Trade Jobs
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ backgroundColor: "rgb(126 34 206)", width: "500px" }}>
                    <DialogTitle sx={{color: "white", fontSize: "1.8rem"}}>Trade Jobs</DialogTitle>
                    <DialogContent sx={{color: "white", fontSize: "1rem"}}>
                        Fill in the information to trade jobs.
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                tradeSubmitHandler();
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Job Chose Title</FormLabel>
                                    <Input disabled defaultValue={cardTitleChosen}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Job Chose Description</FormLabel>
                                    <Input disabled defaultValue={cardDescriptionChosen}/>
                                </FormControl>

                                <UserTradeLists onCardSelect={selfTradeChose}/>

                                <Button type="submit" >Request Trade</Button>
                            </Stack>
                        </form>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
