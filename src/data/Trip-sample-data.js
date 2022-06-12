const dayjs = require('dayjs');

const trips = [
  {
    id: 35,
    userID: 36,
    destinationID: 1,
    travelers: 3,
    date: "2022/10/23",
    duration: 16,
    status: "pending",
    suggestedActivities: [ ]
  },
  {
    id: 125,
    userID: 19,
    destinationID: 2,
    travelers: 4,
    date: "2022/12/22",
    duration: 15,
    status: "approved",
    suggestedActivities: [ ]
  },
  {
    id: 102,
    userID: 3,
    destinationID: 3,
    travelers: 3,
    date: dayjs().format('YYYY-MM-DD'),
    duration: 8,
    status: "approved",
    suggestedActivities: [ ]
  },
  {
    id: 124,
    userID: 46,
    destinationID: 3,
    travelers: 6,
    date: dayjs().format('YYYY-MM-DD'),
    duration: 16,
    status: "pending",
    suggestedActivities: [ ]
  },
  {
    id: 53,
    userID: 27,
    destinationID: 4,
    travelers: 6,
    date: "2020/01/03",
    duration: 20,
    status: "approved",
    suggestedActivities: [ ]
  },
  {
    id: 92,
    userID: 30,
    destinationID: 4,
    travelers: 2,
    date: "2020/12/24",
    duration: 16,
    status: "approved",
    suggestedActivities: [ ]
  }
];

export { trips }