import { ref } from "vue";
import { DynamicObject, Post } from "../types";

export const posts = ref<DynamicObject<Post>>({});

export const addPost = (post: Post) => {
  const { id, content, poster, thumbnail, title, subtitle } = post;

  posts.value[id] = {
    content,
    poster,
    thumbnail,
    title,
    subtitle,
    id,
  };
};
