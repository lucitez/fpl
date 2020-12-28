import { Player } from 'client/typings';
import { Column } from 'components/Table';

const columns: Column<Player>[] = [
  {
    title: 'Matchweek',
    field: 'round',
  },
  {
    title: 'Points (total)',
    field: 'total_points',
  },
  {
    title: 'Goals',
    field: 'goals_scored',
  },
  {
    title: 'Assists',
    field: 'assists',
  },
  {
    title: 'BPS',
    field: 'bps',
  },
  {
    title: 'Points (bonus)',
    field: 'bonus',
  },
  {
    title: 'Influence',
    field: 'influence',
  },
  {
    title: 'Creativity',
    field: 'creativity',
  },
  {
    title: 'Threat',
    field: 'threat',
  },
  {
    title: 'ICT Index',
    field: 'ict_index',
  },
];

export default columns;
