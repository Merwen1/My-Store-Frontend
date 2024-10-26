"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Drinks",
    price: "",
    description: "",
    status: "Available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseInt(formData.price),
          category: formData.category,
          status: formData.status,
        }),
      });

      if (response.ok) {
        toast.success(`Product ${formData.name} added successfully.`);
        // Clear form fields after successful submission
        setFormData({
          name: "",
          category: "Drinks", // Reset to default
          price: "",
          description: "",
          status: "Available",
        });
      } else {
        toast.error(`Failed to add product ${formData.name}`);
      }
    } catch (error) {
      toast.error("Error adding product.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="Drinks">Drinks</MenuItem>
            <MenuItem value="Canned Goods">Canned Goods</MenuItem>
            <MenuItem value="Snacks">Snacks</MenuItem>
            <MenuItem value="Bakery">Bakery</MenuItem>
            <MenuItem value="Frozen Foods">Frozen Foods</MenuItem>
            <MenuItem value="Meat & Seafood">Meat & Seafood</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Low in Stock">Low in Stock</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
