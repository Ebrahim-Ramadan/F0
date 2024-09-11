
export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <div className="flex flex-col min-h-screen w-full py-4">
        {children}
      </div>
    );
  }