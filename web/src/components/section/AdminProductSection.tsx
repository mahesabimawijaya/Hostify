"use client";
import React, { useState } from "react";
import AdminProductCard from "../cards/AdminProductCard";
import CreateProductModal from "../modals/CreateProductModal";
import EditProductModal from "../modals/EditProductModal";

function AdminProductSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleEditProduct = (productId: any) => {
    setSelectedProductId(productId);
    setIsEditModalOpen(true);
  };

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
              <span className=" flex items-center">+</span>
              Add new plan
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-[1112px]">
          <AdminProductCard onEdit={handleEditProduct} />
          {/* edit and create */}
          <CreateProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
          <EditProductModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            productId={selectedProductId}
          />
        </div>
      </div>
    </>
  );
}

export default AdminProductSection;
