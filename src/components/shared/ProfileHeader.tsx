import Image from "next/image";

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: ProfileHeaderProps) => {
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="flex flex-col w-full justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="profile"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div>
            <h2 className="text-light-1 text-left text-heading3-bold">
              {capitalizeFirstLetter(name)}
            </h2>
            <p className="text-gray-1 text-base-medium">@{username}</p>
          </div>
        </div>
      </div>

      <p className="text-light-2 mt-2 max-w-lg text-base-regular">{bio}</p>
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
