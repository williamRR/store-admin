import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Buttons from '../components/Buttons';
import MainTable from '../components/MainTable';
import API from '../utils/API';
import { Container, TextField } from '@mui/material';
import EntityModal from '../components/EntityModal';
import { paths } from '../router/paths';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Pagination } from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [entityModalOpen, setEntityModalOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const {
    userData: { storeId, roles },
  } = useAuth();

  const handleEdit = async (entityData) => {
    try {
      const url = `product/${selected._id}`;
      await API.patch(url, entityData);
      fetchEntities();
      setEntityModalOpen(false);
      toast.success('Entity edited successfully');
      setSelected({});
      fetchEntities();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response.status === 400) {
          toast.error('Error:1 ' + error.response.data.message);
        }
        if (error.response.status === 500) {
          toast.error('Error:2 ' + error.response.data.message);
        }
      }
      toast.error('Error:3 ' + error.message);
    }
  };

  const handleSave = async (entityData) => {
    try {
      const url = `product`;
      await API.post(url, { ...entityData, storeId });
      fetchEntities();
      setEntityModalOpen(false);
      toast.success('Tienda creada correctamente');
      fetchEntities();
      setSelected({});
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response.status === 400) {
          toast.error('Error: ' + error.response.data.message);
        }
        if (error.response.status === 500) {
          toast.error('Error: ' + error.response.data.message);
        }
      }
      toast.error('Error: ' + error.message);
    }
  };
  useEffect(() => {
    fetchEntities();
  }, [categorySelected]);

  const handleRowClick = (entityItem) => {
    if (entityItem === selected) {
      setSelected(null);
      return;
    }
    setSelected(entityItem);
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const fetchEntities = async () => {
    setLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/product/store/${storeId}/category/${
        categorySelected ? categorySelected : 'allProducts'
      }?page=${page}&limit=${limit}`;
      const response = await API.get(url);
      const { products, totalPages } = response.data;
      setProducts(products);
      setTotalPages(totalPages);
      setTimeout(() => {
        setLoading(false);
        setError(null);
      }, 1000);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return (
    <>
      {/* {/* <ConfirmationDialog
        open={deleteModal}
        setOpen={setDeleteModal}
        title='Eliminar'
        content='¿Estás seguro de que quieres eliminar este elemento?'
        onConfirm={handleDelete}
        onClose={() => setDeleteModal(false)}
      /> */}

      <TextField
        placeholder=''
        select
        name=''
        onChange={(e) => setCategorySelected(e.target.value)}
        SelectProps={{
          native: true,
        }}
      >
        <option value='allProducts'>Selecciona una categoría</option>
        {categories?.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </TextField>
      <EntityModal
        entityModalOpen={entityModalOpen}
        setEntityModalOpen={setEntityModalOpen}
        entity={[
          {
            id: 'name',
            label: 'Nombresss',
            type: 'text',
            editable: true,
            isHeader: true,
            shouldRenderOnAdd: true,
            shouldRenderOnEdit: true,
            isEditable: true,
          },
          {
            id: 'description',
            label: 'Description',
            editable: true,
            type: 'text',

            isHeader: false,
            shouldRenderOnAdd: true,
          },
          {
            id: 'price',
            type: 'text',

            label: 'Price',
            isHeader: true,
            shouldRenderOnAdd: true,
            editable: true,
          },
          {
            id: 'categoryId',
            label: 'Category',
            isHeader: true,
            editable: true,
            options: categories,
            shouldRenderOnAdd: true,
          },
          {
            id: 'image',
            editable: true,
            label: 'Image',
            isHeader: true,
            shouldRenderOnAdd: true,
          },

          { id: '_id', label: 'ID' },
          ,
        ]}
        entityName={'Product'}
        entityData={selected}
        onSave={handleSave}
        onEdit={handleEdit}
        editing={editing}
      />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          height: '10vh',
        }}
      >
        <h1 style={{ textTransform: 'capitalize' }}>{name}</h1>
      </Container>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => {
          setPage(value);
          fetchEntities();
        }}
      />
      <MainTable
        entities={products}
        headers={[
          { id: 'name', label: 'Name', editable: false, isHeader: true },
          {
            id: 'description',
            label: 'Description',
            editable: true,
            isHeader: false,
          },
          {
            id: 'category.name',
            label: 'Category',
            isHeader: true,
            editable: true,
            options: categories,
            shouldRenderOnAdd: true,
          },
          { id: 'price', label: 'Price', isHeader: true },
          { id: '_id', label: 'ID' },
        ]}
        entity={'product'}
        loading={loading}
        error={error}
        selected={selected}
        handleRowClick={handleRowClick}
      />
      <Buttons
        canApplyToOwnStore={false}
        handleDelete={setDeleteModal}
        roles={roles}
        selected={selected}
        setEditing={setEditing}
        // handleApply={handleApply}
        setEntityModalOpen={setEntityModalOpen}
        setSelected={setSelected}
        storeId={storeId}
      />
      {/* </Container> */}
    </>
  );
};

export default Products;
