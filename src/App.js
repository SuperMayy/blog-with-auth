import About from './componets/pages/About';
import Home from './componets/pages/Home';
import Login from './componets/pages/Login';
import Error from './componets/pages/Error';
import RequireAuth from './logic/RequireAuth';
import ValidateLogin from './logic/ValidateLogin';
import {Routes, Route} from 'react-router-dom'
import Layout from './componets/layouts/Layout';
import './styles/header.css'
import './styles/layout.css'
import './styles/login.css'
import './styles/post.css'

function App() {
  return (
    <Routes>
      {/* public links */}
      <Route path="login" element={<Login/>} />

      {/* protected routes */}
      <Route element={<ValidateLogin/>}>
        <Route element={<RequireAuth/>}>
          <Route path="/" element={<Home/>} />
        </Route>
        <Route element={<RequireAuth/>}>
          <Route path="about" element={<About/>} />
        </Route>
      </Route>

      {/* 404: catch all */}
      <Route path="*" element={<Error/>} />

      <Route path="/" element={<Layout/>} />
    </Routes>
  );
}

export default App;
