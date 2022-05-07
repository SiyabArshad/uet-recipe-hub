import Home from "./Pages/Home"
import "./index.css"
import AddRecipe from "./Pages/AddRecipe";
import RecipeDetail from "./Pages/RecipeDetail";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Forgot from "./Pages/Forgot";
import Emailvalidation from "./Pages/Emailvalidation";
import Update from "./Pages/Update";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthContext } from "./context/context";
import { useContext } from "react";
function App() {
  const {user}=useContext(AuthContext)
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={user?<Home />:<Signin/>}></Route>
    <Route path="/login" element={!user?<Signin />:<Home/>}></Route>
    <Route path="/signup" element={!user?<Signup />:<Home/>}></Route>
    <Route path="/activation/:id" element={!user?<Emailvalidation />:<Home/>}></Route>
    <Route path="/forgotpassword" element={!user?<Forgot />:<Home/>}></Route>
    <Route path="/addrecipe" element={user?<AddRecipe />:<Signin/>}></Route>
    <Route path="/recipe/:id" element={user?<RecipeDetail />:<Signin/>}></Route>
    <Route path="/update/:id" element={user?<Update />:<Signin/>}></Route>    
    </Routes>
  </BrowserRouter>
    );
}

export default App;
