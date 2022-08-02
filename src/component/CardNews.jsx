import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CardMedia } from "@mui/material";

dayjs.extend(relativeTime);

export default function CardNews({
  loading = false,
  avatar,
  providerName,
  datePublished,
  thumbnailUrl,
  title,
  description,
  linkUrl,
}) {
  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "transform 0.15s ease-in-out",
        "&:hover": {
          boxShadow: 20,
          transform: "scale3d(1.05, 1.05, 1)",
        },
      }}
      onClick={() => window.open(linkUrl, "_blank")}
    >
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={35}
              height={35}
            />
          ) : (
            <Avatar alt="Ted talk" src={avatar}>
              {providerName.slice(0, 1)}
            </Avatar>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            <Typography sx={{ fontSize: ".7rem", fontWeight: 600 }}>
              {providerName.split("on")[0]}
            </Typography>
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            <Typography variant="caption" sx={{ fontSize: ".7rem" }}>
              {dayjs(datePublished).fromNow()}
            </Typography>
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image={
            thumbnailUrl ||
            "https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3J5cHRvfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          }
          alt="Nicola Sturgeon on a TED talk stage"
        />
      )}

      <CardContent>
        {loading ? (
          <>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                mb: 1,
                fontSize: "0.8rem",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component="p"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
                fontSize: "0.7rem",
              }}
            >
              {description}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

CardNews.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.object,
};
