import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center dark:bg-black">
      <img src="/images/404.svg" alt="404 Not Found" className="mx-auto mb-10 max-w-[400px] w-full" />
      <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">Page Not Found</h1>
      <p className="mb-8 text-base text-body">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block rounded-md bg-primary py-[14px] px-11 text-base font-medium text-white hover:bg-opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
