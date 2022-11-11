import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';
import { AuditableModel } from '../../common/models/auditable-model';


@Table({
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    version: true,
})
export class User extends Model implements AuditableModel {
    @Column({
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    id: string;

    @Column
    nameSurname: string;

    @Column
    email: string;

    @Column
    photo: string;

    @Column
    lastLoginAt: Date;

    updatedBy: string;
}