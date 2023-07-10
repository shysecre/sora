import AuthSection from "@/app/components/auth-section";

export default async function Home() {
  return (
    <main className="bg-dark-bg flex items-center flex-col justify-center h-screen w-screen">
      <h1>Sora 🫧</h1>
      <AuthSection />
    </main>
  );
}
