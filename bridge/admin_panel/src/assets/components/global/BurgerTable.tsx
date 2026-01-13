// imports
import { Link } from 'react-router';
import { FaHamburger } from 'react-icons/fa';

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
                <span className={`${isHeader ? 'w-full text-center' : ''}`}>{burgerData.title}</span>
            </div>
            <div className="flex w-[20%] items-center justify-center">
                <span className="">{burgerData.category}</span>
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
                            to="#"
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

export default function BurgerTable() {
    const dummyRows = Array(20).fill(0);

    return (
        <div className="w-full overflow-hidden rounded-b-2xl shadow-md">
            {/* header */}
            <TableRow
                isHeader={true}
                bgColor="bg-orange-200"
                burgerData={{ title: 'Title', category: 'Category', price: 'Price' }}
            />

            {/* rows */}
            {dummyRows.map((_, i) => {
                return (
                    <TableRow
                        key={i}
                        bgColor={`${(i + 1) % 2 === 0 ? 'bg-rose-50/90' : 'bg-rose-100/10'}`}
                        isHeader={false}
                        burgerData={{ title: 'Burger Name', category: 'Beef', price: 4.99 }}
                    />
                );
            })}
        </div>
    );
}
