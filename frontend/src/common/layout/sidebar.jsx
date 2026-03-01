import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { menuItems } from './menuItems'
import { NavLink } from 'react-router-dom'

export default () => {
    const [collapsed, setCollapsed] = useState(true)
    const [openIndexes, setOpenIndexes] = useState([])

    const toggleSubmenu = (index) => {
        setOpenIndexes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        )
    }

    return (
        <div className="d-flex flex-column p-2"
            style={{
                backgroundColor: '#374151',
                width: collapsed ? '60px' : '200px',
                transition: 'width 0.3s',
            }}
        >
            <button
                className="btn me-1"
                style={{
                    backgroundColor: '#374151'
                }}
                onClick={() => setCollapsed(!collapsed)}
            >
                <FontAwesomeIcon icon={faBars} color='white' />
            </button>

            {/* Menu principal */}
            {!collapsed && (
                <ul className="d-flex flex-column p-2" style={{ gap: '10px' }}>
                    {menuItems.map((item, index) => (
                        <li key={index} className="d-flex flex-column list-unstyled">

                            {item.subItems ? (
                                <div
                                    className="text-white d-flex align-items-center justify-content-between"
                                    onClick={() => toggleSubmenu(index)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span>
                                        <FontAwesomeIcon icon={item.icon} className="me-2" />
                                        <strong>{item.label}</strong>
                                    </span>
                                    <FontAwesomeIcon
                                        icon={openIndexes.includes(index) ? faChevronDown : faChevronRight}
                                        className="ms-2"
                                    />
                                </div>
                            ) : (
                                <NavLink
                                    to={item.link}
                                    className="text-white text-decoration-none"
                                >
                                    <FontAwesomeIcon icon={item.icon} className="me-2" />
                                    <strong>{item.label}</strong>
                                </NavLink >
                            )
                            }

                            {/* Submenu */}
                            {item.subItems && openIndexes.includes(index) && (
                                <div className="d-flex flex-column ms-3 mt-1"
                                    style={{
                                        gap: '10px',
                                        backgroundColor: '#374151',
                                        borderLeft: '2px solid #86adec',
                                        paddingLeft: '10px'
                                    }}>
                                    {item.subItems.map((sub, subIndex) => (

                                        <NavLink
                                            key={subIndex} 
                                            to={sub.link}
                                            className="text-white text-decoration-none"
                                        >
                                            <span>
                                                <FontAwesomeIcon icon={sub.icon} className="me-2" />
                                                <strong>{sub.label}</strong>
                                            </span>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )
            }
        </div >
    )
}