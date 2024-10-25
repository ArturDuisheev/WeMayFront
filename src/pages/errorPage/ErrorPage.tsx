import { FC } from "react";

interface IErrorPageProps {
  message: string;
}

const ErrorPage: FC<IErrorPageProps> = ({ message }) => {
  return (
    <div className="min-h-[calc(100vh-280px)] flex justify-center items-center">
      <h1 className="title">{message}</h1>
    </div>
  );
};

export default ErrorPage;
