import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { EditTitleApi } from '../../redux/Slices/EditTitle';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

interface EditTitleFormValues {
  title: string;
}

const EditTitle: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { editDataId } = useParams() as { editDataId: string };

  const formik = useFormik<EditTitleFormValues>({
    initialValues: {
      title: location.state as string,
    },
    onSubmit: (values) => {
      dispatch(EditTitleApi(editDataId, values.title));
      navigate('/admin');
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
  };

  return (
    <Box className="formBodyStyle">
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing={2} className="form_container">
          <Typography variant="h3">Edit Title Here</Typography>
          <TextField
            label="Enter text Here"
            name="title"
            value={formik.values.title}
            onChange={handleTitleChange}
            onBlur={formik.handleBlur}
          />
          <Button variant="contained" type="submit" disabled={!formik.dirty}>
            Submit
          </Button>
          <Link to="/admin" style={{width:'100%'}}>
            <Button sx={{ width: '100%' }} variant="contained">
              Cancel
            </Button>
          </Link>
        </Stack>
      </form>
    </Box>
  );
};

export default EditTitle;
