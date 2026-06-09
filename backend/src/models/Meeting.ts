import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Group from './Group'

@Table({ tableName: 'meetings', timestamps: false })
export default class Meeting extends Model<Meeting> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: 'meeting_id' })
    id!: number

    @ForeignKey(() => Group)
    @Column({ type: DataType.INTEGER, field: 'group_id' })
    groupId!: number

    @Column({ type: DataType.DATE, field: 'start_time' })
    start!: Date

    @Column({ type: DataType.DATE, field: 'end_time' })
    end!: Date

    @Column({ type: DataType.TEXT })
    description!: string

    @Column({ type: DataType.STRING })
    room!: string

    @BelongsTo(() => require('./Group').default, { foreignKey: 'groupId' })
    group?: any
}
