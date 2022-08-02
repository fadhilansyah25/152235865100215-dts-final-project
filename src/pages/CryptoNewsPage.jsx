import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsAPI";
import { Box, Container, Typography } from "@mui/material";
import CardNews from "../component/CardNews";
import AutoComplete from "../component/AutoComplete";

export default function CryptoNewsPage() {
  const [Params, setParams] = useState("Cryptocurrency");
  const {
    data: cryptoNews,
    isLoading,
    isFetching,
  } = useGetCryptoNewsQuery({
    newsCategory: Params,
    count: 100,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = data.get("cryptoSearch");
    if (query !== "") setParams(query);
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 8, mb: 5, pt: 5 }} maxWidth="lg">
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, textAlign: "center", mb: 3 }}
        >
          Crypto Global News
        </Typography>
        <AutoComplete handleSubmit={handleSubmit} />
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          sx={{ gridGap: 20 }}  
        >
          {!isFetching
            ? cryptoNews?.value?.map((news, id) => (
                <CardNews
                  loading={isLoading}
                  avatar={news?.provider[0]?.image?.thumbnail?.contentUrl}
                  providerName={news?.provider[0]?.name}
                  datePublished={news?.datePublished}
                  thumbnailUrl={news?.image?.thumbnail?.contentUrl}
                  title={news?.name}
                  description={news?.description}
                  linkUrl={news?.url}
                  key={id}
                />
              ))
            : [...Array(12)].map((_, id) => (
                <CardNews loading={isLoading || isFetching} key={id} />
              ))}
        </Box>
      </Container>
    </>
  );
}
