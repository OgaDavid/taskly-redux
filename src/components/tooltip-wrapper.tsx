import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TooltipWrapper = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
