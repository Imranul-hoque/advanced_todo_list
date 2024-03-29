import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default async function MarketingLayout(
    { children }:
    { children : React.ReactNode }
) {
    return (
      <div className="h-full bg-slate-100">
        <Navbar />
        <main className="pt-20 pb-20">{children}</main>
        <Footer />
      </div>
    );
}