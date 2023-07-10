import CategorySearch from "@/app/profile/components/category-search";
import UserInfo from "@/app/profile/components/user-info";

export default async function Profile() {
  return (
    <div className="bg-dark-bg h-screen w-screen flex justify-center items-center flex-col">
      <UserInfo />
      <h1 className="absolute top-0 pt-9 text-4xl">Profile Page</h1>
      <div>
        <div className="flex justify-center items-center">
          <CategorySearch />
        </div>
      </div>
    </div>
  );
}
