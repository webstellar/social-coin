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
  Divider,
  Typography,
  IconButton,
} from "@mui/material/";
import { GrTypography, GrBox } from "./HeroForm.styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
//import FileBase from "react-file-base64";

import HeroAutocompleteForm from "../HeroAutocompleteForm/HeroAutocompleteForm";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createHero } from "../../redux/heroes/createHeroSlice";
import HeroImage from "../../images/Hero-Image.png";

import data from "../../data/countries.json";
import { getHeroes } from "../../redux/heroes/heroesSlice";

import { useDropzone } from "react-dropzone";

const genders = ["Male", "Female", "Others"];
const countries = data;

const HeroForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    gender: "",
    country: "",
    email: null,
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
    if (name && description && profilePicture.length < 1e6) {
      dispatch(createHero({ formData, navigate, toast, hero }));
      dispatch(getHeroes());
      setTimeout(() => {
        setOpen(open);
      }, 1000);
    } else {
      toast.error("image size is larger than 1mb");
      setOpen(open);
    }
  };

  React.useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      const reader = new FileReader();
      const file = acceptedFiles[0];
      if (file > 1e6) {
        alert("Max Limit is: 1mb");
        return;
      }
      reader.onload = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };

      reader.readAsDataURL(file);
    },
    [formData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: "image/*",
  });

  const handleImageClear = () => {
    setFormData({ ...formData, profilePicture: null });
  };

  return (
    <Container maxWidth="xl">
      <GrBox>
        <Box sx={{ my: 4, mb: 5 }}>
          <GrTypography
            variant="h6"
            component="p"
            color="grey.900"
            sx={{ textAlign: "center" }}
          >
            STEP 1: SELECT YOUR HERO
          </GrTypography>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid
            item
            xs={12}
            md={5}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box sx={{ my: 4, mb: 5 }}>
              <GrTypography
                variant="h6"
                component="p"
                color="grey.900"
                sx={{ textAlign: "center" }}
              >
                CREATE A NEW HERO
              </GrTypography>
            </Box>
            <Grid item xs={12} md={12}>
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
                          <Button disabled></Button>
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
                            <GrTypography
                              variant="h6"
                              component="p"
                              color="fff"
                            >
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
                          rows={7}
                          fullWidth
                          label="Describe your hero"
                          onChange={onChange}
                        />
                        <Typography
                          component="p"
                          variant="p"
                          sx={{
                            mt: 1,
                            color: description.length > 2000 ? "red" : "#000",
                          }}
                        >
                          {description?.length} characters
                        </Typography>
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
                            onKeyPress={(e) => e.key === 13 && handleNext()}
                            fullWidth
                            endIcon={
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                            }
                          >
                            <GrTypography
                              variant="h6"
                              component="p"
                              color="fff"
                            >
                              NEXT
                            </GrTypography>
                          </Button>
                        </ButtonGroup>
                      </Grid>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <Grid item xs={10} sm={10} md={12}>
                        <FormControl fullWidth>
                          <InputLabel>
                            Select your hero&apos;s gender
                          </InputLabel>
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
                          <InputLabel>
                            Select your hero&apos;s country
                          </InputLabel>
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
                        <FormControl fullWidth>
                          <TextField
                            name="email"
                            value={email || ""}
                            type="email"
                            fullWidth
                            label="Add your hero’s email address"
                            onChange={onChange}
                          />
                        </FormControl>
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
                            <GrTypography
                              variant="h6"
                              component="p"
                              color="fff"
                            >
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
                      </Grid>

                      {formData.profilePicture ? (
                        <Grid
                          item
                          xs={12}
                          md={12}
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box sx={{ position: "relative" }}>
                            <img
                              src={formData.profilePicture || HeroImage}
                              alt=""
                              style={{
                                width: 250,
                                height: 250,
                                objectFit: "cover",
                                borderRadius: "0.5rem",
                              }}
                            />

                            <IconButton
                              onClick={() => handleImageClear()}
                              color="secondary"
                              sx={{
                                position: "absolute",
                                top: "2%",
                                right: "2%",
                                backgroundColor: "#fff",
                                p: 0.5,
                              }}
                            >
                              <ClearIcon color="inherit" />
                            </IconButton>
                          </Box>
                        </Grid>
                      ) : (
                        <Grid
                          item
                          xs={12}
                          md={12}
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <div
                            {...getRootProps()}
                            style={{
                              width: 250,
                              height: 250,
                              border: "5px dotted black",
                              padding: "60px 60px 60px 60px",
                              backgroundColor: "#dcdcdc",
                              color: "#000",
                              marginBottom: "4rem",
                            }}
                          >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <p>Drop the image here ...</p>
                            ) : (
                              <>
                                <p style={{ textAlign: "center" }}>
                                  Drag 'n' drop an image here, or click to
                                  select files
                                </p>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  <CloudUploadIcon sx={{ fontSize: "2rem" }} />
                                </div>
                              </>
                            )}
                          </div>
                        </Grid>
                      )}
                      {/*<Grid
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
                        </Grid>*/}

                      {formData.profilePicture?.length > 1e6 ? (
                        <Typography align="center" color="error">
                          The image is larger than 1mb
                        </Typography>
                      ) : null}
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
                            <GrTypography
                              variant="h5"
                              component="p"
                              color="#fff"
                            >
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
          <Divider orientation="vertical" flexItem>
            OR
          </Divider>
          <Grid
            item
            xs={12}
            md={5}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box sx={{ my: 4, mb: 5 }}>
              <GrTypography
                variant="h6"
                component="p"
                color="grey.900"
                sx={{ textAlign: "center" }}
              >
                PICK FROM EXISTING HEROES
              </GrTypography>
            </Box>
            <HeroAutocompleteForm />
          </Grid>
        </Grid>
      </GrBox>
    </Container>
  );
};

export default HeroForm;

// onKeyPress={(e) => e.key === 13 && handleNext()}
