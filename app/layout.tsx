import type { Metadata } from "next";
import localFont from "next/font/local";
import { Oswald, Inter, Fredoka } from "next/font/google";
import "./globals.css";
// import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from "@/src/context/auth-context";
import { Toaster } from "@/src/components/ui/toaster";
import ReactQueryProvider from "@/src/providers/react-query-provider";


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['500', '600', '700']
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: "Academia Management Sync - Gestion académique simplifiée",
  description:
    "Academia Management Sync (AMS) est une plateforme SaaS innovante dédiée à la gestion académique. Optimisez la gestion des établissements scolaires avec des tableaux de bord personnalisés, des outils d'administration, et des fonctionnalités modernes pour les étudiants, enseignants et administrateurs.",
  keywords:
    "gestion académique, SaaS, logiciel scolaire, tableau de bord, administration scolaire, gestion des étudiants, gestion des enseignants, ERP éducatif, AMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${oswald.variable} ${inter.variable} ${fredoka.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
