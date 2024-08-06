import CommunityCard from "@/components/cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";

const Page = async () => {
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch communities
  const result = await fetchCommunities({
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

      <div className="grid grid-cols-1 md:grid-cols-2  gap-9">
        {result?.communities.length === 0 ? (
          <p className="text-center !text-base-regular text-light-3">No user</p>
        ) : (
          <>
            {result?.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
