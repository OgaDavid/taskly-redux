// ui
import Logo from "@/components/ui/logo";
import { Icons } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/button";

// helpers
import { siteConfig } from "@/config/site";
import useMediaQuery from "@/helpers/useMediaQuery";

const SiteHeader = () => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <header className="bg-custom-secondary py-1 border-b-2 shadow-lg border-b-custom-accent">
      <div className="wrapper flex items-center justify-between py-2">
        <Logo />
        <a
          target="_blank"
          className={buttonVariants({
            variant: isDesktop ? "default" : "outline",
          })}
          href={siteConfig.links.github}
        >
          <div className="flex items-center">
            <Icons.gitHub className="h-4 w-4" />
            <p className="max-md:hidden ml-2">GitHub</p>
          </div>
          <span className="sr-only">GitHub</span>
        </a>
      </div>
    </header>
  );
};

export default SiteHeader;
