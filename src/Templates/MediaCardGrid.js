import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import  {ThemeProvider} from '@mui/material'
import useDarkTheme from '../Theme/useDarkTheme';

const MediaCardGrid = () => {
  // Array of 5 elements with title and description
 const cards = [
  {
    title: 'Lizard',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species.',
    image: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg' // Replace with actual image URL
  },
  {
    title: 'Snake',
    description: 'Snakes are elongated, legless, carnivorous reptiles of the suborder Serpentes.',
    image: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-autumn-nature-with-a-river-in-the-middle-of-the-forest-free-image.jpeg?w=600&quality=80' // Replace with actual image URL
  },
  {
    title: 'Crocodile',
    description: 'Crocodiles are large aquatic reptiles that live throughout the tropics.',
    image: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg' // Replace with actual image URL
  },
  {
    title: 'Chameleon',
    description: 'Chameleons are a distinctive and highly specialized clade of Old World lizards.',
    image: 'https://st5.depositphotos.com/35914836/63482/i/450/depositphotos_634821438-stock-photo-beautiful-sunset-sea.jpg' // Replace with actual image URL
  },
  {
    title: 'Gecko',
    description: 'Geckos are small lizards found in warm climates throughout the world.',
    image: 'https://img.freepik.com/free-photo/photorealistic-view-tree-nature-with-branches-trunk_23-2151478033.jpg' // Replace with actual image URL
  },
];

const { theme } = useDarkTheme();
  return (
    <ThemeProvider theme={theme}>
   <div class="cardds">
      {cards.map((card, index) => (
       
          <Card sx={{ maxWidth: 300}}>
            <CardMedia
            sx={{ height: 120}}
              image={card.image}
              title={card.title}
            />
            <CardContent >
              <Typography gutterBottom variant="h6" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}w
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
       
      ))}
   </div>
    </ThemeProvider>
  );
};

export default MediaCardGrid;
