import { orderBy } from 'lodash';
import React, { FC, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from 'react-md';
import { useDispatch, useSelector } from 'react-redux';
import { getDump } from '../../app/slices/dumpSlice';
import { RootState } from '../../app/store';
import './PlayerView.scss';

const PlayerView: FC = () => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) =>
    Object.values(state.playersSlice.byId),
  );

  useEffect(() => {
    dispatch(getDump());
  }, [dispatch]);

  return (
    <div>
      <TableContainer>
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Goals Scored</TableCell>
              <TableCell>Bonus Points</TableCell>
              <TableCell>Total Points</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderBy(players, 'total_points', 'desc').map((player) => (
              <TableRow key={player.id}>
                <TableCell>
                  <img
                    className='photo'
                    src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.code}.png`}
                    alt={player.first_name}
                  />
                </TableCell>
                <TableCell>
                  {player.first_name} {player.second_name}
                </TableCell>
                <TableCell>{player.goals_scored}</TableCell>
                <TableCell>{player.bonus}</TableCell>
                <TableCell>{player.total_points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlayerView;
