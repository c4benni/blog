import { addPost } from "../store/fetchedPosts";
import { DynamicObject } from "../types";

interface PostInfo {
  title: string;
  subtitle: string;
}

export default async function fetchPost(id: string): Promise<1 | 0> {
  const res = (await import("../store/posts.json"))
    .default as unknown as DynamicObject<PostInfo | string>;

  const post = res?.[id] as PostInfo;

  if (post) {
    const getSrc = (thumbnail?: boolean) =>
      `https://loremflickr.com/${
        thumbnail ? "320/200" : "1000/400"
      }/dog/?lock=${id}&random=${id}`;

    const data = {
      content: res.content as string,
      poster: {
        src: getSrc(),
        alt: `Poster ${id}`,
      },
      thumbnail: {
        src: getSrc(true),
        alt: `Thumbnail ${id}`,
      },
      title: post.title,
      subtitle: post.subtitle,
      id,
    };

    addPost(data);

    return 1;
  }

  return 0;
}
