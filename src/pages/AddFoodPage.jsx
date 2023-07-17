import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFoodContext } from "../contexts/FoodContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddFoodPage() {
  const { addDish } = useFoodContext();
  const [formValue, setFormValue] = React.useState({
    title: "",
    composition: "",
    price: "",
    image: "",
    category: "",
  });

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });

    console.log(formValue);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.composition.trim() ||
      !formValue.image.trim() ||
      !formValue.price.trim() ||
      !formValue.category.trim()
    ) {
      return;
    }

    addDish({ ...formValue, price: +formValue.price });

    addDish(formValue);
    setFormValue({
      title: "",
      composition: "",
      prise: "",
      image: "",
      category: "",
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            New Dish
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoFocus
              value={formValue.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="composition"
              label="Composition"
              value={formValue.composition}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              value={formValue.price}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image"
              value={formValue.image}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                label="Category"
                value={formValue.category}
                onChange={handleChange}
              >
                <MenuItem value={"salads"}>Salad</MenuItem>
                <MenuItem value={"soups"}>Soups</MenuItem>
                <MenuItem value={"main dish"}>Main Dish</MenuItem>
                <MenuItem value={"fastFood"}>FastFood</MenuItem>
                <MenuItem value={"drink"}>Drink</MenuItem>
                <MenuItem value={"dessert"}>Dessert</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add New Dish
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
