import React, { FC, useEffect } from 'react';
import {
  getFilteredPlayers,
  updateSelectedPosition,
  updateSelectedTeam,
} from 'app/slices/playerTableSlice';
import { useTypedSelector } from 'app/store';
import Table from 'components/Table';
import columns from './columns';

import styles from './PlayerTable.module.scss';
import { useQueryParam, StringParam } from 'use-query-params';
import {
  Button,
  Card,
  CardContent,
  Grid,
  GridCell,
  ListboxOption,
  Select,
} from 'react-md';
import { useDispatch } from 'react-redux';

const PlayerTable: FC = () => {
  const dispatch = useDispatch();

  const [sortColumn, setSortColumn] = useQueryParam<string>('sort');
  const [sortDirection, setSortDirection] = useQueryParam<'asc' | 'desc'>(
    'direction',
  );
  const [selectedTeam, setSelectedTeam] = useQueryParam('team_id', StringParam);
  const [selectedPosition, setSelectedPosition] = useQueryParam(
    'position_id',
    StringParam,
  );

  useEffect(() => {
    setSortColumn('total_points');
    setSortDirection('desc');
  }, [setSortColumn, setSortDirection]);

  useEffect(() => {
    dispatch(updateSelectedTeam(selectedTeam));
    dispatch(updateSelectedPosition(selectedPosition));
  }, [dispatch, selectedTeam, selectedPosition]);

  const players = useTypedSelector((state) =>
    getFilteredPlayers(state, sortColumn, sortDirection),
  );

  const teams = useTypedSelector((state) =>
    Object.values(state.teamsSlice.byId),
  );

  const positions = useTypedSelector((state) =>
    Object.values(state.positionsSlice.byId),
  );

  const teamOptions: ListboxOption[] = [
    { value: '', name: 'Select team', key: 'placeholder' },
  ].concat(
    teams.map((team) => ({
      value: team.id.toString(),
      name: team.name,
      key: team.short_name,
    })),
  );

  const positionOptions: ListboxOption[] = [
    { value: '', name: 'Select position', key: 'placeholder' },
  ].concat(
    positions.map((position) => ({
      value: position.id.toString(),
      name: position.plural_name,
      key: position.plural_name_short,
    })),
  );

  const handleSelect = (setFunc: (value: string) => void, teamId: string) => {
    teamId ? setFunc(teamId) : setFunc(undefined);
  };

  const clearFilters = () => {
    setSelectedTeam(undefined);
    setSelectedPosition(undefined);
  };

  return (
    <div>
      <Card className={styles.filterCard}>
        <CardContent>
          <Grid className={styles.filterGrid} padding={0}>
            <GridCell colSpan={2}>
              <Select
                id='team-select'
                value={selectedTeam || ''}
                options={teamOptions}
                onChange={(id) => handleSelect(setSelectedTeam, id)}
                labelKey='name'
              />
            </GridCell>
            <GridCell colSpan={2}>
              <Select
                id='position-select'
                value={selectedPosition || ''}
                options={positionOptions}
                onChange={(id) => handleSelect(setSelectedPosition, id)}
                labelKey='name'
              />
            </GridCell>
            <GridCell>
              <Button
                theme='primary'
                themeType='contained'
                onClick={clearFilters}
              >
                Clear
              </Button>
            </GridCell>
          </Grid>
        </CardContent>
      </Card>

      <Card className={styles.tableCard}>
        <CardContent>
          <Table columns={columns} data={players} stickyHeader stickyRow />
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerTable;
