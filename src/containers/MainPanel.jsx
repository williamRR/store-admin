import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import axios, { isAxiosError } from 'axios';
import Buttons from '../components/Buttons';
import EntityModal from '../components/EntityModal';
import MainTable from '../components/MainTable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationDialog from '../components/ConfirmationDialog';
import API from '../utils/API';
import { useAuth } from '../context/AuthContext';
const MainPanel = ({ entity, name, headers }) => {
  const [entities, setEntities] = useState([]);
  const [entityModalOpen, setEntityModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const {
    userData: { storeId, roles },
  } = useAuth();
  const { userData } = useAuth();
  const handleSave = async (entityData) => {
    try {
      const url = `${entity}`;
      await API.post(url, { ...entityData, storeId });
      fetchEntities();
      setEntityModalOpen(false);
      toast.success('Entity created successfully');
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

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const handleDelete = async () => {
    try {
      const url = `${entity}/${selected._id}`;
      await API.delete(url);
      fetchEntities();
      setEntityModalOpen(false);
      toast.success('Entity deleted successfully');
      setSelected({});
      fetchEntities();
      setDeleteModal(false);
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

  const handleEdit = async (entityData) => {
    try {
      const url = `${entity}/${selected._id}`;
      await API.patch(url, entityData);
      fetchEntities();
      setEntityModalOpen(false);
      toast.success('Entity edited successfully');
      setSelected({});
      fetchEntities();
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

  const fetchEntities = async () => {
    setLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/${entity}?page=${page}&limit=${limit}`;
      const response = await API.get(url);
      const { data, totalPages } = response.data;
      setEntities(data);
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

  const handleApply = async (entityId, storeId) => {
    try {
      const url = `stores/${storeId}`;
      await API.patch(url, { palette: entityId });
      fetchEntities();
      setEntityModalOpen(false);
      toast.success('Entity applied successfully');
      setSelected({});
      fetchEntities();
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
  }, [entity]);

  const handleRowClick = (entityItem) => {
    if (entityItem === selected) {
      setSelected(null);
      return;
    }
    setSelected(entityItem);
  };

  return (
    <>
      <ConfirmationDialog
        open={deleteModal}
        setOpen={setDeleteModal}
        title='Eliminar'
        content='¿Estás seguro de que quieres eliminar este elemento?'
        onConfirm={handleDelete}
        onClose={() => setDeleteModal(false)}
      />
      <Container xs={9} sx={{}}>
        <EntityModal
          entityModalOpen={entityModalOpen}
          setEntityModalOpen={setEntityModalOpen}
          entity={headers}
          entityName={entity}
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
        <MainTable
          entities={entities}
          headers={headers}
          entity={entity}
          loading={loading}
          error={error}
          selected={selected}
          handleRowClick={handleRowClick}
        />
        <Buttons
          canApplyToOwnStore={entity === 'palette'}
          handleDelete={setDeleteModal}
          roles={roles}
          selected={selected}
          setEditing={setEditing}
          handleApply={handleApply}
          setEntityModalOpen={setEntityModalOpen}
          setSelected={setSelected}
          storeId={storeId}
        />
      </Container>
    </>
  );
};

export default MainPanel;
