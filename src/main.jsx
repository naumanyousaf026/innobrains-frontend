import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./component/aboutus/About.jsx";
import Services from "./component/ourservices/Services.jsx";
import Contactus from "./component/contact/Contactus.jsx";
import Blog from "./component/blog/Blog.jsx";
import Products from "./component/products/Products.jsx";

import Admin from "./component/adminpanel/Admin.jsx";

import ProtectedRoute from "./component/adminpanel/ProtectedRoute.jsx";
import Login from "./component/adminpanel/Login.jsx";
// import Signupform from "./component/adminpanel/Signupform.jsx";
import EmailRequest from "./component/adminpanel/EmailRequest.jsx";
import VerifyOTP from "./component/adminpanel/VerifyOTP.jsx";
import ResetPassword from "./component/adminpanel/ResetPassword.jsx";
import SuccessMessage from "./component/adminpanel/SuccessMessage.jsx";
import PageNotFound from "./component/adminpanel/PageNotFound.jsx";
import AchievementForm from "./component/adminpanel/AchievementForm.jsx";
import ContactInfoForm from "./component/adminpanel/ContactInfoForm.jsx";
import StepForm from "./component/adminpanel/StepForm.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/contact",
    element: <Contactus />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/AchievementForm",
    element: <AchievementForm />,
  },
  {
    path: "/StepForm",
    element: <StepForm />,
  },
  // {
  //   path: "/ContactInfoForm",
  //   element: <ContactInfoForm />,
  // },
  // {
  //   path: "/signupform",
  //   element: <Signupform />,
  // },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/emailrequest",
    element: <EmailRequest />,
  },
  {
    path: "/verifyotp",
    element: <VerifyOTP />,
  },
  {
    path: "/SuccessMessage",
    element: <SuccessMessage />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/404",
    element: <PageNotFound />,
  },
  // Wildcard route for 404 handling
  {
    path: "*",
    element: <PageNotFound />, // Wildcard path for any undefined routes
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
