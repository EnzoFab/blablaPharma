import wrapper from "./socketWrapper";
import io from "./io";
import helperMethods from "./helperMethods";

export const SailSocketWrapper = wrapper(io);
export const toBase64 = helperMethods;
