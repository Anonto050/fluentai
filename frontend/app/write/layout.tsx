import type { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

const WriteLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <MobileHeader />
      {/* <Sidebar className="hidden lg:flex" /> */}
      <ToastContainer stacked />
      <main className="h-full pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1056px] pt-6">{children}</div>
      </main>
    </>
  );
};

export default WriteLayout;
