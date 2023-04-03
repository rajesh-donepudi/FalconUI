import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import InfiniteScrollingList from "../components/inifinte-scrolling-list";
import LogListItem from "../components/log-list-item";

const Test = () => {
  return (
    <div>
      <InfiniteScrollingList
        body={<LogListItem />}
        pageSize={40}
        url="https://localhost:7188/api/RequestInformation/get-all"
      />
    </div>
  );
};

export function Post(props) {
  return (
    <Stack>
      <Stack></Stack>
      <Stack>
        <Typography>{props?.data?.content}</Typography>
      </Stack>
    </Stack>
  );
}

export default Test;
