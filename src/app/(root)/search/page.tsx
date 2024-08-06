import UserCard from "@/components/cards/UserCard";
import { Input } from "@/components/ui/input";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch users
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 20,
  });

  return (
    <section>
      {/* Search Bar */}
      <div className="relative mt-8 mb-5">
        <Input
          placeholder="Search by username or name"
          className="account_input no-focus placeholder:text-light-1 w-full"
          style={{ zIndex: 1000 }} // Ensure it's on top of other elements
        />
      </div>

      <div className="mt-14 flex flex-col gap-9">
        {result?.users.length === 0 ? (
          <p className="text-center !text-base-regular text-light-3">No user</p>
        ) : (
          <>
            {result?.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
