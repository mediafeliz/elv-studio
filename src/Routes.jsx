import { observer } from "mobx-react-lite";
import { Navigate, Route, Routes } from "react-router-dom";
import Jobs from "@/pages/jobs/Jobs.jsx";
import JobDetails from "@/pages/job-details/JobDetails.jsx";
import Create from "@/pages/create/Create.jsx";
import MediaPackager from "@/pages/media-packager/MediaPackager.jsx";

const AppRoutes = observer(() => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/packager" />} />
      <Route path="/new" element={<Create />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/packager" element={<MediaPackager />} />
    </Routes>
  );
});

export default AppRoutes;