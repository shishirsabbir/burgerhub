// imports
import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router';
import BurgerTable from '../components/global/BurgerTable';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoFilter } from 'react-icons/io5';
import type { BurgerData } from '../../types/burger';

export default function BurgerList() {
    const { setPageTitle } = useOutletContext<{ setPageTitle: (t: string) => void }>();
    const [searchText, setSearchText] = useState<string>('');
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
                    // setBurgerData([]);
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
        setPageTitle('Burger List');

        // update browser tab
        document.title = 'Burger List | BurgerHub';

        // clean up
        return () => {
            document.title = 'BurgerHub';
        };
    }, [setPageTitle]);

    return (
        <>
            {/* burger banner */}
            <section className="mt-8">
                <div className="relative flex justify-end overflow-hidden rounded-2xl bg-[#fba44f]">
                    <img className="h-60" src="/img/add_burger_banner.png" alt="Add Burger Banner" />
                    <div className="absolute top-14 left-16 flex flex-col items-start gap-8">
                        <h3 className="text-3xl font-semibold">Add a new burger</h3>
                        <span className="flex items-center justify-start">
                            <Link
                                to="/burgers/add"
                                className="cursor-pointer rounded-full bg-orange-500 px-4 py-2 text-lg text-white shadow-lg select-none hover:bg-orange-400"
                            >
                                Add Burger
                            </Link>
                        </span>
                    </div>
                </div>
            </section>

            {/* burger filter and list */}
            {/* burger table */}
            <section className="mt-10 w-full pb-12">
                <div className="w-full rounded-t-2xl bg-linear-to-r from-orange-300 to-amber-100 px-6 py-4">
                    <h3 className="text-xl font-normal">New Added Burgers</h3>
                </div>

                {/* burger filter */}
                <div className="relative flex items-center justify-between bg-linear-to-r from-orange-100 to-orange-50 py-4 pr-6 pl-4">
                    {/* search */}
                    <div className="flex h-9 items-center justify-start">
                        <input
                            type="text"
                            name="search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            id="search"
                            placeholder="Enter your search"
                            className="fu h-full w-64 rounded-l-full border border-orange-300 bg-gray-100 px-4 shadow-sm outline-none focus:border-orange-400"
                        />
                        <label
                            className="flex h-full items-center justify-center rounded-r-full border border-orange-300 bg-orange-300 px-3 shadow-sm focus:border-orange-400"
                            htmlFor="search"
                        >
                            <span className="flex h-full items-center justify-center">
                                <HiMagnifyingGlass className="size-4" />
                            </span>
                            <span className="hidden">Search</span>
                        </label>
                    </div>

                    {/* filter */}
                    <div>
                        <button
                            type="button"
                            className="group flex cursor-pointer items-center justify-center gap-2.5 rounded-md bg-white px-2 py-1 shadow-md select-none hover:shadow-lg"
                        >
                            <span>
                                <IoFilter className="size-5 group-hover:text-orange-400" />
                            </span>
                            <span className="group-hover:text-orange-400">Filters</span>
                        </button>
                    </div>
                </div>

                <BurgerTable burgerDataList={burgerData} />
            </section>
        </>
    );
}
