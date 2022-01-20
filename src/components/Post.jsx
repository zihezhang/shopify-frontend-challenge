import React, { useCallback, useEffect, useState } from "react";
import { Icon, MediaCard, VideoThumbnail } from "@shopify/polaris";
import { HomeMajor, CirclePlusMinor, HeartMajor } from "@shopify/polaris-icons";
import { getLiked, isLiked, setLiked } from "../utils/likesUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartGloveSolid } from "@fortawesome/free-solid-svg-icons";

const Post = ({ item, liked }) => {
  const [like, setLike] = useState(liked);

  return (
    <MediaCard
      title={item.title + " - " + item.date}
      primaryAction={{
        accessibilityLabel: "Like Post",
        content: (
          <FontAwesomeIcon
            icon={like ? faHeartGloveSolid : faHeartRegular}
            color={like ? "red" : "gray"}
          />
        ),
        //   icon: HeartMajor,
        outline: false,
        onAction: () => {
          setLike(!like);
          setLiked(item.date, like);
        },
      }}
      secondaryAction={{
        accessibilityLabel: "Share",
        content: "Share",
        onAction: () => navigator.clipboard.writeText(item.hdurl),
      }}
      description={item.explanation}
      // popoverActions={[
      //   { content: "Dismiss", onAction: () => {} },
      // ]}
      portrait={true}
      size="small"
    >
      {item.media_type === "image" ? (
        <img
          alt=""
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={item.url}
        />
      ) : (
        <VideoThumbnail
          videoLength={80}
          thumbnailUrl={item.thumbnail_url}
          // onClick()
        />
      )}
    </MediaCard>
  );
};

export default Post;