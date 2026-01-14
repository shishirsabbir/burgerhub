// imports
import { Outlet } from 'react-router';
import SideNav from './assets/components/global/SideNav';

function App() {
    return (
        <>
            {/* sidenav */}
            <div className="h-full w-[20%] rounded-2xl bg-white p-8 shadow-lg max-[1412px]:p-5 max-[1200px]:hidden">
                <SideNav />
            </div>

            {/* content area */}
            <div className="h-full w-[80%] rounded-2xl bg-white shadow-lg max-[1200px]:w-full">
                <Outlet />
            </div>
        </>
    );
}

export default App;
