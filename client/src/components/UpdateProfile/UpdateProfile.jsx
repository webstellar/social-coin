import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, TextField, Button, Grid, CssBaseline } from "@mui/material/";
import { GrTypography, GrContainer } from "./UpdateProfile.styles";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile, editProfile } from "../../redux/auth/myAuthSlice";
import FileBase from "react-file-base64";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    _id: "",
  });

  const { name, email, profilePicture, _id } = formData;
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setFormData({ ...user?.user });
    }
  }, [user]);

  const id = _id;

  console.log(formData);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name && email && profilePicture) {
      console.log(formData);
      dispatch(editProfile({ id, formData, navigate, toast }));
    }
  };

  return (
    <>
      <CssBaseline />
      <GrContainer maxWidth="xs">
        <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="stretch"
            rowSpacing={3}
          >
            <Grid
              item
              xs={12}
              md={12}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <GrTypography
                variant="h6"
                component="p"
                color="grey.900"
                gutterBottom
              >
                EDIT YOUR PROFILE
              </GrTypography>
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                required
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                label="FULL NAME"
                style={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                required
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                label="EMAIL"
                style={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormData({ ...formData, profilePicture: base64 })
                }
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <img
                src={profilePicture || profilePicture.url}
                alt={name}
                style={{ width: "100%", height: "400px" }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                type="submit"
                sx={{
                  borderRadius: 0,
                  mb: 2,
                }}
                fullWidth
              >
                <GrTypography variant="h5" component="p" color="grey.900">
                  UPDATE
                </GrTypography>
              </Button>
            </Grid>
            <Grid item xs={12} md={12}></Grid>
          </Grid>
        </Box>
      </GrContainer>
    </>
  );
};

UpdateProfile.propTypes = {
  handleRClose: PropTypes.func,
};

export default UpdateProfile;
