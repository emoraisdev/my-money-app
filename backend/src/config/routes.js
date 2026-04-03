import billingCycleRoutes from '../api/billingCycle/billingCycleRoutes.js'
import authRoutes from '../api/auth/authRoutes.js'
import { authMiddleware } from '../api/auth/authMiddleware.js'

export default (server) => {    
    
    server.use('/api/auth', authRoutes)
    server.use(authMiddleware)
    server.use('/api/billingCycles', billingCycleRoutes)
}