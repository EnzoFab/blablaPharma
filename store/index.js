import module_mutations from "./modules/mutations";
import module_actions from "./modules/actions";
import module_getters from "./modules/getters";

export const state = () => ({
  token: null,
  connectedUser: null
});

export const mutations = module_mutations;

export const actions = module_actions;

export const getters = module_getters;
