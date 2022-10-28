// 라우터 처리
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import { MenuManage } from './seller/MenuManage/menuManage';
import { OrderManage } from '../src/seller/OrderManage/orderManage'; //{}이유가 from directory에서 반출하는게 2개 이상일 경우 작성(1개만 반출해도 {}작성무관)
import { ReserveManage } from './seller/ReserveManage/reserveManage';
import { MyPage } from './seller/MyPage/mypage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orderManage" element={<OrderManage />} />
        <Route path="/menuManage" element={<MenuManage />} />
        <Route path= "/reserveManage" element={<ReserveManage />} />
        <Route path= "/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
