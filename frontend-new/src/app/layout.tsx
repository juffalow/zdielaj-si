import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Menu from './components/Menu';
import Footer from './components/Footer';
import { AuthProvider } from '../utils/useAuth';
import { UploadProvider } from '../utils/useUpload';
import styles from './page.module.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zdielaj.si",
  description: "Tiež máš problém, že ti niektoré aplikácie znížujú kvalitu fotiek a videí? Tu ich môžeš zdielať bez problémov v plnej kvalite!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={inter.className}>
        <AuthProvider>
          <UploadProvider>
            <Menu />
          
            <main className={styles.main}>
              {children}
            </main>

            <Footer />
          </UploadProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
