import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faMoneyBillWave, faUser } from '@fortawesome/free-solid-svg-icons'
import Footer from './footer'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../auth/authSlice'

export default () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="d-flex">

            <Sidebar />

            <div className="d-flex flex-column flex-grow-1 min-vh-100">

                <nav className="navbar px-2"
                    style={{ backgroundColor: '#4b5563' }}
                    data-bs-theme="light" >

                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <a className="navbar-brand d-flex align-items-center text-white" href="#">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                            <strong>My</strong> Money
                        </a>

                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faUser} className="me-2 text-white" />
                            
                            <span className="me-3 text-white">{user?.name}</span>
                            
                            <button className="btn btn-outline-light" 
                                onClick={handleLogout}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="flex-grow-1 p-3 overflow-auto"
                    style={{ backgroundColor: '#eff4f5' }}
                >
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    )
}