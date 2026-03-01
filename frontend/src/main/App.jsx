import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Layout from '../common/layout/layout'
import BillingCycle from '../billingCycle/billingCycle'
import Dashboard from '../dashboard/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="billingCycles" element={<BillingCycle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
