import { Player } from 'client/typings';
import { Column } from 'components/Table';
import styles from './PlayerTable.module.scss';

const columns: Column<Player>[] = [
  {
    title: 'Name',
    field: 'name',
    className: styles.name,
    renderCell: (player: Player) =>
      `${player.first_name} ${player.second_name}`,
  },
  {
    title: 'Points (total)',
    field: 'total_points',
    sortable: true,
  },
  {
    title: 'Goals',
    field: 'goals_scored',
    sortable: true,
  },
  {
    title: 'Assists',
    field: 'assists',
    sortable: true,
  },
  {
    title: 'G + A',
    field: 'goals_plus_assists',
    sortable: true,
  },
  {
    title: 'Points (bonus)',
    field: 'bonus',
    sortable: true,
  },
  {
    title: 'Influence',
    field: 'influence',
    sortable: true,
  },
  {
    title: 'Creativity',
    field: 'creativity',
    sortable: true,
  },
  {
    title: 'Threat',
    field: 'threat',
    sortable: true,
  },
  {
    title: 'ICT Index',
    field: 'ict_index',
    sortable: true,
  },
];

export default columns;
