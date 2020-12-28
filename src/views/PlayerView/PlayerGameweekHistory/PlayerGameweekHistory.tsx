import React, { FC } from 'react';
import { useTypedSelector } from 'app/store';
import { Card, CardContent } from 'react-md';
import Table from 'components/Table';
import columns from './columns';

import classes from './PlayerGameweekHistory.module.scss';

interface Props {
  playerId: string;
}

const PlayerGameweekHistory: FC<Props> = ({ playerId }) => {
  const player = useTypedSelector((state) => state.playersSlice.byId[playerId]);

  return (
    <Card className={classes.card}>
      <CardContent disableExtraPadding>
        <Table
          columns={columns}
          data={player.history}
          stickyHeader
          stickyRow
          type='compact'
          maxHeight={28}
        />
      </CardContent>
    </Card>
  );
};

export default PlayerGameweekHistory;
