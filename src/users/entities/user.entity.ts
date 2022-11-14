import { Column, Table, Model, BelongsTo, DataType } from 'sequelize-typescript';
import { Job } from 'src/jobs/entities/job.entity';
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

    @Column({ type: DataType.STRING(200) })
    nameSurname: string;

    @Column({ type: DataType.STRING(300) })
    password: string;

    @Column({
        unique: true,
        type: DataType.STRING(100)
    })
    email: string;

    @Column
    photo: string;

    @Column({ type: DataType.STRING(4000) })
    about: string;

    @Column
    jobId: string;

    @BelongsTo(() => Job, {
        foreignKey: 'jobId',
        constraints: false,
    })
    job: Job;

    @Column
    lastLoginAt: Date;

    updatedBy: string;
}