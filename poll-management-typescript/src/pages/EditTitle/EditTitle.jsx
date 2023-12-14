import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import { EditTitleApi } from '../../redux/Slices/EditTitle';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { dispatch } from '../../redux/store';


const EditTitle = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { editDataId } = useParams();
    const formik = useFormik({
        initialValues: {
            title: location.state
        },
        onSubmit: (values) => {
            dispatch(EditTitleApi(editDataId, values.title));
            navigate('/admin');
        },
    });

    const handleTitleChange = (e) => {
        formik.handleChange(e);
    };

    return (
        <Box className="formBodyStyle">
            <form onSubmit={formik.handleSubmit}>
                <Stack direction={"column"} spacing={2} className="form_container">
                    <Typography variant="h3">Edit Title Here</Typography>
                    <TextField
                        label={"Enter text Here"}
                        name="title"
                        value={formik.values.title}
                        onChange={handleTitleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Button variant="contained" type="submit" disabled={!formik.dirty}>
                        Submit
                    </Button>
                    <Link to={"/admin"} width="100%">
                        <Button sx={{ width: "100%" }} variant="contained">
                            Cancel
                        </Button>
                    </Link>
                </Stack>
            </form>
        </Box>
    );
}

export default EditTitle;
