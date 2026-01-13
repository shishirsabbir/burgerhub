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
        <div className={`${classString} flex flex-1 flex-col gap-3 rounded-2xl p-7 text-white max-[1412px]:p-4`}>
            <div className="flex items-center justify-between gap-4">
                <span>
                    <h4 className="text-xl leading-tight max-[1412px]:text-lg">{mainTitle}</h4>
                </span>
                <span className="flex items-center justify-center rounded-full bg-white/80 p-2">
                    <MainIcon className={`size-6 ${mainIconColor}`} />
                </span>
            </div>
            <div>
                <p className="text-5xl font-semibold max-[1412px]:text-4xl">{statNumber}</p>
            </div>
            <div className="flex items-center justify-start gap-2">
                <span>
                    <SubIcon className="size-4" />
                </span>
                <span>
                    <p className="text-sm max-[1412px]:text-xs">{subText}</p>
                </span>
            </div>
        </div>
    );
}

export default function StatCards() {
    return (
        <section className="mt-8 flex w-full items-center justify-between gap-3 max-xl:flex-wrap max-xl:justify-start">
            <Card
                MainIcon={PiHamburgerFill}
                SubIcon={BsGraphUpArrow}
                classString="bg-gradient-to-tr from-orange-500 via-orange-400 to-yellow-100"
                mainTitle="Total Burgers"
                statNumber={6}
                subText="Increased from last month"
                mainIconColor="text-orange-600"
            />
            <Card
                MainIcon={MdCategory}
                SubIcon={BsGraphUpArrow}
                classString="bg-linear-to-tr from-rose-400 via-pink-300 to-rose-50"
                mainTitle="Active Categories"
                statNumber={4}
                subText="Increased from last month"
                mainIconColor="text-rose-600"
            />
            <Card
                MainIcon={FaUsers}
                SubIcon={BsGraphDownArrow}
                classString="bg-linear-to-tr from-pink-400 via-rose-300 to-rose-50"
                mainTitle="Total Users"
                statNumber={23}
                subText="Decreased from last month"
                mainIconColor="text-rose-600"
            />
            <Card
                MainIcon={FaTruck}
                SubIcon={BsGraphUpArrow}
                classString="bg-linear-to-tr from-red-400 via-pink-300 to-red-50"
                mainTitle="Total Orders"
                statNumber={177}
                subText="Increased from last month"
                mainIconColor="text-rose-600"
            />
        </section>
    );
}
