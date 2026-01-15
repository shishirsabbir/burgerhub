// imports
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { type BurgerCategory, type FileState } from '../../types/burger';
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
    const [imgTwo, setImgTwo] = useState<FileState>({
        file: null,
        preview: '',
    });
    const [imgThree, setImgThree] = useState<FileState>({
        file: null,
        preview: '',
    });

    // reset key
    const [resetKey, setResetKey] = useState(0);

    // individual burger data as state
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [category, setCategory] = useState<BurgerCategory | ''>('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    // loading state
    const [loading, setLoading] = useState<boolean>(false);

    // reset form
    const resetForm = () => {
        // 1. Revoke object URLs to free up browser memory
        // This prevents memory leaks from the blob: URLs created for previews
        [cover, imgOne, imgTwo, imgThree].forEach((img) => {
            if (img.preview && img.preview.startsWith('blob:')) {
                URL.revokeObjectURL(img.preview);
            }
        });

        // Reset Image States
        const emptyFileState: FileState = { file: null, preview: '' };

        setCover(emptyFileState);
        setImgOne(emptyFileState);
        setImgTwo(emptyFileState); // Corrected from setImgimgTwo typo
        setImgThree(emptyFileState);

        // 3. Reset Basic Text & Select Inputs
        setTitle('');
        setPrice('');
        setCategory(''); // Resets to the <Select Category> disabled option
        setDescription('');

        // 4. Reset Array/List States (Ingredients & Tags)
        setIngredients([]);
        setTags([]);

        // update reset key
        setResetKey((prev) => prev + 1);

        // 5. UX: Scroll back to the top of the form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // handle save function
    const handleSaveBurger = async () => {
        // 1. Validation check
        if (!title || !price || !category || !cover.file) {
            alert('Please enter all the fields and select a cover image');
            return;
        }

        // set loading
        setLoading(true);

        try {
            const formData = new FormData();

            // append basic text fields
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('price', price);

            // arrays (stringified for transport)
            formData.append('ingredients', JSON.stringify(ingredients));
            formData.append('tags', JSON.stringify(tags));

            // files
            if (cover.file) formData.append('coverImage', cover.file);

            // gallery (images)
            [imgOne, imgTwo, imgThree].forEach((img) => {
                if (img.file) formData.append('images', img.file);
            });

            // send the formdata
            const response = await fetch('http://localhost:8000/api/v1/burgers', { method: 'POST', body: formData });

            // Check if there is content to parse
            const contentType = response.headers.get('content-type');
            let result = undefined;

            if (contentType && contentType.includes('application/json')) {
                result = await response.json();
            }

            if (response.ok) {
                alert('Burger Saved Successfully!');
                // reset form
                resetForm();
            } else {
                alert(`Error! ${result?.message || 'Could not save the Burger!'}`);
            }
        } catch (err) {
            console.error('Burger Save Error', err);
            alert('Submission Error! Burger could not be saved');
        } finally {
            setLoading(false);
        }
    };

    // handle submit

    useEffect(() => {
        // update ui title
        setPageTitle('Add Burger');

        // update browser tab
        document.title = 'Add Burger | BurgerHub';

        // clean up
        return () => {
            document.title = 'BurgerHub';
        };
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
                            <div className="flex h-72 w-[50%] flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
                                {/* title */}
                                <div className="bg-linear-to-r from-amber-400 to-amber-200 px-4 py-2.5">
                                    <span className="text-md font-normal">Upload Burger Images</span>
                                </div>
                                {/* images */}
                                <div className="w-full grow p-4">
                                    <div className="flex h-full w-full items-center justify-between gap-6">
                                        {/* cover image */}
                                        <CoverUpload key={`cover_img_${resetKey}`} cover={cover} setCover={setCover} />

                                        {/* images */}
                                        <div className="grid h-full flex-1 grid-cols-2 grid-rows-2 gap-2">
                                            {/* img 1 */}
                                            <ImageUpload
                                                key={`img_1_${resetKey}`}
                                                image={imgOne}
                                                setImage={setImgOne}
                                            />

                                            {/* img 2 */}
                                            <ImageUpload
                                                key={`img_2_${resetKey}`}
                                                image={imgTwo}
                                                setImage={setImgTwo}
                                            />

                                            {/* img 3 */}
                                            <ImageUpload
                                                key={`img_3_${resetKey}`}
                                                image={imgThree}
                                                setImage={setImgThree}
                                            />
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
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter burger name"
                                        className="w-full rounded-full border border-gray-400 px-5 py-2 transition-all duration-100 ease-in-out outline-none focus:border-orange-400"
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
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter burgeer price eg. 14.99"
                                        className="bborder w-[60%] [appearance:textfield] rounded-full border border-gray-400 px-5 py-2 transition-all duration-100 ease-in-out outline-none focus:border-orange-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-start gap-1">
                                    <label htmlFor="category" className="pl-1 font-semibold">
                                        Burger Category
                                    </label>
                                    <select
                                        name="category"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value as BurgerCategory)}
                                        className="category-select w-[80%] cursor-pointer rounded-full border border-gray-400 px-5 py-2.5 transition-all duration-100 ease-in-out outline-none focus:border-orange-400"
                                    >
                                        {/* as this a title design it separately @hugu */}
                                        <option selected value="" disabled>
                                            &lt; Select Category &gt;
                                        </option>
                                        <option value="beef">Beef</option>
                                        <option value="chicken">Chicken</option>
                                        <option value="vegetable">Vegetable</option>
                                        <option value="fish">Fish</option>
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter your burger description"
                                className="w-full rounded-2xl border border-gray-400 px-4 py-2.5 transition-all duration-100 ease-in-out outline-none focus:border-orange-400"
                            ></textarea>
                        </div>

                        {/* burger ingredients & burger tags */}
                        <div className="mt-8 flex items-center justify-between gap-10 px-2">
                            {/* ingredients */}
                            <TagSelector
                                inputTitle="Ingredients"
                                inputName="ingredient"
                                dataList={ingredients}
                                setDataList={setIngredients}
                            />

                            {/* tags */}
                            <TagSelector inputTitle="Tags" inputName="tags" dataList={tags} setDataList={setTags} />
                        </div>

                        {/* cancel and submit button */}
                        <div className="mt-12 flex items-center justify-start gap-8 pl-4">
                            <div>
                                <button
                                    type="button"
                                    className="text cursor-pointer rounded-full bg-red-400 px-6 py-2 text-xl font-semibold text-white shadow-xl transition-all duration-150 ease-out select-none hover:-translate-y-1 hover:bg-red-500 hover:shadow-sm active:translate-0"
                                >
                                    Cancel
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={handleSaveBurger}
                                    className={`cursor-pointer rounded-full px-6 py-2 text-xl font-semibold text-white shadow-xl transition-all duration-150 ease-out select-none ${
                                        loading
                                            ? 'cursor-not-allowed bg-gray-400'
                                            : 'bg-blue-400 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-sm active:translate-0'
                                    }`}
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
