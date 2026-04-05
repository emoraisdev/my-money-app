import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import BillingCycle from '../billingCycle/billingCycle'
import Dashboard from '../dashboard/dashboard'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import LoginForm from '../auth/loginForm'
import ProtectedRoute from '../auth/protectedRoute'
import RegisterForm from '../auth/registerForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<ProtectedRoute />}>

          <Route index element={<Dashboard />} />
          <Route path="billingCycles" element={<BillingCycle />} />

        </Route>

        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
