import MuiButton from '@mui/material/Button';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ActivitiesButton({ variant = 'contained', setSelectedDay, selectedDay,  weekDay, date, ...props }) {
  const {filterActivities} = props
  const [selected, setSelected] = useState(false)
  console.log
  useEffect(() => {
    if (selectedDay?.id === props.id){
      setSelected(true)
    } else{
      setSelected(false)
    }
  }, [selectedDay])
  delete props.filterActivities
  return (
    <StyledMuiButton variant={variant} {...props} selected={selected} onClick={e => filterActivities(e.target.id)}>
      {weekDay}, {date}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiButton)`
  margin-top: 8px !important; 
`
