// imports

import { useOutletContext } from 'react-router';
import StatCards from '../components/dashboard/StatCards';
import BurgerTable from '../components/global/BurgerTable';
import { useEffect, useState } from 'react';
import type { BurgerData } from '../../types/burger';

export default function Dashboard() {
    const { setPageTitle } = useOutletContext<{ setPageTitle: (t: string) => void }>();
    const [burgerData, setBurgerData] = useState<BurgerData[]>([]);

    // get burgers data
    useEffect(() => {
        async function getBurgerList() {
            try {
                const response = await fetch('http://localhost:8000/api/v1/burgers');

                if (response.ok) {
                    const parsedResponse = await response.json();

                    // setting burger data
                    setBurgerData(parsedResponse.data.burgers);
                } else {
                    throw new Error("Couldn't get the burger data from API");
                }
            } catch (err) {
                console.log("Error! Could't get burgers data.");
                console.error(err);
            }
        }

        // getting burgerData
        getBurgerList();
    }, []);

    // changing page title using useEffect
    useEffect(() => {
        // update ui title
        setPageTitle('Dashboard');

        // update browser tab
        document.title = 'Dashboard | BurgerHub';

        // clean up
        return () => {
            document.title = 'BurgerHub';
        };
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

                <BurgerTable burgerDataList={burgerData} />
            </section>
        </>
    );
}
