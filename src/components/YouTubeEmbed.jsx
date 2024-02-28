import { Box } from '@chakra-ui/react';
import React from 'react';

const YouTubeEmbed = ({ url }) => {
  // Extract the video ID from the YouTube URL
  const videoId = url.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <iframe width="779" height="438" src={embedUrl} title="Artificial intelligence comes to farming in India | BBC News" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  );
};

export default YouTubeEmbed;
