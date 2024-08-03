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
