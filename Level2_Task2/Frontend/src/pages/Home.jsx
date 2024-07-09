import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  Box,
  Card,
  Container,
  ListItemIcon,
  MenuItem,
  MenuList,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { jobLoadAction } from "../Redux/actions/jobAction";
import { Link, useParams } from "react-router-dom";
import CardElement from "../components/CardElement";
import Footer from "../components/Footer";
import LoadingBox from "../components/LoadingBox";
import SelectComponent from "../components/SelectComponent";
import { jobTypeLoadAction } from "../Redux/actions/jobTypeAction";
import LocationOn from "@mui/icons-material/LocationOn";

const Home = () => {
  const { job, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadjob
  );
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { keyword, location } = useParams();
  const [page, setPage] = useState(1);
  const [cat, setCat] = useState("");

  useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location));
  }, [page, keyword, cat, location]);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <Header />
        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 2, p: 2 }}>
              <Card sx={{ minWidth: 150, mb: 3, p: 2 }}>
                <Box sx={{ p: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}
                  >
                    Filter Job By Category
                    <SelectComponent
                      handleChangeCategory={handleChangeCategory}
                      cat={cat}
                    />
                  </Typography>
                </Box>
              </Card>

              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}
                  >
                    Filter Job By Location
                  </Typography>
                  <MenuList>
                    {setUniqueLocation &&
                      setUniqueLocation.map((location, i) => (
                        <MenuItem key={i}>
                          <ListItemIcon>
                            <LocationOn
                              sx={{
                                color: palette.secondary.main,
                                fontSize: 18,
                              }}
                            />
                          </ListItemIcon>
                          <Link to={`/search/location/${location}`}>
                            {location}
                          </Link>
                        </MenuItem>
                      ))}
                  </MenuList>
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 5, p: 2 }}>
              {loading ? (
                <LoadingBox />
              ) : job && job.length === 0 ? (
                <>
                  <Box
                    sx={{
                      minHeight: "350px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h2>No Result Found!</h2>
                  </Box>
                </>
              ) : (
                job &&
                job.map((jobb, i) => (
                  <CardElement
                    key={i}
                    id={jobb._id}
                    jobTitle={jobb.title}
                    description={jobb.description}
                    category={
                      jobb.jobType ? jobb.jobType.jobTypeName : "No category"
                    }
                    location={jobb.location}
                  />
                ))
              )}
              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={pages === 0 ? 1 : pages}
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
