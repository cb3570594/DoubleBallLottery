import sequelize from '@/db';
import Ticket, { TicketAttributes } from '@/model/ticket';

export const addTicket = (options: TicketAttributes) => {
  return Ticket.create(options);
};

export const findOrAddTicket = (options: TicketAttributes) => {
  return Ticket.findOrCreate({
    where: {
      date: options.date
    },
    defaults: options
  });
};

export const findAllTicket = (pageNo: number = 1, pageSize: number = 10) => {
  return Ticket.findAndCountAll({
    limit: pageSize,
    offset: pageNo - 1,
    order: [
      ['date', 'DESC']
    ]
  });
};

export const findTicketByDate = (date: string | Date) => {
  return Ticket.findOne({
    where: {
      date,
    },
  });
};

export const findTicketByNumber = (numbers: string[]) => {
  return Ticket.findAll({
    where: {
      number1: numbers[0],
      number2: numbers[1],
      number3: numbers[2],
      number4: numbers[3],
      number5: numbers[4],
      number6: numbers[5],
      number7: numbers[6],
    },
    order: [
      ['date', 'DESC']
    ]
  });
};
