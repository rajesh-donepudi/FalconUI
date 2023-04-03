import InfiniteScrollingList from "../components/inifinte-scrolling-list";
import LogListItem from "../components/log-list-item";

export default function RequestInformation() {
  return (
    <>
      <InfiniteScrollingList
        body={<LogListItem />}
        pageSize={40}
        url="https://rajeshdnp.com/api/RequestInformation/get-all"
      />
    </>
  );
}
