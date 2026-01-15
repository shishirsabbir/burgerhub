// imports
import { useState, type Dispatch, type SetStateAction, type KeyboardEvent } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

// tag selector props
interface TagSelectorProps {
    inputTitle: string;
    inputName: string;
    dataList: string[];
    setDataList: Dispatch<SetStateAction<string[]>>;
}

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

export default function TagSelector({ inputTitle, inputName, dataList, setDataList }: TagSelectorProps) {
    const [inputValue, setInputValue] = useState('');

    const handleDelete = (item: string): void => {
        setDataList((prev) => prev.filter((i) => i !== item));
    };

    // logic to handle keypresses
    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        // check for enter or comma
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();

            // clean the input, remove the trailing comma if there is any
            const value = inputValue
                .toLowerCase()
                .replace(/^[^a-z]+|[^a-z]+$/g, '') // Clean boundaries
                .replace(/\s+/g, ' ') // Collapse multiple spaces
                .trim();

            // prevents empty tags or duplicates
            if (value && !dataList.includes(value)) {
                setDataList((prev) => [...prev, value]);
                setInputValue(''); // clear the input value
            } else {
                setInputValue(''); // just clear the duplicates or empty
            }
        }
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
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                        onKeyUp={handleKeyUp}
                        placeholder={dataList.length === 0 ? 'Add Items...' : ''}
                        className="max-w-26 border-b px-1 py-0.5 outline-none focus:border-orange-400"
                    />
                </div>
            </div>
            <div className="mt-1 w-full pl-3">
                <span className="text-sm text-gray-500">
                    Add <span className="font-semibold">{inputTitle}</span> by Pressing{' '}
                    <kbd className="mx-1 rounded-sm border border-gray-300 bg-gray-100 px-1 py-0.5">Enter</kbd> key or{' '}
                    <kbd className="mx-1 rounded-sm border border-gray-300 bg-gray-100 px-1 py-0.5">Comma</kbd> key
                </span>
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
