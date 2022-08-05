import sequelize from '@/db/index';
import { getOnePageTicket, getTicket, getTickets, initTicket, syncTicket } from '@/controller/ticket'


async function init() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter: true})
    console.log('Connection has been established successfully.');
    // syncTicket()
    // initTicket();
    const res = await getTickets(1, 10);
    console.log(res.rows)
    // getTicket('2022-08-02')
    // getTicket(['02', '06', '07', '20', '31', '33', '02'])
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

init()