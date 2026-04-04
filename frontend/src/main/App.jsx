import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import BillingCycle from '../billingCycle/billingCycle'
import Dashboard from '../dashboard/dashboard'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import LoginForm from '../auth/loginForm'
import ProtectedRoute from '../auth/protectedRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<ProtectedRoute />}>

          <Route index element={<Dashboard />} />
          <Route path="billingCycles" element={<BillingCycle />} />

        </Route>

        <Route path="login" element={<LoginForm />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
