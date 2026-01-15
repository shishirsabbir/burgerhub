// imports
import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router';
import type { BurgerData } from '../../types/burger';
import { GoHome } from 'react-icons/go';
import { IoChevronForwardOutline } from 'react-icons/io5';

export default function SingleBurger() {
    const { burgerID } = useParams();
    const { setPageTitle } = useOutletContext<{ setPageTitle: (t: string) => void }>();
    const [burgerData, setBurgerData] = useState<BurgerData | null>(null);
    const navigate = useNavigate();

    // changing page title using useEffect
    useEffect(() => {
        // update ui title
        setPageTitle('Single Burger');

        // update browser tab
        document.title = 'Single Burger | BurgerHub';

        // clean up
        return () => {
            document.title = 'BurgerHub';
        };
    }, [setPageTitle]);

    // delete burger
    const handleDeleteBurger = async () => {
        // 1. Show confirmation dialog
        const isConfirmed = window.confirm(
            `Are you sure you want to delete "${burgerData?.title}"? This action cannot be undone.`,
        );

        // 2. If user clicks "Cancel", stop the function
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:8000/api/v1/burgers/${burgerID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const parsedData = await response.json();
                // console.log(parsedData);

                if (parsedData.status === 'success') {
                    navigate('/burgers', { replace: true });
                }
            } else {
                throw new Error("Error! Couldn't delte burger");
            }
        } catch (err) {
            console.log("Error! Couldn't delete burger");
            console.error(err);
        }
    };

    // getting single burger data
    useEffect(() => {
        async function getOneBurgerData() {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/burgers/${burgerID}`);

                if (response.ok) {
                    const parsedResponse = await response.json();

                    // set burgerData
                    setBurgerData(parsedResponse.data.burger);
                } else {
                    throw new Error('Error Fetching Burger Data');
                }
            } catch (err) {
                console.log("Error! Couldn't get the burgerData");
                console.error(err);
            }
        }

        getOneBurgerData();
    }, [burgerID]);

    return (
        <>
            <section className="py-3">
                <div className="flex items-center justify-start gap-1.5 text-gray-500">
                    <Link to="/" className="cursor-pointer rounded-lg px-1.5 py-0.5 select-none hover:bg-orange-100">
                        <GoHome className="size-6" />
                    </Link>
                    <span>
                        <IoChevronForwardOutline className="size-4" />
                    </span>
                    <Link
                        to="/burgers"
                        className="cursor-pointer rounded-lg px-1.5 py-0.5 select-none hover:bg-orange-100"
                    >
                        BurgerList
                    </Link>
                    <span>
                        <IoChevronForwardOutline className="size-4" />
                    </span>
                    <span className="cursor-pointer rounded-lg px-1.5 py-0.5 capitalize select-none hover:bg-orange-100">
                        {burgerData?.title ? burgerData.title : 'Burger Page'}
                    </span>
                </div>
            </section>

            <section className="flex items-center justify-end py-3">
                <button
                    type="button"
                    onClick={handleDeleteBurger}
                    className="rounded-full bg-red-400 px-4 py-1.5 text-lg font-semibold text-white hover:bg-red-500"
                >
                    Delete
                </button>
            </section>

            {/* burger info */}
            <section className="mt-4 w-full p-4">
                {/* coverImage, images & base info */}
                <div className="flex items-start justify-between gap-6">
                    {/* coverImage and images */}
                    <div className="flex w-full flex-1 flex-col items-center gap-10">
                        {/* coverImage */}
                        <div className="relative flex h-64 w-64 items-center justify-center bg-amber-200">
                            <img
                                src={`http://localhost:8000/img/burgers/${burgerData?.coverImage}`}
                                alt="Burger Cover Image"
                                className="absolute h-full w-full object-contain"
                            />
                        </div>

                        {/* images grid */}
                        <div className="grid grid-cols-3 gap-6">
                            {burgerData?.images?.length && (
                                <>
                                    {burgerData.images.map((imgURL, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="relative flex h-32 w-32 items-center justify-center overflow-hidden"
                                            >
                                                <img
                                                    src={`http://localhost:8000/img/burgers/${imgURL}`}
                                                    alt={`Burger Image ${index}`}
                                                    className="absolute h-full w-full object-contain"
                                                />
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>

                    {/* basic info */}
                    <div className="flex flex-1 flex-col gap-6 pb-12">
                        {/* title */}
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-semibold capitalize">{burgerData?.title}</h2>
                            <p className="font-extralight uppercase">{burgerData?.category}</p>
                        </div>

                        {/* price */}
                        <div>
                            <p className="text-3xl font-light">{burgerData?.price}&nbsp;$</p>
                        </div>

                        {/* ingredients */}
                        <div className="flex flex-col gap-2">
                            <h4 className="font-semibold">Ingredients</h4>
                            <p className="capitalize">{burgerData?.ingredients?.join(', ')}</p>
                        </div>

                        {/* tags */}
                        <div className="flex flex-col gap-2">
                            <h4 className="font-semibold">Tags</h4>
                            <p className="capitalize">{burgerData?.tags?.join(', ')}</p>
                        </div>

                        {/* description */}
                        <div className="flex flex-col gap-2">
                            <h4 className="font-semibold">Description</h4>
                            <p>{burgerData?.description}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
