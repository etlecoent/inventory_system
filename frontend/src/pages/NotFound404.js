import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function NotFound404(props) {
  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Typography variant="h1">404 Not Found</Typography>
      </Box>
    </Container>
  );
}
