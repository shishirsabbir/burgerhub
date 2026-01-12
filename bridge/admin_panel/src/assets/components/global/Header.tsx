// imports

export default function Header() {
    return (
        <header className="sticky top-0 flex h-full w-full items-center justify-between bg-orange-200 px-8">
            {/* page title */}
            <div className="flex items-center justify-center">
                <h1 className="text-3xl font-semibold">Dashboard</h1>
            </div>
            <div>
                <div className="flex items-center justify-center gap-2">
                    <div className="h-full">
                        <img src="/img/profile.png" className="size-12" alt="Demo User Profile Image" />
                    </div>
                    <div>
                        <span>
                            <p className="text-md font-medium">User Name</p>
                        </span>
                        <span>
                            <p className="text-sm">username@mail.com</p>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
