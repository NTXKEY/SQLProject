import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

import { LandingPage } from "./Pages/LandingPage.jsx";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { DevPage } from "./Pages/DevPage.jsx";
import { Temp } from "./Pages/Temp";

import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { Verify } from "./Pages/Verify.jsx";
import { Personalization } from "./Pages/Personalization.jsx";
import { useContext } from "react";
import { themeContext } from "./Context/Contexts.js";

import { Toaster } from "react-hot-toast";
import { HomePageLayout } from "./Pages/HomePageLayout.jsx";
import { DetailsContextComponent } from "./Context/DetailsContextComponent.jsx";
import { Browse } from "./Components/HomePageComponents/Browse.jsx";
import { ForgotPassword } from "./Pages/ForgotPassword.jsx";
import { EmailInput } from "./Components/ForgetPassword/EmailInput.jsx";
import { VerifyEmail } from "./Components/ForgetPassword/VerifyEmail.jsx";
import { PasswordInput } from "./Components/ForgetPassword/PasswordInput.jsx";
import { SettingsPage } from "./Pages/SettingsPage.jsx";
import { AccountPage } from "./Pages/AccountPage.jsx";
import { ProfilePage } from "./Pages/ProfilePage.jsx";
import { AppearancePage } from "./Pages/AppearancePage.jsx";
import { SignupDetailsContextComponent } from "./Context/SignupDetailsContextComponet.jsx";
import { SkeletonTheme } from "react-loading-skeleton";

import { HomePage } from "./Pages/HomePage.jsx";
import { AppointmentsPage } from "./Pages/AppointmentsPage.jsx";

function App() {
  const { theme } = useContext(themeContext);
  console.log(theme);
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: (
        <>
          <div className="h-dvh w-dvw flex flex-col justify-center items-center gap-10">
            <h1>404</h1>
            <p>Page not found</p>
            <Link to="/">Go back</Link>
          </div>
        </>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/temp",
      element: <Temp />,
    },
    {
      path: "/Personalization",
      element: <Personalization />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
      children: [
        { path: "/forgot-password", element: <EmailInput /> },
        {
          path: "/forgot-password/verify",
          element: <VerifyEmail />,
        },
        { path: "/forgot-password/password", element: <PasswordInput /> },
      ],
    },
    {
      path: "/user/home",
      element: <HomePageLayout />,
      children: [
        {
          path: "/user/home",
          index: true,
          element: <HomePage />,
        },
        {
          path: "/user/home/browse",
          element: <Browse />,
        },
        {
          path: "/user/home/appointments",
          element: <AppointmentsPage />,
        },
        {
          path: "/user/home/settings",
          element: <SettingsPage />,
          children: [
            // {
            //   index: true,
            //   path: "/user/home/settings",
            //   element: <ProfilePage />,
            // },
            // {
            //   path: "/user/home/settings/account",
            //   element: <AccountPage />,
            // },
            {
              path: "/user/home/settings/appearance",
              element: <AppearancePage />,
            },
          ],
        },
      ],
    },
    {
      path: "/doctor/home",
      element: (
        <>
          <div className="h-dvh w-dvw flex flex-col justify-center items-center">
            Home
          </div>
        </>
      ),
    },
    { path: "/dev", element: <DevPage /> },
    // { path: "/new-verify", element: <ForgotPassword /> },
  ]);

  return (
    <>
      <div
        className={`${theme} ${
          theme === "dark" ? "bg-dark-bg" : "bg-light-bg"
        } w-full h-full`}
      >
        <SkeletonTheme
          baseColor={theme === "dark" ? "#202020" : "#ccc"}
          highlightColor={theme === "dark" ? "#4444" : "#eee"}
        >
          <SignupDetailsContextComponent>
            <DetailsContextComponent>
              <ThemeProvider>
                <Toaster />

                <RouterProvider router={Router} />
              </ThemeProvider>
            </DetailsContextComponent>
          </SignupDetailsContextComponent>
        </SkeletonTheme>
      </div>
    </>
  );
}

export default App;
