import { Box, List, Paper, Collapse, Container, Typography, ListItemText, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import JobViewModal from './JobViewModal';
import { Link } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';


const JobPostAsCategory = () => {
    const [expanded, setExpanded] = useState({ 0: false });
    const [openModal, setOpenModal] = useState(false);
    const [showPost, setShowPost] = useState({});
    const { getAllJobPost, jobPost, deletePost } = useAuth();
    const handleShowJob = (index) => {
        setExpanded({ [index]: !expanded[index] || false });
    };
    const handleShowModal = (item) => {
        setOpenModal(true);
        setShowPost(item);
    }
    //deletePost
    const handleDeletePost = (id) => {
        deletePost(id);
    }
    //get all job
    useEffect(() => {
        getAllJobPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Container>
                <Typography variant="h2"
                    sx={{ fontSize: { xs: '18px', md: '32px' }, fontWeight: 'bold', marginTop: '60px', position: 'relative' }}
                    align='center'
                    className='title'
                >
                    BROWSE OPEN POSITIONS BY CATEGORY
                </Typography>
                <Typography component='p' align='center'>
                    We are always on the lookout for talanted people
                </Typography>
                <Box sx={{ marginTop: '60px' }}>
                    {jobPost.allCategory?.map((category, index) =>
                    (
                        <Paper key={index} className='jobCategoryCard' >
                            <Box onClick={() => handleShowJob(index)} sx={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
                                <Typography
                                    component='p'
                                    sx={{ fontSize: { xs: '17px', md: '19px' }, fontWeight: '600', width: '100%' }}
                                > {category}</Typography>
                                {!expanded[index] ?
                                    <AddIcon
                                        onClick={() => handleShowJob(index)}
                                        expand={expanded}
                                        sx={{ cursor: 'pointer' }}
                                        aria-expanded={expanded}
                                        aria-label="show job list"
                                    />
                                    :
                                    <RemoveIcon
                                        onClick={() => handleShowJob(index)}
                                        expand={expanded}
                                        sx={{ cursor: 'pointer' }}
                                        aria-expanded={expanded}
                                        aria-label="show job list"
                                    />
                                }
                            </Box>
                            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                                <List
                                    component='div'
                                >
                                    {
                                        // eslint-disable-next-line array-callback-return
                                        jobPost.posts?.map((item, index2) => {
                                            if (category === item.category) {
                                                return (
                                                    <ListItemText
                                                        key={index2}
                                                        className='listItem'
                                                        sx={{ bgcolor: 'background.paper' }}
                                                        primary={
                                                            <>
                                                                <Typography sx={{ textTransform: 'capitalize' }}>{item.post.position_name}</Typography>
                                                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <DeleteIcon
                                                                        className='deleteBtn' fontSize="small"
                                                                        onClick={() => handleDeletePost(item._id)} />
                                                                    <Button
                                                                        onClick={() => handleShowModal(item)}
                                                                    >
                                                                        apply now
                                                                    </Button>
                                                                </Typography>
                                                            </>
                                                        }
                                                    />
                                                )
                                            }
                                        })
                                    }
                                </List>
                            </Collapse>
                        </Paper>
                    ))}
                </Box>
                {/* job view modal */}
                {openModal && <JobViewModal openModal={openModal} setOpenModal={setOpenModal} item={showPost} />}
                {/* add post btn */}
                <Typography component='div' align='center' sx={{ mt: 8 }}>
                    <Link to='/add_new_job_post'>
                        <Button variant='contained'>Add New Post</Button>
                    </Link>
                </Typography>
            </Container>
        </div >
    );
};

export default JobPostAsCategory;