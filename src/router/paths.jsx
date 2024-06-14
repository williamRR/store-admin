// AuthContext.js (contexto de autenticación)
// ... (código anterior)

import Forbidden from '../containers/Forbidden';
import Login from '../containers/Login';
import { CircularProgress } from '@mui/material';
import Products from '../containers/Products';

export const paths = [
  {
    id: 'home',
    path: '/',
    name: 'Mi Perfil',
    accessible: ['superAdmin', 'storeAdmin'],
    showInSidebar: true,
    crud: false,
    component: <h1>Home</h1>,
  },
  {
    id: 'login',
    path: '/login',
    name: 'Login',
    accessible: 'unauthenticated',
    showInSidebar: true,
    crud: false,
    component: <Login />,
  },
  {
    id: 'reset-password',
    path: '/reset-password',
    name: 'Reset Password',
    accessible: 'unauthenticated',
    showInSidebar: true,
    crud: false,
    component: <h1>Reset Password</h1>,
  },
  {
    id: '404',
    path: '*',
    name: '404',
    accessible: 'all',
    showInSidebar: false,
    crud: false,
    component: <h1>404 Not Found</h1>,
  },
  {
    id: 'forbidden',
    path: '/forbidden',
    name: 'Forbidden',
    accessible: 'all',
    showInSidebar: false,
    public: true,
    crud: false,
    component: <h1>FORBIDDEN</h1>,
  },
  {
    id: 'stores',
    path: '/stores',
    name: 'Tiendas',
    accessible: ['superAdmin'],
    showInSidebar: true,
    entity: 'stores',
    headers: [
      {
        id: 'name',
        label: 'Name',
        editable: true,
        shouldRenderOnAdd: true,
        isHeader: true,
        required: true,
        type: 'text',
      },
      {
        id: 'description',
        label: 'Description',
        editable: true,
        isHeader: true,
        required: false,
        type: 'text',
      },
      {
        id: 'phone',
        label: 'Phone',
        editable: true,
        isHeader: false,
        required: true,
        type: 'tel',
      },
      {
        id: 'email',
        label: 'Email',
        editable: true,
        isHeader: false,
        required: true,
        type: 'email',
      },
      {
        id: 'address',
        label: 'Address',
        editable: true,
        isHeader: false,
        required: false,
        type: 'text',
      },
      {
        id: 'slug',
        label: 'Slug',
        editable: true,
        isHeader: true,
        required: true,
        type: 'text',
      },
      {
        id: 'currency',
        label: 'Currency',
        editable: true,
        isHeader: true,
        required: true,
        type: 'text',
      },
    ],
    crud: true,
  },
  {
    id: 'palette',
    path: '/palette',
    name: 'Temas',
    accessible: ['superAdmin', 'storeAdmin'],
    showInSidebar: true,
    entity: 'palette',
    crud: true,
    // canApplyToOwnStore: true,
    headers: [
      {
        id: '_id',
        isHeader: false,
        name: 'id',
        label: 'ID',
        editable: false,
        shouldRenderOnAdd: false,
      },
      // {
      //   id: 'textContrastColor',
      //   isHeader: true,
      //   label: 'Name',
      //   name: 'name',
      //   editable: true,
      //   shouldRenderOnAdd: true,
      // },
      {
        id: 'primaryColor',
        name: 'primaryColor',
        isHeader: true,
        label: 'Primary Color',
        editable: true,
        isColor: true,
        shouldRenderOnAdd: true,
      },
      {
        id: 'secondaryColor',
        isHeader: true,
        name: 'secondaryColor',
        label: 'Secondary Color',
        editable: true,
        isColor: true,
        shouldRenderOnAdd: true,
      },
      {
        id: 'thirdColor',
        isHeader: true,
        name: 'thirdColor',
        label: 'Terciary Color',
        editable: true,
        isColor: true,
        shouldRenderOnAdd: true,
      },
      {
        id: 'backgroundColor',
        isHeader: true,
        name: 'backgroundColor',
        label: 'Background Color',
        editable: true,
        shouldRenderOnAdd: true,
        isColor: true,
      },
      {
        id: 'additionalAccentColor',
        isHeader: true,
        name: 'additionalAccentColor',
        label: 'Acento Adicional',
        editable: true,
        isColor: true,
        shouldRenderOnAdd: true,
      },
      {
        id: 'textColor',
        name: 'textColor',
        isHeader: true,
        shouldRenderOnAdd: true,
        isColor: true,
        label: 'Text Color',
        editable: true,
      },
      {
        id: 'textContrastColor',
        name: 'textContrastColor',
        isHeader: true,
        shouldRenderOnAdd: true,
        isColor: true,
        label: 'Text Color Contrast',
        editable: true,
      },
      {
        id: 'smallLogo',
        shouldRenderOnAdd: true,
        name: 'smallLogo',
        isHeader: false,
        label: 'Small Logo',
        editable: true,
      },
      {
        id: 'largeLogo',
        name: 'largeLogo',
        shouldRenderOnAdd: true,
        isHeader: false,
        label: 'Large Logo',
        editable: true,
      },
      {
        id: 'fontFamily',
        isHeader: false,
        shouldRenderOnAdd: true,
        name: 'fontFamily',
        label: 'Font Family',
        editable: true,
      },
      {
        id: 'isActive',
        name: 'isActive',
        isHeader: false,
        label: 'Is Active',
        editable: false,
      },
      {
        id: 'createdAt',
        isHeader: false,
        name: 'createdAt',
        label: 'Created At',
        editable: false,
      },
      {
        id: 'isActive',
        isHeader: true,
      },
      // {
      //   id: 'storeId',
      //   name: 'storeId',
      //   isHeader: true,
      //   label: 'Store ID',
      //   editable: false,
      //   required: false,
      //   shouldNotAppearInForm: true,
      // },
      {
        id: 'updatedAt',
        isHeader: false,
        name: 'updatedAt',
        label: 'Updated At',
        editable: false,
      },
    ],
  },
  {
    id: 'categories',
    path: '/categories',
    name: 'Categorias',
    accessible: ['storeAdmin', 'superAdmin'],
    entity: 'category',
    crud: true,
    showInSidebar: true,
    headers: [
      {
        id: 'name',
        label: 'Name',
        editable: true,
        isHeader: true,
        shouldRenderOnAdd: true,
      },
      {
        id: 'storeId',
        label: 'Store ID',
        editable: false,
        isHeader: false,
      },
      {
        id: 'description',
        label: 'Description',
        shouldRenderOnAdd: false,
        editable: true,
        isHeader: false,
      },
      {
        id: 'image',
        label: 'Imagen',
        shouldRenderOnAdd: false,
        editable: true,
        // isHeader: true,
      },
      { id: '_id', label: 'ID', editable: false },
    ],
  },
  {
    id: 'products',
    path: '/products',
    name: 'Productos',
    entity: 'products',
    crud: false,
    component: <Products />,
    headers: [],
    showInSidebar: true,
    accessible: ['superAdmin', 'storeAdmin'],
  },
  // {
  //   id: 'users',
  //   path: '/users',
  //   name: 'Usuarios',
  //   entity: 'users',
  //   crud: true,
  //   showInSidebar: true,
  //   accessible: ['superAdmin'],
  // },
  // {
  //   id: 'orders',
  //   path: '/orders',
  //   name: 'Órdenes',
  //   entity: 'orders',
  //   crud: true,
  //   showInSidebar: true,
  //   accessible: ['superAdmin', 'storeAdmin'],
  // },
  // {
  //   id: 'assistance',
  //   path: '/assistance',
  //   name: 'Solicitar Asistencia',
  //   accessible: 'all',
  //   public: true,
  //   crud: false,
  //   showInSidebar: true,
  //   component: <h1>ASSISTANCE</h1>,
  // },
];