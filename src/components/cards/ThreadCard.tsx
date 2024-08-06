import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: ThreadProps) => {
  return (
    <article
      className={`flex flex-col w-full rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      } `}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-row flex-1 w-full gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="author"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="card_bar" />
          </div>
          <div className="flex flex-col w-full">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <p className="text-small-regular text-light-2 mt-2">{content}</p>

            <div className="flex flex-col mt-5 gap-3 mb-10">
              <div className="flex gap-5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="object-contain cursor-pointer"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
              </div>

              {/* Display number of replies */}
              {comments?.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} {comments.length === 1 ? "reply" : "replies"}
                  </p>
                </Link>
              )}

              {isComment && comments?.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
              {!isComment && (
                <div className="mt-5 flex items-center">
                  {community ? (
                    <>
                      <Link href={`communities/${community.id}`}>
                        <p className="text-subtle-medium text-gray-1">
                          {formatDateString(createdAt)} - {community.name}{" "}
                          Community
                        </p>
                      </Link>
                      <Image
                        src={community.image}
                        alt={community.name}
                        width={14}
                        height={14}
                        className="ml-1 rounded-full object-cover"
                      />
                    </>
                  ) : (
                    <p className="text-subtle-medium text-gray-1">
                      {formatDateString(createdAt)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* To Do Delete thread */}
      </div>
    </article>
  );
};

export default ThreadCard;
