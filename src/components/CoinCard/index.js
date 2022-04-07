import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  createTheme,
  Divider,
  IconButton,
} from "@mui/material";
import "./styles.css";
import { Box } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import TelegramIcon from "@mui/icons-material/Telegram";
import { ThemeProvider } from "@emotion/react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function CoinCard({ coinDetails, handleWatchList, watchLists }) {
  const {
    image: { large },
    name,
    description: { en },
    community_data: {
      facebook_likes,
      reddit_subscribers,
      twitter_followers,
      telegram_channel_user_count,
    },
    coingecko_rank,
    market_data: { current_price, market_cap },
  } = coinDetails;

  const isAddedToWatchList = watchLists.find(
    (item) => item.id === coinDetails.id
  );

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActionArea>
        <IconButton onClick={handleWatchList} className="bookmark">
          <BookmarkBorderIcon color={isAddedToWatchList ? "primary" : ""} />
        </IconButton>
        <CardMedia component="img" className="image" image={large} alt={name} />
        <Divider className="divider" light />
        <CardContent>
          <Box className="box">
            <>
              <FacebookIcon style={{ color: "#4267B2" }} />
              <Typography>{facebook_likes || "N/A"}</Typography>
            </>
            <>
              <TwitterIcon style={{ color: "#00acee" }} />
              <Typography>{twitter_followers || "N/A"}</Typography>
            </>

            <>
              <RedditIcon style={{ color: "#FF4500" }} />
              <Typography>{reddit_subscribers || "N/A"}</Typography>
            </>

            <>
              <TelegramIcon style={{ color: "#229ED9" }} />
              <Typography>{telegram_channel_user_count || "N/A"}</Typography>
            </>
          </Box>

          <Box>
            <Typography className="rank" component="div">
              Rank: <Typography component="span">{coingecko_rank}</Typography>
            </Typography>
            <Typography className="rank" component="div">
              Current Price:{" "}
              <Typography component="span">{current_price["usd"]}</Typography>
            </Typography>
            <Typography className="rank" component="div">
              Market Cap:{" "}
              <Typography component="span">{market_cap["usd"]}</Typography>
            </Typography>
          </Box>

          <Typography
            fontWeight={600}
            fontSize="40px"
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            fontSize={15}
            lineHeight={1.5}
            color="black"
            variant="body2"
          >
            <span dangerouslySetInnerHTML={{ __html: en.split(". ")[0] }} />.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
