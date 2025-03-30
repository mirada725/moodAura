import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import MoodLog from './pages/MoodLog';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/auth/signin" />;
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Welcome to MoodAura" />
            <LandingPage />
          </>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin | MoodAura" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup | MoodAura" />
            <SignUp />
          </>
        }
      />
      <Route element={<DefaultLayout><Outlet /></DefaultLayout>}>
        <Route
          path='/dashboard'
          element={
          <ProtectedRoute>
            <>
              <PageTitle title="MoodAura" />
              <ECommerce />
            </>
          </ProtectedRoute>
          }
        />
        <Route
          path="/moodLog"
          element={
            <ProtectedRoute>
            <>
              <PageTitle title="Mood Log | MoodAura" />
              <MoodLog />
            </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>  
            <>
              <PageTitle title="Calendar | MoodAura" />
              <Calendar />
            </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
            <>
              <PageTitle title="Profile | MoodAura" />
              <Profile />
            </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <ProtectedRoute>
            <>
              <PageTitle title="Form Elements | MoodAura" />
              <FormElements />
            </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <ProtectedRoute>
            <>
              <PageTitle title="Form Layout | MoodAura" />
              <FormLayout />
            </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoute>
            <>
              <PageTitle title="Tables | MoodAura" />
              <Tables />
            </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
            <>
              <PageTitle title="Settings | MoodAura" />
              <Settings />
            </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chart"
          element={
            <ProtectedRoute>
            <>
              <PageTitle title="Basic Chart | MoodAura" />
              <Chart />
            </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <ProtectedRoute>
            <>
              <PageTitle title="Alerts | MoodAura" />
              <Alerts />
            </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <ProtectedRoute>
            <>
              <PageTitle title="Buttons | MoodAura" />
              <Buttons />
            </>
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}

export default App;
