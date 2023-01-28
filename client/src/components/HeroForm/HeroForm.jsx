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
  Backdrop,
  CircularProgress,
} from "@mui/material/";
import { GrTypography, GrBox } from "./HeroForm.styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createHero } from "../../redux/heroes/createHeroSlice";

import data from "../../data/countries.json";

const genders = ["Male", "Female", "Binary", "Non-Binary"];
const countries = data;

const HeroForm = () => {
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
  const [currentStep, setCurrentStep] = React.useState(1);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const { name, description, gender, country, email, profilePicture } =
    formData;

  const { error, hero } = useSelector((state) => ({ ...state.newhero }));

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setOpen(!open);
    if (name && description && gender && country && profilePicture) {
      dispatch(createHero({ formData, navigate, toast, hero }));
      setTimeout(() => {
        setOpen(open);
      }, 10000);
    }
  };

  React.useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Container maxWidth="sm">
      <GrBox>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={12}>
            <Box sx={{ my: 4 }}>
              <GrTypography
                variant="h6"
                component="p"
                color="grey.900"
                sx={{ textAlign: "center" }}
              >
                WHAT IS THE NAME OF YOUR HERO
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
                {currentStep === 1 && (
                  <>
                    <Grid item xs={12} md={12}>
                      <TextField
                        name="name"
                        value={name}
                        type="text"
                        required
                        fullWidth
                        label="Add your hero's name"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        fullWidth
                      >
                        <Button component={Link} to="/express-gratitude">
                          <GrTypography
                            variant="p"
                            component="p"
                            color="grey.900"
                          >
                            Skip to Create Gratitude
                          </GrTypography>
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={handleNext}
                          fullWidth
                          endIcon={
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                          }
                        >
                          <GrTypography variant="h6" component="p" color="fff">
                            NEXT
                          </GrTypography>
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <Grid item xs={12} md={12}>
                      <TextField
                        name="description"
                        value={description}
                        type="text"
                        required
                        multiline
                        rows={4}
                        fullWidth
                        label="Describe your hero"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        fullWidth
                      >
                        <Button
                          onClick={handlePrev}
                          startIcon={<ArrowBackIosIcon />}
                          sx={{ color: "grey.900" }}
                        >
                          <GrTypography
                            variant="p"
                            component="p"
                            color="grey.900"
                          >
                            Prev
                          </GrTypography>
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={handleNext}
                          fullWidth
                          endIcon={
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                          }
                        >
                          <GrTypography variant="h6" component="p" color="fff">
                            NEXT
                          </GrTypography>
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                        <InputLabel>Select your hero&apos;s gender</InputLabel>
                        <Select
                          name="gender"
                          type="text"
                          required
                          value={gender}
                          label="Select your hero's gender"
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
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                        <InputLabel>Select your hero&apos;s country</InputLabel>
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

                    <Grid item xs={12} md={12}>
                      <InputLabel>
                        Do you want to inform your hero of your testimony?
                      </InputLabel>
                      <TextField
                        name="email"
                        value={email}
                        type="email"
                        fullWidth
                        label="Add your hero’s email address"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        fullWidth
                      >
                        <Button
                          onClick={handlePrev}
                          startIcon={<ArrowBackIosIcon />}
                          sx={{ color: "grey.900" }}
                        >
                          <GrTypography
                            variant="p"
                            component="p"
                            color="grey.900"
                          >
                            Prev
                          </GrTypography>
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={handleNext}
                          fullWidth
                          endIcon={
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                          }
                        >
                          <GrTypography variant="h6" component="p" color="fff">
                            NEXT
                          </GrTypography>
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <InputLabel sx={{ mb: 2 }}>
                        Upload a picture of your hero (optional)
                      </InputLabel>

                      <Box>
                        <img
                          src={
                            formData.profilePicture ||
                            "https://source.unsplash.com/random"
                          }
                          alt=""
                          style={{
                            width: 250,
                            height: 250,
                            objectFit: "cover",
                            borderRadius: "0.5rem",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                          setFormData({ ...formData, profilePicture: base64 })
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        fullWidth
                      >
                        <Button
                          onClick={handlePrev}
                          startIcon={<ArrowBackIosIcon />}
                          sx={{ color: "grey.900" }}
                        >
                          <GrTypography
                            variant="p"
                            component="p"
                            color="grey.900"
                          >
                            Prev
                          </GrTypography>
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          color="secondary"
                          type="submit"
                          fullWidth
                        >
                          <GrTypography variant="h5" component="p" color="#fff">
                            PUBLISH
                          </GrTypography>
                        </Button>
                      </ButtonGroup>
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
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </GrBox>
    </Container>
  );
};

export default HeroForm;
