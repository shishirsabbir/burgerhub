// imports

import StatCards from '../components/dashboard/StatCards';
import BurgerTable from '../components/global/BurgerTable';
import Header from '../components/global/Header';

export default function Dashboard() {
    return (
        <div className="w-full pb-20">
            {/* header */}
            <div className="relative h-22 w-full">
                <Header />
            </div>

            {/* Main Content Are */}
            <div className="w-full px-8">
                {/* Stats */}
                <StatCards />

                {/* burger table */}
                <section className="mt-10 w-full">
                    <div className="w-full rounded-t-2xl bg-orange-300 px-6 py-4">
                        <h3 className="text-xl font-normal">New Added Burgers</h3>
                    </div>

                    <BurgerTable />
                </section>
            </div>
        </div>
    );
}
