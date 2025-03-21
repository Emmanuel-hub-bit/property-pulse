import '../../assets/styles/globals.css'

export const metadata = {
    title: 'Property Pulse',
    keywords: 'rental, property, real estate',
    description: 'Your go-to platform for all your property needs.',
}

const MainLayout = ({ children }) => {
    return ( <html>
        <body>
            <main>
                { children }
            </main>
        </body>
    </html> );
}
 
export default MainLayout;