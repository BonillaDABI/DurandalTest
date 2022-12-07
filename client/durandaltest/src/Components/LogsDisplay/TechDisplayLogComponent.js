import { Grid, Typography } from "@mui/material";

const TechDisplayLogComponent = ({id, mov_name, updated_reason, created_at, is_active, notes}, key={index}) => {
    <Grid container spacing={1}>
        <Grid item xs={4}>
            <Typography variant="caption">{id}</Typography>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="caption">{mov_name}</Typography>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="caption">{updated_reason}</Typography>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="caption" key={created_at}>{created_at}</Typography>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="caption">{is_active}</Typography>
        </Grid>
        <Grid item xs={4}>
            <Typography variant="caption">{notes}</Typography>
        </Grid>
    </Grid>
}

export default TechDisplayLogComponent
