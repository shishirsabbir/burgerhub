// imports
import { Outlet } from 'react-router';
import Header from './Header';
import { useState } from 'react';

export default function PageLayout() {
    const [pageTitle, setPageTitle] = useState<string>('Admin Panel');

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden rounded-2xl pb-20">
            {/* header */}
            <div className="ro relative h-22 w-full">
                <Header pageTitle={pageTitle} />
            </div>

            {/* Main Content Are */}
            <div className="h-full min-h-0 w-full flex-1 overflow-y-auto">
                <div className="h-full w-full px-8 max-[1412px]:px-5">
                    {/* declare the page sections only */}

                    <Outlet context={{ pageTitle, setPageTitle }} />
                </div>
            </div>
        </div>
    );
}
