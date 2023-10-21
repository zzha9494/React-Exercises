import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  IconButton,
  List,
  ListItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import "./Announcements.scss";
import CampaignIcon from "@mui/icons-material/Campaign";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";

function fetchAnnouncements() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const announcements = [
        {
          id: 0,
          content:
            "我们定义了一个包含日期和时间格式选项的options对象，然后使用Intl.DateTimeFormat来格式化日期时间。最后，formattedDateTime将包含可读的日期时间字符串",
          postTime: "2023-10-12T10:53:51.052+00:00",
        },
        {
          id: 1,
          content:
            "然后就是你每次请求，你可以只发他的开头word，也可以就是只发他的搜索关键字，然后那个种类的话，你是可以自己选多个的。然后的话，不过现在那几个东西的response，你们现在先不要用，因为昨天那个另外一个后端的老哥，他把那个数据结构给他稍微改了一下，所以说我那里CTRL那里我还得重新写一下，他那个现在那个response不是最后真正的response。",
          postTime: "2023-10-18T10:53:51.052+00:00",
        },
      ];
      resolve(announcements);
    }, 0);
  });
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Announcements() {
  useEffect(() => {
    const pollingInterval = 10000;
    let pollingIntervalId;

    function poll() {
      fetchAnnouncements()
        .then((announcements) => {
          console.log("Received announcements:", announcements);

          setAnnouncements(
            announcements.sort((a, b) => {
              const dateA = new Date(a.postTime);
              const dateB = new Date(b.postTime);
              return dateB - dateA;
            }),
          );
        })
        .catch((error) => {
          console.error("Error fetching announcements:", error);
        });
    }

    pollingIntervalId = setInterval(poll, pollingInterval);

    poll();

    return () => {
      clearInterval(pollingIntervalId);
    };
  }, []);

  const [announcements, setAnnouncements] = useState([]);
  const [annoucementOpen, setAnnouncementOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAnnouncementOpen = (event) => {
    setAnnouncementOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleAnnouncementClose = () => {
    setAnnouncementOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleAnnouncementOpen}
      >
        <StyledBadge badgeContent={announcements.length} color="secondary">
          <CampaignIcon />
        </StyledBadge>
      </IconButton>
      {announcements.length > 0 && (
        <Typography
          variant="subtitle2"
          sx={{
            maxWidth: 300,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {announcements[0].content} {/* 渲染公告的 content 属性 */}
        </Typography>
      )}
      <Popover
        open={annoucementOpen}
        anchorEl={anchorEl}
        onClose={handleAnnouncementClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List sx={{ width: 365 }}>
          {announcements.map((item) => {
            return (
              <ListItem key={item.id}>
                <Stack>
                  <Typography variant="subtitle2">{item.content}</Typography>
                  &nbsp;
                  <Typography variant="caption" color="gray">
                    {format(new Date(item.postTime), "hh:mm:ss a, MMM d, yyyy")}
                  </Typography>
                </Stack>
              </ListItem>
            );
          })}
        </List>
      </Popover>
    </>
  );
}
