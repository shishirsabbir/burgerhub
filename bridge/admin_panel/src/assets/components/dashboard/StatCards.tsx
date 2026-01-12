// imports
import { PiHamburgerFill } from 'react-icons/pi';
import { BsGraphUpArrow, BsGraphDownArrow } from 'react-icons/bs';
import type { IconType } from 'react-icons';
import { MdCategory } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import { FaTruck } from 'react-icons/fa';

// local components
function Card({
    MainIcon,
    SubIcon,
    classString,
    mainTitle,
    statNumber,
    subText,
    mainIconColor,
}: {
    MainIcon: IconType;
    SubIcon: IconType;
    classString: string;
    mainTitle: string;
    statNumber: number;
    subText: string;
    mainIconColor: string;
}) {
    return (
        <div className={`${classString} flex flex-col gap-3 rounded-2xl p-7 text-white`}>
            <div className="flex items-center justify-between gap-4">
                <span>
                    <h4 className="text-xl">{mainTitle}</h4>
                </span>
                <span className="flex items-center justify-center rounded-full bg-white p-2">
                    <MainIcon className={`size-6 ${mainIconColor}`} />
                </span>
            </div>
            <div>
                <p className="text-5xl font-semibold">{statNumber}</p>
            </div>
            <div className="flex items-center justify-start gap-2">
                <span>
                    <SubIcon className="size-4" />
                </span>
                <span>
                    <p className="text-sm">{subText}</p>
                </span>
            </div>
        </div>
    );
}

export default function StatCards() {
    return (
        <section className="mt-8 flex w-full items-center justify-between gap-3">
            <Card
                MainIcon={PiHamburgerFill}
                SubIcon={BsGraphUpArrow}
                classString="bg-linear-to-tr from-violet-800 to-violet-300"
                mainTitle="Total Burgers"
                statNumber={6}
                subText="Increased from last month"
                mainIconColor="text-violet-600"
            />
            <Card
                MainIcon={MdCategory}
                SubIcon={BsGraphUpArrow}
                classString="bg-linear-to-tr from-green-800 to-green-300"
                mainTitle="Active Categories"
                statNumber={4}
                subText="Increased from last month"
                mainIconColor="text-green-600"
            />
            <Card
                MainIcon={FaUsers}
                SubIcon={BsGraphDownArrow}
                classString="bg-linear-to-tr from-blue-800 to-blue-300"
                mainTitle="Total Users"
                statNumber={23}
                subText="Decreased from last month"
                mainIconColor="text-blue-600"
            />
            <Card
                MainIcon={FaTruck}
                SubIcon={BsGraphUpArrow}
                classString="bg-linear-to-tr from-pink-800 to-pink-300"
                mainTitle="Total Orders"
                statNumber={177}
                subText="Increased from last month"
                mainIconColor="text-pink-600"
            />
        </section>
    );
}
