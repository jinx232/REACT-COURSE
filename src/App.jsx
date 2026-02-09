import { Route,
   createBrowserRouter,
   createRoutesFromElements,
    RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import AddJobPage from './pages/AddJobPage';
import MainLayout from './Layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, {jobLoader} from './pages/JobPage';
import EditJobPage from './pages/EditJobPage';



const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    try {
      const res = await fetch('http://localhost:8000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error('Failed to add job');
      return await res.json();
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete job');
      try {
        return await res.json();
      } catch {
        return {};
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };


  // Update Job
  const updateJob = async (updatedJob) => {
    try {
      const res = await fetch(`http://localhost:8000/jobs/${updatedJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });
      if (!res.ok) throw new Error('Failed to update job');
      return await res.json();
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  };


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
      <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
      <Route path="/add-job" element={<AddJobPage AddJobSubmit={addJob} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
  return <RouterProvider router={router}/>
}

export default App;