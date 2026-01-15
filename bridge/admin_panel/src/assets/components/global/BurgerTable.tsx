// imports
import { Link } from 'react-router';
import { FaHamburger } from 'react-icons/fa';
import type { BurgerData } from '../../../types/burger';

// type interface
export interface TableDataBurger {
    id?: string | number;
    title: string;
    category: string;
    price: number | string;
}

// local components
function TableRow({
    isHeader,
    burgerData,
    bgColor,
}: {
    isHeader: boolean;
    burgerData: TableDataBurger;
    bgColor: string;
}) {
    return (
        <div className={`${isHeader ? 'font-semibold' : ''} ${bgColor} flex items-center px-4 py-3`}>
            <div className={`flex w-[40%] items-center justify-start gap-3 ${isHeader ? '' : 'pl-4'}`}>
                {!isHeader && (
                    <span>
                        <FaHamburger className="size-6" />
                    </span>
                )}
                <span className={`${isHeader ? 'w-full text-center' : ''} capitalize`}>{burgerData.title}</span>
            </div>
            <div className="flex w-[20%] items-center justify-center">
                <span className={`${isHeader ? '' : 'uppercase'}`}>{burgerData.category}</span>
            </div>
            <div className="flex w-[15%] items-center justify-center">
                <span>{burgerData.price}</span>
            </div>
            <div className="flex w-[25%] items-center justify-center">
                <span>
                    {isHeader ? (
                        <span>Action</span>
                    ) : (
                        <Link
                            to={`/burgers/${burgerData.id}`}
                            className="rounded-full bg-orange-400 px-2.5 py-1 text-base text-white transition-all duration-200 ease-in-out hover:bg-orange-500"
                        >
                            View
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
}

export default function BurgerTable({ burgerDataList }: { burgerDataList: BurgerData[] }) {
    return (
        <div className="w-full overflow-hidden rounded-b-2xl shadow-md">
            {/* header */}
            <TableRow
                isHeader={true}
                bgColor="bg-orange-200"
                burgerData={{ title: 'Title', category: 'Category', price: 'Price' }}
            />

            {/* rows */}
            {burgerDataList?.length ? (
                <>
                    {burgerDataList.map((burgerData, i) => {
                        return (
                            <TableRow
                                key={burgerData.id}
                                bgColor={`${(i + 1) % 2 === 0 ? 'bg-rose-50/90' : 'bg-rose-100/10'}`}
                                isHeader={false}
                                burgerData={{
                                    id: burgerData.id,
                                    title: burgerData.title,
                                    category: burgerData.category,
                                    price: burgerData.price,
                                }}
                            />
                        );
                    })}
                </>
            ) : (
                // empty row
                <div className="flex items-center justify-center px-4 py-6">
                    <p className="w-full text-center">No Burgers Found 🤔</p>
                </div>
            )}
        </div>
    );
}
