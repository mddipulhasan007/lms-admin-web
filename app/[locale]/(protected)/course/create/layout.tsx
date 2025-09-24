import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Course Create Step by Step",
  description: "LMS is a popular dashboard template.",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
