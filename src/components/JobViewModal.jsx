import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95vw', md: '80vw' },
    height: { xs: '95vh', md: '80vh' },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const crossStyle = {
    position: 'absolute',
    top: '-11px',
    right: '-11px',
    backgroundColor: '#42dd42',
    color: '#fff',
    padding: '4px',
    borderRadius: '2rem',
    cursor: 'pointer'
}

const JobViewModal = ({ openModal, setOpenModal, item }) => {
    const { position_name, company_name, overview, responsibilities, requirements, level, shift, type, location } = item.post;
    console.log(item);
    return (
        <div>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" component='div' sx={{ display: 'flex', alignItems: 'center', height: '15%' }}>
                        <Typography id="modal-modal-title" variant="h5" sx={{ pr: 4, borderRight: '1px solid darkgray', mr: 2 }}>
                            {position_name}
                        </Typography>
                        <Typography id="modal-modal-title" variant="p" sx={{ pr: 4, borderRight: '1px solid darkgray', mr: 2 }}>
                            {company_name}
                        </Typography>
                        <Typography id="modal-modal-title" component="span" sx={{ width: 'fit-content', fontSize: '12px', color: 'cadetblue' }}>
                            Added by: {item.user.name}
                        </Typography>
                    </Typography>
                    <Box sx={{ height: '70%', overflowY: 'scroll', mb: '18px' }}>
                        <Typography id="modal-modal-title" component='div' sx={{ mb: 5 }}>
                            <Typography id="modal-modal-title" variant="h5" sx={{ mb: 1 }}>
                                Overview:
                            </Typography>
                            <Typography id="modal-modal-title" variant="p" sx={{ width: 'fit-content', }}>
                                {overview}
                            </Typography>
                        </Typography>
                        <Typography id="modal-modal-title" component='div' sx={{ mb: 5 }}>
                            <Typography id="modal-modal-title" variant="h5" sx={{ mb: 1 }}>
                                Responsibilities:
                            </Typography>
                            <Typography id="modal-modal-title" variant="p" sx={{ width: 'fit-content', }}>
                                {responsibilities}
                            </Typography>
                        </Typography>
                        <Typography id="modal-modal-title" component='div' sx={{ mb: 5 }}>
                            <Typography id="modal-modal-title" variant="h5" sx={{ mb: 1 }}>
                                Requirements:
                            </Typography>
                            <Typography id="modal-modal-title" variant="p" sx={{ width: 'fit-content', }}>
                                {requirements}
                            </Typography>
                        </Typography>
                        <Typography component='div' sx={{ mb: 5, textTransform: 'capitalize' }}>
                            <Typography id="modal-modal-title" component="div">
                                Type: {type}
                            </Typography>
                            <Typography id="modal-modal-title" component="div">
                                Level: {level}
                            </Typography>
                            <Typography id="modal-modal-title" component="div">
                                Shift: {shift}
                            </Typography>
                            <Typography id="modal-modal-title" component="div">
                                Location: {location}
                            </Typography>
                        </Typography>
                    </Box>
                    <Button sx={{ padding: '8px 30px', fontSize: '14px', mt: 'auto' }} variant='contained'>APPLY NOW</Button>
                    <CancelOutlinedIcon
                        sx={crossStyle}
                        onClick={() => setOpenModal(false)}
                    />
                </Box>
            </Modal>
        </div >
    );
}
export default JobViewModal;