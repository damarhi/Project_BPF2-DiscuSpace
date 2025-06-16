import { useOutletContext } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "../../components/admin/Widget";
import Header from "../../components/admin/Header";

export default function Dashboard() {
  const { onOpenSidenav } = useOutletContext();

  return (
    <div className="mt-6">
      <Header brandText="dashboard" title="Dashboard Overview" onOpenSidenav={onOpenSidenav} />
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          <Widget icon={<MdBarChart />} title="Earnings" subtitle="$340.5" />
          <Widget icon={<IoDocuments />} title="Spend this month" subtitle="$642.39" />
          <Widget icon={<MdBarChart />} title="Sales" subtitle="$574.34" />
          <Widget icon={<MdDashboard />} title="Your Balance" subtitle="$1,000" />
          <Widget icon={<MdBarChart />} title="New Tasks" subtitle="145" />
          <Widget icon={<IoMdHome />} title="Total Projects" subtitle="$2,433" />
        </div>
      </div>
    </div>
  );
}
