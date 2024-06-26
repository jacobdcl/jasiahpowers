import React, { useState, useEffect } from 'react';
import { Container, Box, Grid } from '@mui/material';
import LoadingPage from '../LoadingPage/LoadingPage.jsx';

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const PLAYLIST_ID = 'PLNo5tM02yzAUPdY2fuit2U5G9W3pS9jH7'; 
const API_KEY = 'AIzaSyAsJfUiqW9jeAOskN4UmoWnFasIWAHlULY';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      setLoading(true); 
      try {
        const response = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=25&playlistId=${PLAYLIST_ID}&key=${API_KEY}`);
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching playlist items:', error);
      }
    };
    fetchPlaylistVideos();
    setLoading(false); // Set loading to false when the request ends
  }, []);


  if (loading) {
    return <LoadingPage/>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: '15vh', textAlign: 'center' }}>
      <Grid container spacing={2} justifyContent="center">
        {videos.map((video, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                '& > iframe': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                },
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoPage;
