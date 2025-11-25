

import { Routes, Route, Navigate } from 'react-router-dom';


import AdsList from './pages/AdsList/adsList.jsx';
import AdDetails from './pages/AdDetails/adDetails.jsx';
import Stats from './pages/Stats/stats.jsx';


const Layout = ({ children }) => <div><header style={{ padding: '10px', background: '#f4f4f4' }}>Панель модерации</header><main>{children}</main></div>;
const NotFound = () => <h2>404 - Страница не найдена</h2>;


function App() {
  return (
    <Layout>
      <Routes>
        {}
        <Route path="/" element={<Navigate to="/list" replace />} />

        {}
        <Route path="/list" element={<AdsList />} />

        <Route path="/item/:id" element={<AdDetails />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;