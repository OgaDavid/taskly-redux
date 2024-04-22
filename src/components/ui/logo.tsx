import { Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

const Logo = () => {
  return (
    <div className="flex gap-1 items-center">
      <Shield />
      {siteConfig.name}
    </div>
  );
};

export default Logo;
