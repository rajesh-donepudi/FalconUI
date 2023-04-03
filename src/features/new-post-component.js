import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import AppCard from "../components/card";
import { Button } from "@mui/material";
import { MentionsInput, Mention } from "react-mentions";
import classNames from "../../src/index.module.css";
import EmojiPicker from "emoji-picker-react";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploader from "../components/image-uploader";
import ImagePreviewer from "../components/images-preview";
import Badge from "@mui/material/Badge";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Tooltip from "@mui/material/Tooltip";

const NewPostComponent = (props) => {
  const [showPicker, setShowEmojiPicker] = useState(false);

  const [user, setUser] = useState("");

  const [age, setAge] = useState("");

  const handleChange2 = (event) => {
    setAge(event.target.value);
  };

  const users = [
    {
      id: "walter",
      display: "Walter White",
    },
    {
      id: "pipilu",
      display: "皮皮鲁",
    },
    {
      id: "luxixi",
      display: "鲁西西",
    },
    {
      id: "satoshi1",
      display: "中本聪",
    },
    {
      id: "satoshi2",
      display: "サトシ・ナカモト",
    },
    {
      id: "nobi",
      display: "野比のび太",
    },
    {
      id: "sung",
      display: "성덕선",
    },
    {
      id: "jesse",
      display: "Jesse Pinkman",
    },
    {
      id: "gus",
      display: 'Gustavo "Gus" Fring',
    },
    {
      id: "saul",
      display: "Saul Goodman",
    },
    {
      id: "hank",
      display: "Hank Schrader",
    },
    {
      id: "skyler",
      display: "Skyler White",
    },
    {
      id: "mike",
      display: "Mike Ehrmantraut",
    },
    {
      id: "lydia",
      display: "Lydìã Rôdarté-Qüayle",
    },
  ];

  const handleUserChange = (event, newValue, newPlainTextValue, mentions) => {
    setUser((prev) => newValue);
  };

  const [postImages, setPostImages] = useState();
  const [imagePreviewerState, setImagePreviewerState] = useState(false);

  return (
    <>
      <AppCard minHeight="250px">
        <MentionsInput
          value={user}
          onChange={handleUserChange}
          placeholder="Hey! What's on your mind"
          className="mentions"
          classNames={classNames}
        >
          <Mention
            trigger="@"
            data={users}
            className={classNames.mentions__mention}
            renderSuggestion={(suggestion, search, highlightedDisplay) => (
              <div className="user">{highlightedDisplay}</div>
            )}
          />
        </MentionsInput>
        <Stack
          direction="row"
          alignItems="end"
          alignContent="center"
          justifyContent="flex-start"
        >
          <ImageUploader imagePickerState={setPostImages} />
          {!showPicker ? (
            <Tooltip title="Emoji">
              <InsertEmoticonOutlinedIcon
                color="action"
                onClick={() => setShowEmojiPicker((old) => true)}
              />
            </Tooltip>
          ) : (
            ""
          )}

          {showPicker ? (
            <CloseIcon
              color="action"
              onClick={() => setShowEmojiPicker((old) => !old)}
            />
          ) : (
            ""
          )}
          {showPicker ? (
            <EmojiPicker
              showPreview="false"
              onEmojiClick={(d) => {
                console.log(d);
                return setUser((prev) => prev + d.emoji);
              }}
            />
          ) : (
            ""
          )}
          {imagePreviewerState && (
            <ImagePreviewer
              previewState={imagePreviewerState}
              show={imagePreviewerState}
              handlePreview={setImagePreviewerState}
              images={postImages}
            />
          )}
        </Stack>
        <Stack direction="column" className="pt-3">
          <Stack direction="row" alignItems="center">
            <Typography sx={{ fontSize: 10 }} color="text.secondary">
              Posting to {props?.currentView?.name}
            </Typography>
          </Stack>
          {postImages?.length > 0 && (
            <Stack direction="row" className="pt-3">
              <Tooltip
                style={{ cursor: "pointer" }}
                title={postImages?.length + " images selected"}
                onClick={() => setImagePreviewerState(true)}
              >
                <Badge badgeContent={postImages?.length} color="primary">
                  <ImageOutlinedIcon color="action" />
                </Badge>
              </Tooltip>
            </Stack>
          )}
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button variant="outlined">Cancel</Button>
            <Button onClick={() => {}} variant="contained">
              Post
            </Button>
          </Stack>
        </Stack>
      </AppCard>
    </>
  );
};

export default NewPostComponent;
