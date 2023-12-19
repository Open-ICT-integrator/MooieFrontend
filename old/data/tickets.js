// Just for testing purposes, this should be fetched from
// a database later on.
export const Status = {
    UNCLAIMED: [
        "UNCLAIMED",
        "red-100"
    ],
    OPEN: [
        "OPEN",
        "orange"
    ],
    CLOSED: [
        "CLOSED",
        "red-100"
    ],
    ANSWERED: [
        "ANSWERED",
        "red-100"
    ],
    AWAITING_REPLY_OPERATOR: [
        "BEANTWOORD DOOR STUDENT",
        "green"
    ],
    AWAITING_REPLY_CUSTOMER: [
        "BEANTWOORD DOOR OPERATOR",
        "green"
    ]
}

export const TicketsSampleData = [
    {
        id: 1,
        engineer: "Martijn",
        subject: "Server start niet meer op!",
        date: "23/04/2022",
        status: Status.OPEN,
        product: "Virtual Machine A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 2,
        engineer: "Ype",
        subject: "IP whitelisten",
        date: "23/04/2022",
        status: Status.CLOSED,
        product: "Virtual Machine A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 3,
        engineer: "Gelder",
        subject: "IP whitelisten",
        date: "23/04/2022",
        status: Status.AWAITING_REPLY_CUSTOMER,
        product: "Virtual Machine A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 4,
        engineer: "Gelder",
        subject: "IP whitelisten",
        date: "23/04/2022",
        status: Status.UNCLAIMED,
        product: "Virtual Machine A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]