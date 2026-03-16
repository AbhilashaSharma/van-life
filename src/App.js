import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/Van/Vans";
import VansDetails, {
  loader as vanDetailLoader,
} from "./pages/Van/VansDetails";
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard";
import Layout from "./components/Layout";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans, { loader as hostVansLoader } from "./pages/Host/Vans.jsx";
import HostVansDetails, {
  loader as hostVanDetailsLoader,
} from "./pages/Host/VansDetails.jsx";
import "./server.js";
import HostLayout from "./pages/Host/HostLayout";
import HostVanPricing from "./pages/Host/HostVanPricing.jsx";
import HostVanPhotos from "./pages/Host/HostVanPhotos.jsx";
import HostVanInfo from "./pages/Host/HostVanInfo.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Login, { action as actionLogin } from "./pages/Login.jsx";
import { requireAuth } from "./utils.js";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} action={actionLogin} />
        <Route
          path="vans"
          errorElement={<ErrorPage />}
          element={<Vans />}
          loader={vansLoader}
        />
        <Route
          path="vans/:id"
          element={<VansDetails />}
          loader={vanDetailLoader}
        />

        <Route path="host" element={<HostLayout />}>
          <Route
            index
            element={<Dashboard />}
            loader={dashboardLoader}
            errorElement={<ErrorPage />}
          />
          <Route
            path="income"
            element={<Income />}
            loader={async ({ request }) => await requireAuth({ request })}
          />
          <Route
            path="reviews"
            element={<Reviews />}
            loader={async ({ request }) => await requireAuth({ request })}
          />
          <Route
            path="vans"
            element={<HostVans />}
            loader={hostVansLoader}
            errorElement={<ErrorPage />}
          />
          <Route
            path="vans/:id"
            element={<HostVansDetails />}
            loader={hostVanDetailsLoader}
            errorElement={<ErrorPage />}
          >
            <Route
              index
              element={<HostVanInfo />}
              loader={async ({ request }) => await requireAuth({ request })}
            />
            <Route
              path="pricing"
              element={<HostVanPricing />}
              loader={async ({ request }) => await requireAuth({ request })}
            />
            <Route
              path="photos"
              element={<HostVanPhotos />}
              loader={async ({ request }) => await requireAuth({ request })}
            />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
