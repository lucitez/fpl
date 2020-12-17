import React, { FC } from 'react';
import { Grid, GridCell, Text } from 'react-md';

interface Props {
  field: string;
  value: unknown;
}

const TextRow: FC<Props> = ({ field, value }) => {
  return (
    <Grid padding={0}>
      <GridCell colSpan={8}>
        <Text>{field}:</Text>
      </GridCell>
      <GridCell>
        <Text weight='bold'>{value}</Text>
      </GridCell>
    </Grid>
  );
};

export default TextRow;
