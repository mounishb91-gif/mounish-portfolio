import "./globals.css";

export const metadata = {
  title: "Mounish B | Portfolio",
  description: "Mounish B Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}