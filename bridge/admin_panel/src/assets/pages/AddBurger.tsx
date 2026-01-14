// imports
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import type { FileState } from '../../types/burger';
import CoverUpload from '../components/add_burger/CoverUpload';
import ImageUpload from '../components/add_burger/ImageUpload';
import TagSelector from '../components/add_burger/TagSelector';

export default function AddBurgers() {
    const { setPageTitle } = useOutletContext<{ setPageTitle: (t: string) => void }>();
    const [cover, setCover] = useState<FileState>({
        file: null,
        preview: '',
    });
    const [imgOne, setImgOne] = useState<FileState>({
        file: null,
        preview: '',
    });
    const [imgTwo, setImgimgTwo] = useState<FileState>({
        file: null,
        preview: '',
    });
    const [imgThree, setImgThree] = useState<FileState>({
        file: null,
        preview: '',
    });

    //

    useEffect(() => {
        setPageTitle('Add Burger');
    }, [setPageTitle]);

    return (
        <>
            {/* add burger form */}
            <section className="w-full pb-8">
                <div className="w-full rounded-t-2xl rounded-b-2xl pb-6 shadow-lg">
                    {/* header */}
                    <div className="mt-6 w-full rounded-t-2xl bg-linear-to-r from-orange-300 to-amber-200 px-6 py-4">
                        <h3 className="text-xl font-normal">New Added Burgers</h3>
                    </div>

                    <form className="w-full p-4">
                        {/* burger images & burger basic info */}
                        <div className="flex items-center justify-between gap-6">
                            {/* burger images */}
                            <div className="flex h-72 w-[50%] flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                                {/* title */}
                                <div className="bg-linear-to-r from-amber-400 to-amber-200 px-4 py-2.5">
                                    <span className="text-md font-normal">Upload Burger Images</span>
                                </div>
                                {/* images */}
                                <div className="w-full grow p-4">
                                    <div className="flex h-full w-full items-center justify-between gap-6">
                                        {/* cover image */}
                                        <CoverUpload cover={cover} setCover={setCover} />

                                        {/* images */}
                                        <div className="grid h-full flex-1 grid-cols-2 grid-rows-2 gap-2">
                                            {/* img 1 */}
                                            <ImageUpload image={imgOne} setImage={setImgOne} />

                                            {/* img 2 */}
                                            <ImageUpload image={imgTwo} setImage={setImgimgTwo} />

                                            {/* img 3 */}
                                            <ImageUpload image={imgThree} setImage={setImgThree} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* burger basic info */}
                            <div className="flex h-full w-[50%] flex-col gap-7 px-8 py-2">
                                <div className="flex w-full flex-col items-start justify-start gap-1">
                                    <label htmlFor="title" className="pl-1 font-semibold">
                                        Burger Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter burger name"
                                        className="w-full rounded-full border-2 border-gray-400 px-5 py-2 outline-none focus:border-orange-400"
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-start gap-1">
                                    <label htmlFor="price" className="pl-1 font-semibold">
                                        Burger Price
                                    </label>
                                    <input
                                        type="number"
                                        step={0.01}
                                        min={0.0}
                                        name="price"
                                        id="price"
                                        placeholder="Enter burgeer price eg. 14.99"
                                        className="w-[60%] rounded-full border-2 border-gray-400 px-5 py-2 outline-none focus:border-orange-400"
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-start gap-1">
                                    <label htmlFor="category" className="pl-1 font-semibold">
                                        Burger Category
                                    </label>
                                    <select
                                        name="category"
                                        id="category"
                                        className="w-[80%] rounded-full border-2 border-gray-400 px-5 py-2.5 outline-none focus:border-orange-400"
                                    >
                                        {/* as this a title design it separately @hugu */}
                                        <option selected value="" className="">
                                            &lt; Select Category &gt;
                                        </option>
                                        <option selected value="beef">
                                            Beef
                                        </option>
                                        <option selected value="chicken">
                                            Chicken
                                        </option>
                                        <option selected value="vegetable">
                                            Vegetable
                                        </option>
                                        <option selected value="fish">
                                            Fish
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* burger description */}
                        <div className="mt-8 flex w-full flex-col items-start gap-2 px-2">
                            <label htmlFor="description" className="pl-2 font-semibold">
                                Burger Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows={4}
                                placeholder="Enter your burger description"
                                className="w-full rounded-2xl border-2 border-gray-400 px-4 py-2.5 outline-none focus:border-orange-400"
                            ></textarea>
                        </div>

                        {/* burger ingredients & burger tags */}
                        <div className="mt-8 flex items-center justify-between gap-10 px-2">
                            {/* ingredients */}
                            <TagSelector inputTitle="Ingredients" inputName="ingredient" />

                            {/* tags */}
                            <TagSelector inputTitle="Tags" inputName="tags" />
                        </div>

                        {/* cancel and submit button */}
                        <div className="mt-12 flex items-center justify-start gap-8 pl-4">
                            <div>
                                <button
                                    type="button"
                                    className="text cursor-pointer rounded-full bg-red-400 px-6 py-2 text-xl font-semibold text-white shadow-md select-none hover:bg-red-500 hover:shadow-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="text cursor-pointer rounded-full bg-blue-400 px-6 py-2 text-xl font-semibold text-white shadow-md select-none hover:bg-blue-500 hover:shadow-lg"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
