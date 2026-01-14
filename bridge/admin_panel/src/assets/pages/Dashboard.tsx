// imports

import { useOutletContext } from 'react-router';
import StatCards from '../components/dashboard/StatCards';
import BurgerTable from '../components/global/BurgerTable';
import { useEffect } from 'react';

export default function Dashboard() {
    const { setPageTitle } = useOutletContext<{ setPageTitle: (t: string) => void }>();

    // changing page title using useEffect
    useEffect(() => {
        setPageTitle('Dashboard');
    }, [setPageTitle]);

    return (
        <>
            {/* Stats */}
            <StatCards />

            {/* burger table */}
            <section className="mt-10 w-full pb-12">
                <div className="w-full rounded-t-2xl bg-linear-to-r from-orange-300 to-amber-100 px-6 py-4">
                    <h3 className="text-xl font-normal">New Added Burgers</h3>
                </div>

                <BurgerTable />
            </section>
        </>
    );
}
