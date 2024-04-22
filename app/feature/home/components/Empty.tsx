import React from "react";
import { View } from "react-native";

export type EmptyStateProps = {
  title?: string;
  description?: string;
};

const EmptyState = ({ title, description }: EmptyStateProps): JSX.Element => {
  return (
    <View
    //   style={{
    //     textAlign: "center",
    //     p: 5,
    //   }}
    >
      {/* <Grid container direction="column" spacing={1}>
        <Grid item>
          <img src="/assets/empty-box.svg" alt="Empty" />
        </Grid>
        <Grid item>
          <Typography variant="h4" fontWeight="500">
            {title ?? "Empty"}
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Grid>
      </Grid> */}
    </View>
  );
};

export default EmptyState;
