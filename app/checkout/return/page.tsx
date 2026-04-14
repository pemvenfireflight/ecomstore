type ReturnPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutReturnPage({ searchParams }: ReturnPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Thank you for your order</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-300">
        Payment completed. We are processing fulfillment now.
      </p>
      {params.session_id ? (
        <p className="mt-2 text-xs text-zinc-500">Session: {params.session_id}</p>
      ) : null}
    </main>
  );
}
