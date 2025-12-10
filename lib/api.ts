export async function backend(path: string, options: any = {}) {
  const token = (await import("./auth")).getUser()?.access_token;

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });
}
