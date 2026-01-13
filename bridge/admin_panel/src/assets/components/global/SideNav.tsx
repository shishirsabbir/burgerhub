// imports
import { MdOutlineDashboard, MdOutlineDeliveryDining } from 'react-icons/md';
import { NavLink } from 'react-router';
import Logo from './Logo';
import type { IconType } from 'react-icons';
import { PiHamburgerBold } from 'react-icons/pi';
import { FaUsers } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';

// local components
function NavItem({ Icon, urlTo, navTitle }: { Icon: IconType; urlTo: string; navTitle: string }) {
    return (
        <NavLink
            to={urlTo}
            className="flex w-full items-center justify-start gap-2 rounded-full bg-orange-50 px-3.5 py-1.5 shadow-sm transition-all duration-200 ease-in-out hover:bg-amber-200"
        >
            <span>
                <Icon className="size-5" />
            </span>
            <span className="">{navTitle}</span>
        </NavLink>
    );
}

export default function SideNav() {
    return (
        <div className="h-full w-full">
            {/* logo */}
            <div className="flex w-full items-center justify-start">
                <Logo />
            </div>

            {/* main menu */}
            <div className="mt-10 w-full">
                <h4 className="text-xs uppercase">Menu</h4>
                <nav className="mt-2 flex w-full flex-col items-start gap-2">
                    <NavItem Icon={MdOutlineDashboard} urlTo="#" navTitle="Dashbaord" />
                    <NavItem Icon={PiHamburgerBold} urlTo="#" navTitle="Burger List" />
                    <NavItem Icon={MdOutlineDeliveryDining} urlTo="#" navTitle="Orders" />
                    <NavItem Icon={FaUsers} urlTo="#" navTitle="Users" />
                </nav>
            </div>

            {/* settings menu */}
            <div className="mt-10 w-full">
                <h4 className="text-xs uppercase">Settings</h4>
                <nav className="mt-2 flex w-full flex-col items-start gap-2">
                    <NavItem Icon={FaUserCircle} urlTo="#" navTitle="Profile" />
                </nav>
            </div>
        </div>
    );
}
