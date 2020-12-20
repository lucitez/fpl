import React, { FC, ReactElement } from 'react';
import { Grid, GridCell, Text } from 'react-md';

interface Props {
  field: string;
  value: ReactElement | string;
}

const TextRow: FC<Props> = ({ field, value }) => {
  return (
    <Grid padding={1}>
      <GridCell colSpan={7}>
        <Text>{field}:</Text>
      </GridCell>
      <GridCell colSpan={5}>
        {typeof value === 'string' ? <Text weight='bold'>{value}</Text> : value}
      </GridCell>
    </Grid>
  );
};

export default TextRow;
