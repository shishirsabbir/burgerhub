// imports

import StatCards from '../components/dashboard/StatCards';
import BurgerTable from '../components/global/BurgerTable';
import Header from '../components/global/Header';

export default function Dashboard() {
    return (
        <div className="flex h-screen w-full flex-col overflow-hidden rounded-2xl pb-20">
            {/* header */}
            <div className="ro relative h-22 w-full">
                <Header />
            </div>

            {/* Main Content Are */}
            <div className="h-full min-h-0 w-full flex-1 overflow-y-auto">
                <div className="h-full w-full px-8 max-[1412px]:px-5">
                    {/* Stats */}
                    <StatCards />

                    {/* burger table */}
                    <section className="mt-10 w-full">
                        <div className="w-full rounded-t-2xl bg-linear-to-r from-orange-300 to-amber-100 px-6 py-4">
                            <h3 className="text-xl font-normal">New Added Burgers</h3>
                        </div>

                        <BurgerTable />
                    </section>
                </div>
            </div>
        </div>
    );
}
