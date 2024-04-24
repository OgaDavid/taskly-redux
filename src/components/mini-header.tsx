// ui
import { Button } from "@/components/ui/button";

// icons
import { CalendarDays, Plus } from "lucide-react";

// helpers
import { getToday } from "@/helpers";
import useMediaQuery from "@/helpers/useMediaQuery";

// redux
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modal/actions";
import { CREATE_TASK } from "@/components/modals/constants";

const MiniHeader = () => {
  const dispatch = useDispatch();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex items-center pb-4 border-custom-accent border-b-2 justify-between">
      <div>
        <h1 className="text-lg md:text-3xl pb-1">My Tasks 📝</h1>
        <p className="text-custom-neutral/50 flex items-center inter-regular font-medium text-xs md:text-sm">
          <CalendarDays className="w-4 h-4 mr-2" />
          {getToday()}
        </p>
      </div>
      <Button onClick={() => dispatch(openModal(CREATE_TASK))}>
        {isDesktop ? "Create New Task" : "Add Task"}
        <Plus className="w-4 font h-4 ml-2" />
      </Button>
    </div>
  );
};

export default MiniHeader;
