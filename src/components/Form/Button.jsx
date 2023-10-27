import MuiButton from '@mui/material/Button';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import api from '../../services/api';

export default function Button({ variant = 'contained', weekDay, date, setActivities, ...props }) {
  const token = useToken();
  let isoDate = '';
  if (date === '10/05') isoDate = '2023-05-10';
  if (date === '11/05') isoDate = '2023-05-11';
  if (date === '12/05') isoDate = '2023-05-12';

  async function filterActivities() {
    const activitiesFilter = await api.get(`/activities/${isoDate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActivities(activitiesFilter.data);
  }

  return (
    <StyledMuiButton variant={variant} {...props} onClick={filterActivities}>
      {weekDay}, {date}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiButton)`
  margin-top: 8px !important;
`;
