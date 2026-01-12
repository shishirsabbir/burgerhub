// imports
import SideNav from './assets/components/global/SideNav';
import Dashboard from './assets/pages/Dashboard';

function App() {
    return (
        <>
            {/* sidenav */}
            <div className="h-full w-[20%] rounded-2xl bg-white p-8 shadow-lg">
                <SideNav />
            </div>

            {/* content area */}
            <div className="h-full w-[80%] overflow-y-scroll rounded-2xl shadow-lg">
                <Dashboard />
            </div>
        </>
    );
}

export default App;
