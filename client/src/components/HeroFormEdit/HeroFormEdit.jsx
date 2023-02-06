import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Container,
  ButtonGroup,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Avatar,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material/";
import { GrTypography, GrBox } from "./HeroFormEdit.styles";
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getHero, updateHero } from "../../redux/heroes/heroSlice";

import data from "../../data/countries.json";

const genders = ["Male", "Female", "Binary", "Non-Binary"];
const countries = data;

const HeroFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    gender: "",
    country: "",
    email: "",
    profilePicture: "",
  });
  const [open, setOpen] = React.useState(false);

  const { name, description, gender, country, email, profilePicture } =
    formData;

  const { error, hero } = useSelector((state) => ({
    ...state.hero,
  }));
  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (id) {
      dispatch(getHero(id));
    }
  }, [dispatch, id]);

  React.useEffect(() => {
    if (hero) {
      setFormData({ ...hero });
    }
  }, [hero]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (user?.user?._id === hero?.user) {
      dispatch(updateHero({ id, formData, toast, navigate }));
      setTimeout(() => {
        setOpen(open);
      }, 10000);
    } else {
      toast.error("Some fields are required");
      setOpen(!open);
    }
  };

  React.useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div style={{ position: "relative" }}>
      <Container maxWidth="lg">
        <GrBox>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={12}>
              <Box sx={{ my: 4 }}>
                <GrTypography variant="h5" component="p" color="grey.900">
                  EDIT YOUR HERO&apos;S PROFILE
                </GrTypography>
              </Box>
              <form noValidate autoComplete="off" onSubmit={onSubmit}>
                <Grid
                  item
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="stretch"
                  rowSpacing={4}
                >
                  <Grid item xs={12} md={12}>
                    <InputLabel>Edit your hero&apos;s name</InputLabel>
                    <TextField
                      name="name"
                      value={name}
                      type="text"
                      required
                      fullWidth
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <InputLabel>Edit your hero&apos;s description</InputLabel>
                    <TextField
                      name="description"
                      value={description}
                      type="text"
                      required
                      multiline
                      rows={4}
                      fullWidth
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6} lg={6} xl={6}>
                    <InputLabel>
                      Select your hero&apos;s gender: <strong>{gender}</strong>
                    </InputLabel>
                    <FormControl fullWidth>
                      <Select
                        name="gender"
                        type="text"
                        required
                        value={gender}
                        onChange={onChange}
                      >
                        {genders.map((gender, i) => (
                          <MenuItem key={i} value={gender}>
                            {gender}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6} xl={6}>
                    <InputLabel>
                      Select your hero&apos;s country:{" "}
                      <strong>{country}</strong>
                    </InputLabel>
                    <FormControl fullWidth>
                      <Select
                        name="country"
                        type="text"
                        required
                        value={country}
                        label="Select your hero's country"
                        onChange={onChange}
                      >
                        {countries.map((country, i) => (
                          <MenuItem key={i} value={country}>
                            {country}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <InputLabel>Edit your hero&apos;s email</InputLabel>
                    <TextField
                      name="email"
                      value={email}
                      type="email"
                      fullWidth
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Stack direction="row" spacing={2}>
                      <InputLabel>
                        Change your hero&apos;s profile picture
                      </InputLabel>
                      <Avatar
                        alt="Remy Sharp"
                        src={profilePicture?.url || profilePicture}
                        sx={{ width: 24, height: 24 }}
                      />
                    </Stack>

                    <FileBase
                      type="file"
                      value={profilePicture}
                      multiple={false}
                      onDone={({ base64 }) =>
                        setFormData({ ...formData, profilePicture: base64 })
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    {user?.user?._id === hero?.user ? (
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        fullWidth
                      >
                        <Button
                          variant="contained"
                          size="large"
                          color="secondary"
                          type="submit"
                          fullWidth
                        >
                          <GrTypography
                            variant="h5"
                            component="p"
                            color="grey.900"
                          >
                            NEXT
                          </GrTypography>
                        </Button>
                        <Button component={Link} to="/express-gratitude">
                          <GrTypography
                            variant="p"
                            component="p"
                            color="grey.900"
                          >
                            Skip
                          </GrTypography>
                        </Button>
                      </ButtonGroup>
                    ) : (
                      <Typography
                        align="center"
                        variant="h6"
                        component="h6"
                        sx={{
                          color: "#fff",
                          backgroundColor: "#f54242",
                          padding: 2,
                        }}
                      >
                        Sorry you do not have permission to edit this hero
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </GrBox>

        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </div>
  );
};

export default HeroFormEdit;
