import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function AppCard(props) {
  const { children } = props;
  const minHeight = props.minHeight;
  const minWidth = props.minWidth;

  return (
    <>
      <Card
        elevation={0}
        variant="outlined"
        sx={{
          minWidth: minWidth ?? "164px",
          minHeight: minHeight,
        }}
      >
        <CardContent>{children}</CardContent>
        {props.hasFooter ? (
          <CardActions>
            <Button size="small">More..</Button>
          </CardActions>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
}
