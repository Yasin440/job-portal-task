import { Box, List, Paper, Collapse, Container, Typography, ListItemText, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState } from 'react';
import JobViewModal from './JobViewModal';
import { Link } from 'react-router-dom';


const JobPostAsCategory = () => {
    const [expanded, setExpanded] = useState({ 0: false });
    const [openModal, setOpenModal] = useState(false);
    const [showPost, setShowPost] = useState({});
    const handleShowJob = (index) => {
        setExpanded({ [index]: !expanded[index] || false });
    };
    const handleShowModal = (post) => {
        setOpenModal(true);
        setShowPost(post);
    }
    const Data = [
        {
            category: 'Development',
            post: [
                {
                    name: 'Front End Developer',
                    company_name: 'TechForing Ltd',
                    overview: 'We are looking for a JavaScript developer who is proficient with React.js. Your primary focus will be on developing user interface components and implementing them. You will ensure that these components and the overall application are robust and easy to maintain. You will coordinate with the rest of the team working on different layers of the infrastructure. Therefore, a commitment to collaborative problem solving, sophisticated design, and quality products are important.',
                    responsibilities: 'Developing new user-facing features using React.js.Building reusable components and front-end libraries for future use.Translating designs and wireframes into high-quality code.Optimizing components for maximum performance across a vast array of web-capable devices and browsers.',
                    requirements: 'Bachelor’s degree in CSE. For the people who have at least 1 year of experience in React js. Freshers are also encouraged to apply.',
                    type: 'fill time',
                    location: 'dhaka',
                    level: 'mid level',
                    shift: 'day'
                },
                {
                    name: 'Backend End Developer',
                    company_name: 'TechForing Ltd',
                    overview: 'We are looking for a JavaScript developer who is proficient with React.js. Your primary focus will be on developing user interface components and implementing them. You will ensure that these components and the overall application are robust and easy to maintain. You will coordinate with the rest of the team working on different layers of the infrastructure. Therefore, a commitment to collaborative problem solving, sophisticated design, and quality products are important.',
                    responsibilities: 'Developing new user-facing features using React.js.Building reusable components and front-end libraries for future use.Translating designs and wireframes into high-quality code.Optimizing components for maximum performance across a vast array of web-capable devices and browsers.',
                    requirements: 'Bachelor’s degree in CSE. For the people who have at least 1 year of experience in React js. Freshers are also encouraged to apply.',
                    type: 'fill time',
                    location: 'dhaka',
                    level: 'mid level',
                    shift: 'day'
                },
            ]
        },
        {
            category: 'Marketing',
            post: [
                {
                    name: 'Marketing Manager',
                    company_name: 'TechForing Ltd',
                    overview: 'We are looking for a JavaScript developer who is proficient with React.js. Your primary focus will be on developing user interface components and implementing them. You will ensure that these components and the overall application are robust and easy to maintain. You will coordinate with the rest of the team working on different layers of the infrastructure. Therefore, a commitment to collaborative problem solving, sophisticated design, and quality products are important.',
                    responsibilities: 'Developing new user-facing features using React.js.Building reusable components and front-end libraries for future use.Translating designs and wireframes into high-quality code.Optimizing components for maximum performance across a vast array of web-capable devices and browsers.',
                    requirements: 'Bachelor’s degree in CSE. For the people who have at least 1 year of experience in React js. Freshers are also encouraged to apply.',
                    type: 'fill time',
                    location: 'dhaka',
                    level: 'mid level',
                    shift: 'day'
                },
                {
                    name: 'Sales executive',
                    company_name: 'TechForing Ltd',
                    overview: 'We are looking for a JavaScript developer who is proficient with React.js. Your primary focus will be on developing user interface components and implementing them. You will ensure that these components and the overall application are robust and easy to maintain. You will coordinate with the rest of the team working on different layers of the infrastructure. Therefore, a commitment to collaborative problem solving, sophisticated design, and quality products are important.',
                    responsibilities: 'Developing new user-facing features using React.js.Building reusable components and front-end libraries for future use.Translating designs and wireframes into high-quality code.Optimizing components for maximum performance across a vast array of web-capable devices and browsers.',
                    requirements: 'Bachelor’s degree in CSE. For the people who have at least 1 year of experience in React js. Freshers are also encouraged to apply.',
                    type: 'fill time',
                    location: 'dhaka',
                    level: 'mid level',
                    shift: 'day'
                },
            ]
        }
    ]
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
                    {Data?.map((item, index) => (
                        <Paper key={index} className='jobCategoryCard' >
                            <Box onClick={() => handleShowJob(index)} sx={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
                                <Typography
                                    component='p'
                                    sx={{ fontSize: { xs: '17px', md: '19px' }, fontWeight: '600', width: '100%' }}
                                > {item.category}</Typography>
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
                                        item.post?.map((post, index2) => (
                                            <ListItemText
                                                key={index2}
                                                className='listItem'
                                                sx={{ bgcolor: 'background.paper' }}
                                                primary={
                                                    <>
                                                        <Typography sx={{ textTransform: 'capitalize' }}>{post.name}</Typography>
                                                        <Button
                                                            onClick={() => handleShowModal(post)}
                                                        >apply now</Button>
                                                    </>
                                                }
                                            />
                                        ))
                                    }
                                </List>
                            </Collapse>
                        </Paper>
                    ))}
                </Box>
                {/* job view modal */}
                <JobViewModal openModal={openModal} setOpenModal={setOpenModal} post={showPost} />
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