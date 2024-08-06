export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex justify-center items-center min-h-screenor">
      {children}
    </main>
  );
}
