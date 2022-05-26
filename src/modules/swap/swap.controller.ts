import * as swapService from "./swap.service";

export const addSwap = async (body) => {
  try {
    await swapService.addSwap(body);
  } catch (error) {
    console.log(error);
  }
};
