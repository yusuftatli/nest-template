import { Column, Table, Model, } from 'sequelize-typescript';
import { AuditableModel } from '../../common/models/auditable-model';

@Table({
    tableName: 'jobs',
    timestamps: true,
    paranoid: true,
    version: true,
})
export class Job extends Model implements AuditableModel {
    @Column({
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    id: string;

    @Column
    description: string;

    @Column
    updatedBy: string;
}
