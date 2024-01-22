import Sidebar from "./_components/sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-6xl mx-auto 2xl:max-w-screen-xl px-4 pt-10">
      <div className="flex gap-x-7">
        <div className="hidden md:block shrink-0 w-64">
          <Sidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default OrganizationLayout;
