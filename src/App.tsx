import SiteHeader from "@/components/SiteHeader";
import MiniHeader from "@/components/MiniHeader";

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
    </div>
  );
}

export default App;
