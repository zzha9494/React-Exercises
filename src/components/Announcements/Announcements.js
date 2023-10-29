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
import { enqueueSnackbar } from "notistack";

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
    async function poll() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/announcement/get",
          {},
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const announcements = await response.json();

        setAnnouncements(
          announcements,
          announcements.sort((a, b) => {
            const dateA = new Date(a.postTime);
            const dateB = new Date(b.postTime);
            return dateB - dateA;
          }),
        );
      } catch (error) {
        console.error("Error fetching announcements:", error);
        enqueueSnackbar("Error fetching announcements", {
          variant: "info",
        });
      }
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
    announcements.length > 0 && (
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
                      {format(
                        new Date(item.postTime),
                        "hh:mm:ss a, MMM d, yyyy",
                      )}
                    </Typography>
                  </Stack>
                </ListItem>
              );
            })}
          </List>
        </Popover>
      </>
    )
  );
}
