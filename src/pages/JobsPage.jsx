import JobListings from '../components/JobListings';

const JobsPage = () => {
  return (
    <>
      <section className="bg-blue-50 px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h1 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            All Jobs
          </h1>
        </div>
      </section>
      <JobListings limit={100} />
    </>
  );
};

export default JobsPage;