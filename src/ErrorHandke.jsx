import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-secondary gap-10 text-black">
      <h1 className="text-3xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-6xl">
        <i >{error.statusText || error.message}</i>
      </p>
    </div>
  );
}