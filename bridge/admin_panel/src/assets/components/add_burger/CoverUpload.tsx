// imports
import React, { useEffect, useRef, type ChangeEvent } from 'react';
import type { FileState } from '../../../types/burger';
import { FaPlus } from 'react-icons/fa6';

export default function CoverUpload({
    cover,
    setCover,
}: {
    cover: FileState;
    setCover: React.Dispatch<React.SetStateAction<FileState>>;
}) {
    const coverInputRef = useRef<HTMLInputElement>(null);

    const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // cleanup previous object url if user changes event
            if (cover.preview) URL.revokeObjectURL(cover.preview);

            setCover({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    // clean up function during unmount
    useEffect(() => {
        return () => {
            if (cover.preview) URL.revokeObjectURL(cover.preview);
        };
    }, [cover.preview]);

    return (
        <div
            onClick={() => coverInputRef.current?.click()}
            className="relative h-full flex-1 cursor-pointer rounded-lg border-2 border-dashed border-orange-300 transition-all select-none hover:bg-orange-50"
        >
            <input
                type="file"
                name="coverImage"
                id="coverImage"
                hidden
                ref={coverInputRef}
                onChange={handleCoverChange}
                accept="image/*"
            />

            {cover.preview ? (
                <div className="relative h-full w-full">
                    <img
                        src={cover.preview}
                        alt="Burger Cover Review"
                        className="absolute inset-0 h-full w-full object-contain"
                    />
                </div>
            ) : (
                <div className="flex h-full w-full items-center justify-center">
                    <span className="">
                        <FaPlus className="size-12 text-orange-400" />
                    </span>
                </div>
            )}

            {/* image label */}
            <div className="absolute bottom-2 left-2 flex items-center justify-center">
                <span className="rounded-lg bg-gray-100/90 px-1 py-0.5 text-gray-700">Cover Image</span>
            </div>
        </div>
    );
}
