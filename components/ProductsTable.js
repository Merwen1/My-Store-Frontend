"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import EditProductDialog from "./EditProductDialog";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const ProductsTable = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const handleEditOpen = (product) => {
    setProductToEdit(product);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setProductToEdit(null);
  };

  const handleEditConfirm = async (updatedProduct) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: parseInt(updatedProduct.price),
            category: updatedProduct.category,
            status: updatedProduct.status,
          }),
        }
      );

      if (response.ok) {
        toast.success(`Product ${updatedProduct.name} updated successfully.`);
        console.log(`Product ${updatedProduct.name} updated successfully.`);
        // Optionally, refresh or update your product list here
      } else {
        toast.error(`Failed to update product ${updatedProduct.name}`);
        console.error(`Failed to update product ${updatedProduct.name}`);
      }
    } catch (error) {
      toast.error("Error updating product.");
      console.error("Error updating product:", error);
    } finally {
      handleEditClose(); // Close the dialog after the operation
    }
  };

  const handleDeleteOpen = (id) => {
    setProductIdToDelete(id);
    setOpenDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDialog(false);
    setProductIdToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${productIdToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success(
          `Product with id ${productIdToDelete} deleted successfully.`
        );
        console.log(
          `Product with id ${productIdToDelete} deleted successfully.`
        );
        // Optionally, refresh or update your product list here
      } else {
        toast.error(`Failed to delete product with id ${productIdToDelete}`);
        console.error(`Failed to delete product with id ${productIdToDelete}`);
      }
    } catch (error) {
      toast.error("Error deleting product.");
      console.error("Error deleting product:", error);
    } finally {
      handleDeleteClose(); // Close the dialog after the operation
    }
  };

  const filteredData = data.filter((item) => {
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;

    const matchesPrice =
      (!minPrice || item.price >= parseFloat(minPrice)) &&
      (!maxPrice || item.price <= parseFloat(maxPrice));

    return matchesStatus && matchesCategory && matchesPrice;
  });

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Filters Section */}
      <div className="flex gap-4 flex-wrap">
        <FormControl style={{ width: "300px" }} margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Category"
          >
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="Drinks">Drinks</MenuItem>
            <MenuItem value="Canned Goods">Canned Goods</MenuItem>
            <MenuItem value="Snacks">Snacks</MenuItem>
            <MenuItem value="Bakery">Bakery</MenuItem>
            <MenuItem value="Dairy">Dairy</MenuItem>
            <MenuItem value="Frozen Foods">Frozen Foods</MenuItem>
            <MenuItem value="Condiments">Condiments</MenuItem>
            <MenuItem value="Meat & Seafood">Meat & Seafood</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: "300px" }} margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Low in Stock">Low in Stock</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </Select>
        </FormControl>

        <div className="flex gap-2 items-center">
          <TextField
            label="Min Price"
            type="number"
            variant="outlined"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ width: "130px" }}
            margin="normal"
          />
          <span>to</span>
          <TextField
            label="Max Price"
            type="number"
            variant="outlined"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: "130px" }}
            margin="normal"
          />
        </div>
      </div>
      <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.category}</TableCell>
                  <TableCell align="center">${item.price}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">
                    <span
                      className={`font-bold ${
                        item.status === "Available"
                          ? "text-green-500"
                          : item.status === "Low in Stock"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ marginRight: "10px" }}
                      onClick={() => handleEditOpen(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteOpen(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell colSpan={6}>No products found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        open={openDialog}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
      <EditProductDialog
        open={openEditDialog}
        onClose={handleEditClose}
        onConfirm={handleEditConfirm}
        product={productToEdit} // Pass the product to be edited
      />
    </div>
  );
};

export default ProductsTable;
