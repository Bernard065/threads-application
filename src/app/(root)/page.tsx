import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs/server";

const Home = async () => {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();

  console.log(result);

  return (
    <>
      <section className="flex flex-col mt-9 gap-10">
        {result?.threads.length === 0 ? (
          <p className="text-center text-base-regular text-light-3">
            No threads found
          </p>
        ) : (
          <>
            {result?.threads.map((thread) => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
