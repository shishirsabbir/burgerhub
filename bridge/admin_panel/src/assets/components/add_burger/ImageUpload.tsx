// imports
import React, { useEffect, useRef, type ChangeEvent } from 'react';
import { FaPlus } from 'react-icons/fa6';
import type { FileState } from '../../../types/burger';

export default function ImageUpload({
    image,
    setImage,
}: {
    image: FileState;
    setImage: React.Dispatch<React.SetStateAction<FileState>>;
}) {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // cleanup previous object url if user changes event
            if (image.preview) URL.revokeObjectURL(image.preview);

            setImage({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    // clean up function during unmount
    useEffect(() => {
        return () => {
            if (image.preview) URL.revokeObjectURL(image.preview);
        };
    }, [image.preview]);

    return (
        <div
            onClick={() => imageInputRef.current?.click()}
            className="cursor-pointer rounded-lg border-2 border-dashed border-orange-300 transition-all select-none hover:bg-orange-50"
        >
            <input
                type="file"
                name="coverImage"
                id="coverImage"
                hidden
                ref={imageInputRef}
                onChange={handleImageChange}
                accept="image/*"
            />

            {image.preview ? (
                <div className="relative h-full w-full">
                    <img
                        src={image.preview}
                        alt="Burger Cover Review"
                        className="absolute inset-0 h-full w-full object-contain"
                    />
                </div>
            ) : (
                <div className="flex h-full w-full items-center justify-center">
                    <span className="">
                        <FaPlus className="size-7 text-orange-400" />
                    </span>
                </div>
            )}
        </div>
    );
}
