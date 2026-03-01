import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'
import Footer from './footer'
import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'

export default () => {

    return (
        <>
            <div className="d-flex">

                    <Sidebar/>

                    <div className="d-flex flex-column flex-grow-1 min-vh-100">

                        <nav className="navbar px-2"
                            style={{ backgroundColor: '#4b5563' }}
                            data-bs-theme="light" >

                            <div className="d-flex align-items-center">
                                <a className="navbar-brand d-flex align-items-center text-white" href="#">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                                    <strong>My</strong> Money
                                </a>
                            </div>
                        </nav>

                        <main className="flex-grow-1 p-3 overflow-auto"
                            style={{ backgroundColor: '#eff4f5' }}
                        >
                            <Outlet/>
                        </main>

                        <Footer />
                    </div>
                </div>
        </>
    )
}