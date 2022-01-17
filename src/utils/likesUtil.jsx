export const getLiked = () => {
  const storage = window.localStorage.getItem("likedPosts");
  const likes = storage ? JSON.parse(storage) : [];
  return likes;
};

export const isLiked = (date) => {
  const likes = getLiked();
  return likes.includes(date);
};

export const setLiked = (date, liked) => {
  let likedList = getLiked();
  if (liked) {
    likedList = likedList.filter((item) => item !== date);
  } else {
    likedList.push(date);
  }
  window.localStorage.setItem("likedPosts", JSON.stringify(likedList));
};
