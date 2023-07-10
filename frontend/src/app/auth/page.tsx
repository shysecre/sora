import AuthCompletion from "@/app/auth/components/auth-completion";

type Props = {
  searchParams: {
    state: string;
    code: string;
  };
};

export default function Auth({ searchParams }: Props) {
  return (
    <div className="bg-dark-bg h-screen w-screen flex justify-center items-center">
      <p className="text-6xl">Processing your authorization</p>
      <AuthCompletion {...searchParams} />
    </div>
  );
}
