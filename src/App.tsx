﻿import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import EntityTable from "./components/tables/BasicTables/EntityTable"; // Adjust the path if needed
import DObjTable from "./components/tables/BasicTables/DObjTable";
import TestNewTable from "./components/tables/BasicTables/newtable";
import HoverTable from "./components/tables/BasicTables/HoverTestTable";
//import SalesforceTable from "./components/tables/BasicTables/SalesforceTable";
import SupabaseEntityTable from "./components/tables/BasicTables/SupabaseEntityTable";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
                      <Route path="/blank" element={<Blank />} />


            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/entity-tables" element={<EntityTable />} />
            <Route path="/dobj-tables" element={<DObjTable />} /> {/* ✅ No change here */}
            <Route path="/testpage" element={<HoverTable />} /> {/* ✅ No change here */}
            <Route path="/testnewtable" element={<TestNewTable />} /> {/* ✅ No change here */}
             {/* Supabase project testing */}
            <Route path="/supabase-entity" element={<SupabaseEntityTable />} />


                      {/*<Route path="/sf-tables" element={<SalesforceTable />} />*/}{/* ✅ No change here */}

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
