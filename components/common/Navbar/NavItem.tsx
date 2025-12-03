import { ChevronRight } from "lucide-react";

const NavItem = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <button
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      active
        ? "bg-blue-50 text-blue-600 font-medium"
        : "text-slate-700 hover:bg-slate-100"
    }`}
  >
    {icon}
    <span>{label}</span>
    <ChevronRight size={16} className="ml-auto" />
  </button>
);

export default NavItem;
