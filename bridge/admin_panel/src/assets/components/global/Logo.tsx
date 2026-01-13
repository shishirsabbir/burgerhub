// imports
import { FaHamburger } from 'react-icons/fa';

export default function Logo() {
    return (
        <div className="flex items-center justify-start gap-2.5">
            <span>
                <FaHamburger className="size-10 text-orange-400 max-xl:size-8" />
            </span>
            <span>
                <h2 className="text-3xl font-semibold max-xl:text-2xl">
                    <span>Burger</span>
                    <span className="text-orange-400">Hub</span>
                </h2>
            </span>
        </div>
    );
}
