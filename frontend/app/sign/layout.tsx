import type { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";


const SignLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ToastContainer stacked />
      <main className="h-full pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1400px] pt-6">{children}</div>
      </main>
    </>
  );
};

export default SignLayout;
