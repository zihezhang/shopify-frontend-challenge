
export const getLiked = () => {
  const storage = window.localStorage.getItem("likedPosts");
  const likes = storage ? storage : [];
  return likes;
};

export const isLiked = (date) => {
  const likes = getLiked();
  return likes.includes(date);
};

export const setLiked = (date, liked) => {
  const likes = getLiked();

  if (liked) {
    likes[date] = true;
  } else {
    delete likes[date];
  }
  window.localStorage.setItem("likedPosts", likes);

//   window.localStorage.setItem("likedPosts", JSON.stringify(likes));
};
