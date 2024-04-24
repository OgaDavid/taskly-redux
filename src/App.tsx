import SiteHeader from "@/components/site-header";
import MiniHeader from "@/components/mini-header";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";

function App() {
  return (
    <div>
      <SiteHeader />
      <div className="wrapper pt-10">
        <MiniHeader />
        <div className="mt-10">
          <button>Add Todo</button>
        </div>
      </div>
      <ModalProvider />
      <ToastProvider />
    </div>
  );
}

export default App;
