import {BrowserRouter, Routes, Route } from "react-router-dom"
import { Landing, Register, Error } from "./Pages" // refer index file to get components
import { Stats, AllJobs, AddJob, Profile, SharedLayout, ProtectedRoute } from "./Pages/Dashboard" // refer index file in dashboard folder

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* nested routes */}
        <Route path="/" element={
          // wrap with protected route
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />} /> {/* index uses path="/" and <Stats/> as home */}
          <Route path="stats" element={<Stats />} /> {/* falls under path "/" */}
          <Route path="all-jobs" element={<AllJobs />}/>
          <Route path="add-job" element={<AddJob/> }/>
          <Route path="profile" element={<Profile/>} />
        </Route>
        {/* other pages */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
