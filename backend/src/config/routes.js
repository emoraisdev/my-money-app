import billingCycleRoutes from '../api/billingCycle/billingCycleRoutes.js'

export default (server) => {    
    
    server.use('/api/billingCycles', billingCycleRoutes)
}