import { Button, Typography } from 'antd';
import {
  useNavigate
} from "react-router-dom";
import styled from 'styled-components';
const Div = styled.div``;
const NotFoundStyled = styled(Div)(({ }) => ({
  backgroundColor: '#000',
  width: '100vw',
  height: '100vh',
  textAlign: 'center',
  alignContent: 'center',
  '& .title':{
    fontSize: '10em',
    color: 'white',
    fontWeight: 'bold',
  },
  '& .text-mini':{
    fontSize: '1.5em',
    color: 'white',
  },
  '& .button-custom':{
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '20px',
    '&:hover':{
      backgroundColor: 'pink',
    }
  }
}));
export default function NotFound() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/user');
  }
  return (
    <NotFoundStyled>
      <Typography className='title'>404</Typography>
      <Typography className='text-mini'>Click here go to Home</Typography>
      <Button className='button-custom' onClick={goToHome}>Go to Home</Button>
    </NotFoundStyled>
  );
}

