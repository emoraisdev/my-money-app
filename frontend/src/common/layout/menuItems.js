import {
    faChartColumn,
    faEdit,
    faSackDollar
} from '@fortawesome/free-solid-svg-icons'

export const menuItems = [
    {
        label: "Dashboard",
        icon: faChartColumn,
        link: "/"
    },
    {
        label: "Cadastro",
        icon: faEdit,
        subItems: [
            {
                label: "Ciclos de Pagamentos",
                icon: faSackDollar,
                link: "/billingCycles"
            }
        ]
    }
]