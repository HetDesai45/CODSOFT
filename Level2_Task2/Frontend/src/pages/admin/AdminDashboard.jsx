import { Box, Stack, Typography } from "@mui/material";
import StatComponent from "../../components/StatComponent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import { Chart } from "react-google-charts";
import { data, options } from './data/data'
import ChartComponent from "../../components/ChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { jobTypeLoadAction } from "../../Redux/actions/jobTypeAction";
import { useEffect } from "react";
import { adminJobLoadAction } from "../../Redux/actions/jobAction";
import { allUserAction } from "../../Redux/actions/userAction";

const AdminDashboard = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobTypeLoadAction());
        dispatch(adminJobLoadAction());
        dispatch(allUserAction());
    }, []);


    const { jobType, loading } = useSelector(state => state.jobTypeAll);
    const { job } = useSelector((state) => state.loadAdminJob);
    const { users} = useSelector((state) => state.allUsers);

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Employer Dashboard
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value={users.length}
            icon={
              <SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />
            }
            description="Users"
            money=""
          />
          <StatComponent
            value={job.length}
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Jobs"
            money=""
          />
          <StatComponent
            value={jobType.length}
            icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Jobs categories"
            money=""
          />
        </Stack>

        
      </Box>
    </>
  );
};

export default AdminDashboard;
