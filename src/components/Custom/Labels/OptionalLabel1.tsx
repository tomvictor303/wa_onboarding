import Typography from "@mui/material/Typography";
import { grey } from '@mui/material/colors';

const OptionalLabel1 = () => {
  return (
    <Typography variant="body2" display="inline" ml={1} color={grey[500]} sx={{fontSize: 13}}>
      optional
    </Typography>
  );
}

export default OptionalLabel1;
