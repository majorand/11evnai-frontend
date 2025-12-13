export async function backend(path: string, options: any = {}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,
    {
      ...options,
      credentials: "include",
    }
  );

  return res;
}
