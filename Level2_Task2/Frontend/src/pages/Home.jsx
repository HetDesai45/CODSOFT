import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { jobLoadAction } from "../Redux/actions/jobAction";
import { useParams } from "react-router-dom";
import CardElement from "../components/CardElement";

const Home = () => {
  const { job, SetUniqueLocation, pages, loading } = useSelector(
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
                    Filter Job by category
                  </Typography>
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 5, p: 2 }}>
              {job &&
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
                ))}
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
