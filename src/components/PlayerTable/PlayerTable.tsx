import React, { FC, useEffect } from 'react';
import { getFilteredPlayers } from '../../app/slices/playerTableSlice';
import { useTypedSelector } from '../../app/store';
import Table, { Column } from 'components/Table';
import { Player } from 'client/typings';

import styles from './PlayerTable.module.scss';
import { useQueryParam } from 'use-query-params';
import { Card, CardContent } from 'react-md';

const PlayerTable: FC = () => {
  const [sortColumn, setSortColumn] = useQueryParam<string>('sort');
  const [sortDirection, setSortDirection] = useQueryParam<'asc' | 'desc'>(
    'direction',
  );

  useEffect(() => {
    setSortColumn('total_points');
    setSortDirection('desc');
  }, [setSortColumn, setSortDirection]);

  const players = useTypedSelector((state) =>
    getFilteredPlayers(state, sortColumn, sortDirection),
  );

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

  return (
    <Card className={styles.card}>
      <CardContent>
        <Table columns={columns} data={players} stickyHeader stickyRow />
      </CardContent>
    </Card>
  );
};

export default PlayerTable;
