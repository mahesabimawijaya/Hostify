"use client";
import React, { useState, useEffect } from "react";
import AdminProductCard from "../cards/AdminProductCard";
import CreateProductModal from "../modals/CreateProductModal";
import { fetchData, deleteData } from "@/lib/axios";
import { Product } from "@/types/product";
import Loading from "../ui/Loading";
import Swal from "sweetalert2";
import EditProductModal from "../modals/EditProductModal";
function AdminProductSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await fetchData("api", "products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        Swal.fire("Error!", "Could not load plans.", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleEditProduct = (productId: number) => {
    setSelectedProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleProductCreate = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setIsModalOpen(false);
  };

  const handleProductUpdate = (updatedProduct: any) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDelete = async (productId: number) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete the product!",
    });

    if (confirmed.isConfirmed) {
      try {
        await deleteData("api", `products/${productId}`);
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire(
          "Error!",
          "There was a problem deleting the product.",
          "error"
        );
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="bg-[#F7F3FF] p-4 ">
        <div className="mx-auto max-w-[1112px]">
          <div className="flex items-center justify-between py-4">
            <h1 className="font-semibold text-xl">Manage your plans</h1>
            <button
              className="bg-primary text-white hover:bg-transparent hover:text-primary border border-primary text-bold uppercase duration-150 px-2 lg:px-4 py-2 rounded flex items-center gap-1"
              onClick={handleOpenModal}
            >
              <span className="flex items-center">+</span>
              Add new plan
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-[1112px]">
          <AdminProductCard
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDelete}
          />
          {/* edit and create */}
          <CreateProductModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onProductCreated={handleProductCreate}
          />
          {isEditModalOpen && selectedProductId !== null && (
            <EditProductModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              productId={selectedProductId}
              onProductUpdate={handleProductUpdate}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminProductSection;
