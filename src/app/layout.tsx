import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthProvider from "../../components/AuthProvider";
import ToastProvider from "../../components/ToastProvider";
import { GlobalProvider } from "../../context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/globals.css";

export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real estate",
  description: "Your go-to platform for all your property needs.",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastProvider />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
