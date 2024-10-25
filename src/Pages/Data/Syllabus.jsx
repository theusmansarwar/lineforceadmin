import React, { useState, useEffect } from 'react'; 
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, ThemeProvider } from '@mui/material';
import useDarkTheme from '../../Theme/useDarkTheme';
import { fetchSyllabus } from '../../DAL/fetch';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../Config/Config';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSyllabus } from '../../DAL/delete';

const Syllabus = () => {
  const navigate = useNavigate(); 
  const { theme } = useDarkTheme();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSyllabus = async () => {
    try {
      const response = await fetchSyllabus(id);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSyllabus();
  }, [id]);

  if (loading) {
    return <Box sx={{ padding: 2 , width: '100%',  marginBottom: '10px'}}>Loading...</Box>;
  }

  const handleDelete = async (id) => {
    try {
      const response = await deleteSyllabus(id);
      if (response.status === true) {
        getSyllabus();
        console.log("Course deleted successfully.");
      } else {
        console.error("Failed to delete course.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="buttonsection">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/add-syllabus/${id}`)} 
          sx={{
            fontSize: '0.6rem',
            '@media (max-width: 600px)': {
              padding: '5px 10px',
            },
          }}
        
        >
          + Add Syllabus
        </Button>
      </div>
      <Box sx={{ width: '100%',  marginBottom: '10px',  }}>
        <List>
          {data.map((syllabus) => (
            <ListItem
              key={syllabus.id}
              sx={{
                bgcolor: 'background.paper',
                boxShadow:' 0 0px 8px #0d6dfdab',
               margin:'1%',
               borderRadius:'8px',
               width:'98%',
                '@media (max-width: 800px)': {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  margin:'3%',
                  width:'94%',
                },
              }}
            >
              <ListItemText 
                primary={syllabus.name} 
                secondary={`Created on: ${new Date(syllabus.created_at).toLocaleDateString()}`} 
                sx={{
                    width: '85%',
                  fontSize: '1rem',
                  '@media (max-width: 800px)': {
                    fontSize: '0.8rem',
                    width: '100%',
                    
                   
                  },
                }}
              />
               <ListItemText 
                 sx={{
                    width: '15%',  
                    textAlign:'center',
                    '@media (max-width: 800px)': {
                      fontSize: '0.8rem',
                      width: '100%',  
                    },
                  }}
              >
              <Button
                size="small"
                onClick={() => {
                  window.open(`${baseUrl}/${syllabus.file}`, '_blank', 'noopener,noreferrer');
                }}
                sx={{
                  minWidth: 'auto',
                  padding: '5px',
                  '@media (max-width: 800px)': {
                    padding: '3px',
                 
                  },
                }}
              >
                <VisibilityIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                sx={{
                  color: 'green',
                  minWidth: 'auto',
                  padding: '5px',
                  '@media (max-width: 800px)': {
                    padding: '3px',
                    paddingLeft:'20%'
                  },
                }}
                onClick={() => {
                  navigate(`/syllabus-edit`, { state: { syllabus } });
                }}
              >
                <EditIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                sx={{
                  color: 'red',
                  minWidth: 'auto',
                  padding: '5px',
                  '@media (max-width: 800px)': {
                    padding: '3px',
                    paddingLeft:'20%'
                  },
                }}
                onClick={() => handleDelete(syllabus.id)}
              >
                <DeleteIcon fontSize="small" />
              </Button>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
};

export default Syllabus;
