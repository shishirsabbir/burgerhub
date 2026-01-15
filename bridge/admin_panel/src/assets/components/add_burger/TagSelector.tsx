// imports
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

// local components
function Tag({ item, handleDelete }: { item: string; handleDelete: (item: string) => void }) {
    return (
        <div className="group flex items-center justify-between gap-2 rounded-lg bg-gray-100 px-2 py-1">
            <span className="p-0.5 font-medium uppercase">{item}</span>
            <span
                onClick={() => handleDelete(item)}
                className="cursor-pointer rounded-full p-0.5 select-none group-hover:bg-red-300 group-hover:text-white hover:bg-red-400"
            >
                <IoCloseOutline className="size-4" />
            </span>
        </div>
    );
}

export default function TagSelector({ inputTitle, inputName }: { inputTitle: string; inputName: string }) {
    const [dataList, setDataList] = useState<string[]>([
        'mushroom',
        'tomato',
        'cheese',
        'burger',
        'beef',
        'onion',
        'garlic',
        'ginger',
        'sauce',
    ]);

    const handleDelete = (item: string): void => {
        setDataList((prev) => prev.filter((i) => i !== item));
    };

    return (
        <div className="flex w-1/2 flex-col gap-2">
            <label htmlFor={inputName} className="pl-2 font-semibold">
                Burger {inputTitle}
            </label>
            <div className="flex w-full flex-wrap items-center justify-start gap-2 rounded-lg border border-gray-400 px-5 py-4 outline-none focus:border-orange-400">
                {dataList?.length ? (
                    <>
                        {dataList.map((dataItem, i) => {
                            return <Tag key={i} item={dataItem} handleDelete={handleDelete} />;
                        })}
                    </>
                ) : (
                    <></>
                )}
                <div className="inline-block">
                    <input
                        type="text"
                        name={inputName}
                        id={inputName}
                        className="max-w-26 border-b px-1 py-0.5 outline-none focus:border-orange-400"
                    />
                </div>
            </div>

            {/* <input
                type="text"
                name={inputName}
                id={inputName}
                className="w-full rounded-full border-2 border-gray-400 px-5 py-2 outline-none focus:border-orange-400"
            /> */}
        </div>
    );
}
