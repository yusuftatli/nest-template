import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

/**
 * Runs scope function in a transactional scope, handles exceptions and rollback.
 *
 * Note that this function will throw same error in order to let consumer decides what to do with the error.
 */
export async function transactional(sequelizeInstance: Sequelize, scopeFn: (t: Transaction) => Promise<any>) {
  if (!sequelizeInstance) {
    throw Error('Sequelize instance is not present!');
  }

  const transaction = await sequelizeInstance.transaction();

  try {
    const returnVal = await scopeFn(transaction);

    await transaction.commit();
    return returnVal;
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
}
