import React, { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from 'react-md';
import { useDispatch } from 'react-redux';
import {
  getFilteredPlayers,
  getSortData,
  updateSortColumn,
} from '../../app/slices/playerTableSlice';
import { useTypedSelector } from '../../app/store';
import './PlayerTable.scss';

// todo: create better interface for table
// experiment more with the overrides
// add correct columns to this table

const PlayerTable: FC = () => {
  const dispatch = useDispatch();

  const { column, direction } = useTypedSelector((state) => getSortData(state));
  const players = useTypedSelector((state) => getFilteredPlayers(state));

  const handleSortClick = (columnName: string) => {
    dispatch(updateSortColumn(columnName));
  };

  return (
    <TableContainer className='container'>
      <Table fullWidth>
        <TableHeader sticky>
          <TableRow>
            <TableCell sticky='header-cell' className='name'>
              Name
            </TableCell>
            <TableCell
              aria-sort={column === 'total_points' ? direction : 'none'}
              onClick={() => handleSortClick('total_points')}
              sortIconAfter
            >
              Points (total)
            </TableCell>
            <TableCell
              aria-sort={column === 'goals_scored' ? direction : 'none'}
              onClick={() => handleSortClick('goals_scored')}
              sortIconAfter
            >
              Goals
            </TableCell>
            <TableCell
              aria-sort={column === 'assists' ? direction : 'none'}
              onClick={() => handleSortClick('assists')}
              sortIconAfter
            >
              Assists
            </TableCell>
            <TableCell
              aria-sort={column === 'goals_plus_assists' ? direction : 'none'}
              onClick={() => handleSortClick('goals_plus_assists')}
              sortIconAfter
            >
              G + A
            </TableCell>
            <TableCell
              aria-sort={column === 'bonus' ? direction : 'none'}
              onClick={() => handleSortClick('bonus')}
              sortIconAfter
            >
              Bonus Points
            </TableCell>
            <TableCell
              aria-sort={column === 'bonus' ? direction : 'none'}
              onClick={() => handleSortClick('bonus')}
              sortIconAfter
            >
              Bonus Points
            </TableCell>
            <TableCell
              aria-sort={column === 'bonus' ? direction : 'none'}
              onClick={() => handleSortClick('bonus')}
              sortIconAfter
            >
              Bonus Points
            </TableCell>
            <TableCell
              aria-sort={column === 'bonus' ? direction : 'none'}
              onClick={() => handleSortClick('bonus')}
              sortIconAfter
            >
              Bonus Points
            </TableCell>
            <TableCell
              aria-sort={column === 'bonus' ? direction : 'none'}
              onClick={() => handleSortClick('bonus')}
              sortIconAfter
            >
              Bonus Points
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell sticky='cell' className='name'>
                {player.first_name} {player.second_name}
              </TableCell>
              <TableCell className={column === 'total_points' && 'sorted'}>
                {player.total_points}
              </TableCell>
              <TableCell className={column === 'goals_scored' && 'sorted'}>
                {player.goals_scored}
              </TableCell>
              <TableCell className={column === 'assists' && 'sorted'}>
                {player.assists}
              </TableCell>
              <TableCell
                className={column === 'goals_plus_assists' && 'sorted'}
              >
                {player.goals_plus_assists}
              </TableCell>
              <TableCell className={column === 'bonus' && 'sorted'}>
                {player.bonus}
              </TableCell>
              <TableCell className={column === 'bonus' && 'sorted'}>
                {player.bonus}
              </TableCell>
              <TableCell className={column === 'bonus' && 'sorted'}>
                {player.bonus}
              </TableCell>
              <TableCell className={column === 'bonus' && 'sorted'}>
                {player.bonus}
              </TableCell>
              <TableCell className={column === 'bonus' && 'sorted'}>
                {player.bonus}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;
