import { Store } from "../../modules/store.module";

export const StoreService = {
  createStore: async (storeDto, transactionalEntityManager) => {
    const newStore = transactionalEntityManager.create(Store, storeDto);
    await transactionalEntityManager.save(newStore);
    return newStore;
  },
};
