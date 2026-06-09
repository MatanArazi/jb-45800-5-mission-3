import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript'

@Table({ tableName: 'development_groups', timestamps: false })
export default class Group extends Model<Group> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: 'group_id' })
    id!: number

    @Column({ type: DataType.STRING, field: 'group_name' })
    name!: string

    @HasMany(() => require('./Meeting').default, { foreignKey: 'groupId' })
    meetings?: any[]
}
