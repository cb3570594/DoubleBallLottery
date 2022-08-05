import { Optional } from 'sequelize';
import { AutoIncrement, Table, Model, Column, DataType, Index, Unique } from 'sequelize-typescript';

type NumIndex = 'number1' | 'number2' | 'number3' | 'number4' | 'number5' | 'number6' | 'number7'

export interface TicketAttributes {
  id?: number
  number1: string
  number2: string
  number3: string
  number4: string
  number5: string
  number6: string
  number7: string
  phase: string
  date: string
  sale: number
  firstPrize: number
  secondPrize: number
  numbers: string
}

interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

@Table
class Ticket extends Model<TicketAttributes, TicketCreationAttributes> {
  // @AutoIncrement
  // declare id: number;
  @Index({
    name: 'number',
    length: 2,
  })
  @Column({
    type: DataType.STRING(2)
  })
  declare number1: string

  @Index({
    name: 'number',
    length: 2,
  })
  @Column({
    type: DataType.STRING(2)
  })
  declare number2: string

  @Index({
    name: 'number',
    length: 2,
  })
  @Column({
    type: DataType.STRING(2)
  })
  declare number3: string

  @Index({
    name: 'number',
    length: 2,
  })
  @Column({
    type: DataType.STRING(2)
  })
  declare number4: string

  @Index({
    name: 'number',
    length: 2,
  })
  @Column({
    type: DataType.STRING(2)
  })
  declare number5: string

  @Index({
    name: 'number',
    length: 2,
  })
  @Column({
    type: DataType.STRING(2)
  })
  declare number6: string

  @Column({
    type: DataType.STRING(2)
  })
  declare number7: string

  @Column({
    type: DataType.STRING
  })
  declare phase: string

  @Unique
  @Column({
    type: DataType.DATEONLY 
  })
  declare date: string

  @Column({
    type: DataType.INTEGER
  })
  declare sale: number

  @Column({
    type: DataType.INTEGER
  })
  declare firstPrize: number

  @Column({
    type: DataType.INTEGER
  })
  declare secondPrize: number

  @Column({
    type: DataType.STRING(14)
  })
  get numbers(): string {
    let res = ''
    for (let i = 1; i < 8; i++) {
      const key = `number${i}` as NumIndex
      res += this.getDataValue(key)
    }
    return res
  }

  set numbers(value: string) {
    let res = ''
    for (let i = 1; i < 8; i++) {
      const key = `number${i}` as NumIndex
      res += this.getDataValue(key)
    }
    this.setDataValue('numbers', res)
  }
}

export default Ticket;
