import Link from "next/link";

const HomePage = () => {
    return (
        <div>
            <h1 className="text-3xl">Welcome</h1>
            {/* Use Next.js <Link> for navigation */}
            <Link href="/properties">
                Go to Properties
            </Link>
        </div>
    );
}

export default HomePage;
