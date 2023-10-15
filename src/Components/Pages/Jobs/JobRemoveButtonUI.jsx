
import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import createTrade from "../../DataAPIHandler/CreateTrade.jsx";
import deleteJob from "../../DataAPIHandler/DeleteJob.jsx";

export default function JobRemoveButtonUI({cardID, cardTitle, onRemove}) {


    const [open, setOpen] = React.useState(false);

    const buttonStyle = {
        backgroundColor: '#9f1c1c',  // Background color
        color: 'white',             // Text color
        display: 'flex',            // Center content horizontally
        transition: 'background-color 0.3s, border-color 0.3s',
        borderColor: '#d9534f',
        '&:hover': {
            backgroundColor: "#af3733", // Darker purple on hover
        }
    };

    const RemoveJobHandler = async () => {

        const response = await deleteJob(cardID);

        if (response === "Job deleted successfully") {
            setOpen(false);
            onRemove(cardID);
        } else {
            throw new Error(response);
        }


    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="danger"
                startDecorator={<DeleteForever />}
                onClick={() => setOpen(true)}
                sx={buttonStyle} // Add your custom styles here
            >
                Discard
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        {`Are you sure you want to discard ${cardTitle}?`}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={RemoveJobHandler}>
                            Discard Job
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
