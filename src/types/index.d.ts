declare interface UserProps {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

declare interface UserParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

declare interface ThreadParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

declare interface ThreadProps {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

declare interface CommentsProps {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}

declare interface ProfileHeaderProps {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community"
}

declare interface ThreadsTabProps {
  currentUserId: string;
  accountType: string;
  accountId: string;
}

declare interface SearchUsersProps {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}
