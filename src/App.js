/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import NotFound from "./Components/Share/NotFound/NotFound";
import BackTopBtn from "./Components/BackToTop/BackTopBtn";
import Form from "./Components/Authentication/Form";
import AboutUs from "./Components/About/AboutUs/AboutUs";
import Footer from "./Components/Share/Footer/Footer";
import EventBooking from "./Components/EventBooking/EventBooking";
import Gallery from "./Components/Gallery/Gallery";
import Navbar from "./Components/Share/Navbar/Navbar";
import Map from "./Components/About/AboutUs/Map";
import ContactUs from "./Components/ContactUs/ContactUs";
import Dashboard from "./Components/Dashboard/Dashboard";
import Catering from "./Components/Services/Catering/Catering";
import Audiovisual from "./Components/Services/Audiovisual/Audiovisual";
import Lighting from "./Components/Services/Lighting/Lighting";
import AllUsers from "./Components/Dashboard/AllUsers/AllUsers";
import UserProfile from "./Components/Dashboard/UserProfile/UserProfile";
import UpdateUser from "./Components/Dashboard/UserProfile/UpdateUser/UpdateUser";
import RequireAdmin from "./Components/Authentication/RequireAdmin/RequireAdmin";
import RequireAuth from "./Components/Authentication/RequireAuth/RequireAuth";
import MyBooking from "./Components/Dashboard/MyBooking/MyBooking";
import AllBookings from "./Components/Dashboard/AllBookings/AllBookings";
import Payment from "./Components/Dashboard/MyBooking/Payment/Payment";
import Packages from "./Components/Packages/Packages";
import Modal from "./Components/Prebuild/Modal";
import AddPackage from "./Components/Dashboard/AddPackage/AddPackage";
import ManageCategory from "./Components/Dashboard/ManageCategory/ManageCategory";
import AddService from "./Components/Dashboard/AddService/AddService";
import useStateReducer from "./Components/Hooks/useStateReducer";
import axios from "axios";

// global state handling context api
const StateContext = React.createContext();
export { StateContext };

AOS.init({ duration: 200 });

axios.defaults.baseURL = `https://create-eve-server-v2.onrender.com/`;
// axios.defaults.baseURL = `http://localhost:5000/`;
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const [state, dispatch] = useStateReducer();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      <div className="overflow-x-hidden">
        <Navbar location={location} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to={"/"} />} />
          <Route path="/packages/:category" element={<Packages />} />
          <Route path="catering" element={<Catering />} />
          <Route path="audiovisual" element={<Audiovisual />} />
          <Route path="sound-lighting" element={<Lighting />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/authentication" element={<Form />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/map" element={<Map />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* dashboard */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route
              index
              path="/dashboard"
              element={
                <Navigate
                  to={state.admin ? "/dashboard/allusers" : "/dashboard/my-booking"}
                />
              }
            />
            <Route
              index
              path="/dashboard/allusers"
              element={
                <RequireAdmin>
                  <AllUsers />
                </RequireAdmin>
              }
            />
            <Route path="/dashboard/my-booking" element={<MyBooking />} />
            <Route path="/dashboard/payment/:Id" element={<Payment />} />
            <Route
              path="/dashboard/all-booking"
              element={
                <RequireAdmin>
                  <AllBookings />
                </RequireAdmin>
              }
            />
            <Route
              path="/dashboard/add-service"
              element={
                <RequireAdmin>
                  <AddService />
                </RequireAdmin>
              }
            />
            <Route
              path="/dashboard/add-package"
              element={
                <RequireAdmin>
                  <AddPackage />
                </RequireAdmin>
              }
            />
            <Route
              path="/dashboard/manage-category"
              element={
                <RequireAdmin>
                  <ManageCategory />
                </RequireAdmin>
              }
            />
          </Route>
          {/* normal routes */}
          <Route
            path="/manage-profile"
            element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/update/user-profile"
            element={
              <RequireAuth>
                <UpdateUser />
              </RequireAuth>
            }
          />
          <Route
            path="/event-booking"
            element={
              <RequireAuth>
                <EventBooking />
              </RequireAuth>
            }
          />
          {/* not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <BackTopBtn />
        {/* <MessengerCustomerChat
          pageId="109936842004249"
          appId="1531565924021354"
        /> */}
        <ToastContainer />
        <Modal />
      </div>
    </StateContext.Provider>
  );
}

export default App;
