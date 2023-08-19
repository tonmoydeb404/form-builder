import { Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import CreateForm from "../common/components/CreateForm";
import RenderForm from "../common/components/RenderForm";
import { FormField } from "../types/form.type";

const Home = () => {
  const [state, setState] = useState<FormField[]>([]);

  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h4"
        component={"h1"}
        sx={{ textAlign: "center", mb: 10 }}
      >
        Form Builder
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <CreateForm watchChanges={setState} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RenderForm state={state} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
