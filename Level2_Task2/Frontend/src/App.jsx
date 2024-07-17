import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/Notfound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import UserDashboard from "./pages/user/UserDashboard";
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";
import Layout from "./pages/global/Layout";
import { ProSidebarProvider } from "react-pro-sidebar";
import UserJobsHistory from "./pages/user/UserJobsHistory";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SingleJob from "./pages/SingleJob";
import DashUsers from "./pages/admin/DashUsers";
import DashJobs from "./pages/admin/DashJobs";
import Signup from "./pages/Signup";

const UserDadhboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <ProSidebarProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/location/:location" element={<Home />} />
                <Route path="/search/:keyword" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/job/:id" element={<SingleJob />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboardHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <AdminRoute>
                      <DashUsersHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/jobs"
                  element={
                    <AdminRoute>
                      <DashJobsHOC />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/user/dashboard"
                  element={
                    <UserRoute>
                      <UserDadhboardHOC />
                    </UserRoute>
                  }
                />
                <Route
                  path="/user/jobs"
                  element={
                    <UserRoute>
                      <UserJobsHistoryHOC />
                    </UserRoute>
                  }
                />
                <Route
                  path="/user/info"
                  element={
                    <UserRoute>
                      <UserInfoDashboardHOC />
                    </UserRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ProSidebarProvider>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
