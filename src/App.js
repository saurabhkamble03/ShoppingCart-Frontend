import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import LoginPage from "./pages/LoginPage";
import MyCart from "./pages/MyCart";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfile from "./pages/UpdateProfile";
import UserHomePage from "./pages/UserHomePage";
import UserLoginPage from "./pages/UserLoginPage";
import UserSignUpPage from "./pages/UserSignUpPage";
import WishlistPage from "./pages/WishlistPage";
import AdminLogin from "./pages/AdminLogin";
import AdminHomePage from "./pages/AdminHomePage";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import AdminItemPage from "./pages/AdminItemPage";
import UpdateItemPage from "./pages/UpdateItemPage";
import AddItemPage from "./pages/AddItemPage";
import ManageOrderPage from "./pages/ManageOrderPage";
import AddCategoryPage from "./pages/AddCategoryPage";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/userHome' element={<UserHomePage />} />
          <Route path="/userLogin" element={<UserLoginPage />} />
          <Route path="/userSignUp" element={<UserSignUpPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/item" element={<ItemPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/myOrders" element={<MyOrdersPage />} />
          <Route path="/myCart" element={<MyCart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/adminLogin" element={<AdminLogin/>}/>
          <Route path="/adminHome" element={<AdminHomePage/>} />
          <Route path="/adminCategory" element={<AdminCategoryPage/>} />
          <Route path="/adminItem" element={<AdminItemPage/>} />
          <Route path="/updateItem" element={<UpdateItemPage/>} />
          <Route path="/addItem" element={<AddItemPage/>} />
          <Route path="/manageOrders" element={<ManageOrderPage/>} />
          <Route path="/addCategory" element={<AddCategoryPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
