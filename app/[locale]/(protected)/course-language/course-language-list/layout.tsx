import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Course Language List",
  description: "LMS is a popular dashboard template.",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
