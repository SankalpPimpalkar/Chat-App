import { Route, Routes } from "react-router-dom"
import Home from "./pages/main/Home"
import ProtectedLayout from "./pages/main/ProtectedLayout"
import Chat from "./pages/main/chats/Chat"
import SearchUsers from "./pages/main/users/SearchUsers"
import Profile from "./pages/main/profile/Profile"
import EditProfile from "./pages/main/profile/EditProfile"
import UserDetails from "./pages/main/users/UserDetails"
import AuthLayout from "./pages/auth/AuthLayout"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
// import ChangePassword from "./pages/main/profile/ChangePassword"
import NotFound from "./pages/NotFound"

export default function App() {


  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<Home />} />
        <Route path="chats/:chatId" element={<Chat />} />
        <Route path="search" element={<SearchUsers />} />
        <Route path="search/:userId" element={<UserDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        {/* <Route path="profile/change-password" element={<ChangePassword />} /> */}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
