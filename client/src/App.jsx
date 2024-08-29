import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { route } from '@/routes'; 
import { AuthProvider } from '@/context/AuthContext.jsx'; 
import PrivateRoute from '@/utils/PrivateRoute.jsx'; 

import NotFound from '@/views/NotFound.jsx'; 
import SignUp from '@/views/auth/SignUp'; 
import VerifyEmail from '@/views/auth/VerifyEmail';
import SignIn from '@/views/auth/SignIn';
import PasswordlessSignInRequest from '@/views/auth/PasswordlessSignInRequest';
import PasswordlessSignIn from '@/views/auth/PasswordlessSignIn'; 
import PasswordResetRequest from '@/views/auth/PasswordResetRequest';
import PasswordReset from '@/views/auth/PasswordReset'; 

import PrivateBrandShow from '@/views/private/brands/Show.jsx';
import PrivateBrandsIndex from '@/views/private/brands/Index.jsx';

import PrivateCategoryShow from '@/views/private/categories/Show.jsx';
import PrivateCategoriesIndex from '@/views/private/categories/Index.jsx';

import PrivateProductShow from '@/views/private/products/Show.jsx';
import PrivateProductsIndex from '@/views/private/products/Index.jsx';

import PrivateIndex from '@/views/private/Index.jsx';

import Index from '@/views/public/Index.jsx'; 


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth Routes */} 
          <Route path={ route('sign-up') } element={ <SignUp /> } /> 
          <Route path={ route('verify-email') } element={ <VerifyEmail /> } /> 
          <Route path={ route('sign-in') } element={ <SignIn /> } /> 
          <Route path={ route('passwordless-signin-request') } element={ <PasswordlessSignInRequest /> } /> 
          <Route path={ route('passwordless-signin') } element={ <PasswordlessSignIn /> } /> 
          <Route path={ route('password-reset-request') } element={ <PasswordResetRequest /> } /> 
          <Route path={ route('password-reset') } element={ <PasswordReset /> } /> 

          {/* Private Routes */} 
          <Route element={ <PrivateRoute /> } path='/'> 
            <Route path={ route('home.brands.show') } element={ <PrivateBrandShow /> } /> 
            <Route path={ route('home.brands.index') } element={ <PrivateBrandsIndex /> } /> 

            <Route path={ route('home.categories.show') } element={ <PrivateCategoryShow /> } /> 
            <Route path={ route('home.categories.index') } element={ <PrivateCategoriesIndex /> } /> 

            <Route path={ route('home.products.show') } element={ <PrivateProductShow /> } /> 
            <Route path={ route('home.products.index') } element={ <PrivateProductsIndex /> } /> 

            <Route path={ route('home.index') } element={ <PrivateIndex /> } />
          </Route> 

          {/* Public Routes */} 
          <Route path={ route('index') } element={ <Index /> } /> 

          {/* 404 */} 
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
