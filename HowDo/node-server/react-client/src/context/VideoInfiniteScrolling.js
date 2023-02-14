import { useEffect, useState } from "react";
import { useVideoContentContext } from "./VideoContentContextProvide";

const VideoInfiniteScrolling = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setVideoItemList } = useVideoContentContext();

  useEffect(() => {
    setLoading(true);
    setError(false);

    const videoFetch = async () => {
      try {
        const res = await fetch(`/video/main/${pageNumber}`);
        const result = await res.json();
        let tempArray = [...result];
        tempArray.sort(() => Math.random() - 0.5);
        console.log(tempArray);
        setVideoItemList((prev) => {
          return [...new Set([...prev, ...tempArray])];
        });
        setLoading(false);
      } catch (e) {
        setError(true);
      }
    };
    videoFetch();
  }, [pageNumber]);
  return { loading, error };
};

export default VideoInfiniteScrolling;
