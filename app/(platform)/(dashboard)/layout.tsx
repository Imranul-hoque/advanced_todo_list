import { Navbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="pt-14 h-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
