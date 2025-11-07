import './App.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState, useEffect} from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const[inpValue, setInpValue] = useState('')
  const[arr, setArr] = useState([])
  const a = 1;
  async function Get(){
    const response = await axios.get('https://dummyjson.com/todos')
    setArr(response.data.todos)
    
  }

  useEffect(()=>{
    Get()
  },[])

  // function handleChange(el):void {
  //   el.completed = el.completed? false : true;
  //   setArr([...arr])
  // }


  function handleChange(id):void {
    const el = arr.find((item) => item.id === id )
    el.completed = !el.completed
    setArr([...arr])
  }


  return (
    <>
    <div style={{display:'flex', gap:'100px'}}>
      <Button variant="outlined" onClick={()=>{
        setArr([...arr,{id: arr.length + 1, todo: inpValue, completed: false, userId: 0}])
        setInpValue('')
      }
      }>Outlined</Button>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" value={inpValue} onChange={(e)=>{
        setInpValue(e.target.value)
        }}/>
    </div>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {arr.map((el:any) => {
        const labelId = `checkbox-list-label-${el.id}`;

        return (
          <ListItem
            key={el.id}
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={el.completed}
                  tabIndex={-1}
                  disableRipple
                  onChange={()=> handleChange(el.id)}
                  
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={el.todo} />
              <IconButton aria-label="delete" onClick={()=>{
                setArr(arr.filter((item)=> item.id !==el.id ))
              }}>
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
      
    </>
  )
}

export default App
