export const SingIn = () => {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="flex h-full w-14 cursor-pointer items-center justify-center rounded-md bg-gray-600 text-center text-sm hover:bg-emerald-600 hover:text-white"
    >
      Create Account
    </a>
  );
};
