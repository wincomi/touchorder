// 라우터 처리
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Choice from'../src/pages/Choice';
import Home from './pages/Home';
import Login from './pages/Login';
import { MenuManage } from './pages/seller/MenuManage/menuManage';
import { OrderManage } from './pages/seller/OrderManage/orderManage'; //{}이유가 from directory에서 반출하는게 2개 이상일 경우 작성(1개만 반출해도 {}작성무관)
import { ReserveManage } from './pages/seller/ReserveManage/reserveManage';
import { MyPage } from './pages/seller/MyPage/mypage';
import SellerLogin  from '../src/pages/seller/SellerLogin';
import SellerHome from '../src/pages/seller/SellerHome' ;
import Register from '../src/pages/seller/Register/Register';

function App() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path="/" element={<Choice />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orderManage" element={<OrderManage />} />
        <Route path="/menuManage" element={<MenuManage />} />
        <Route path="/reserveManage" element={<ReserveManage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="Touchorder.kr/seller/login" element={<SellerLogin />} />
        <Route path="Touchorder.kr/seller/home" element={<SellerHome />} />
        <Route path="Touchorder.kr/seller/register" element={<Register />}/>
      </Route>
    </Routes>
  );
}

export default App;
