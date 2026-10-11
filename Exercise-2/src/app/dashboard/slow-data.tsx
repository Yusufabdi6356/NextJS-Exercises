export async function SlowComponent() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <p className="mt-4">This data was delayed 3 seconds.</p>;
}
