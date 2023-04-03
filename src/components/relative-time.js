import moment from "moment";

export default function RenderRelativeTime(props) {
  return moment(convertUTCDateToLocalDate(props.val)).fromNow();
}
function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date);
  newDate.setMinutes(
    new Date(date).getMinutes() - new Date(date).getTimezoneOffset()
  );
  return newDate;
}
