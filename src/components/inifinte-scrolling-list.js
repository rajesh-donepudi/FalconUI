import { useInfiniteQuery } from "react-query";
import { useEffect } from "react";
import { useRef, useCallback } from "react";
import axios from "axios";
import Loader from "../components/loader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import LogListItem from "./log-list-item";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function InfiniteScrollingList(props) {
  const LIMIT = props.pageSize;
  const observerElem = useRef(null);

  const fetchRequests = (page) => {
    return axios({
      method: "GET",
      url: `${props.url}?PageNumber=${page}&PageSize=${LIMIT}`,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((r) => r);
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery("repos", ({ pageParam = 1 }) => fetchRequests(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.length !== 0 ? nextPage : undefined;
      },
    });

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return (
    <>
      {isSuccess &&
        data.pages.map((page) =>
          page.data.response.map((r) => <LogListItem data={r} />)
        )}
      <div className="loader" ref={observerElem}>
        {isFetchingNextPage && hasNextPage ? (
          <Stack direction="row" justifyContent="center">
            <Loader />
          </Stack>
        ) : (
          <Stack direction="row" justifyContent="center">
            <CircularProgress />
          </Stack>
        )}
      </div>
    </>
  );
}
