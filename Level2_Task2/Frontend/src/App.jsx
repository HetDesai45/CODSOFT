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
import Layout from "./pages/global/Layout";
import { ProSidebarProvider } from "react-pro-sidebar";
import UserJobsHistory from "./pages/user/UserJobsHistory";

const UserDadhboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);

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
