import {startBatch, endBatch} from "./observable";
import {deprecated} from "../utils/utils";
import {untrackedStart, untrackedEnd} from "./derivation";

/**
 * @deprecated
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * Deprecated to simplify api; transactions offer no real benefit above actions.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */
export function transaction<T>(action: () => T, thisArg = undefined): T {
	deprecated("Using `transaction` is deprecated, use `runInAction` or `(@)action` instead.");
	return runInTransaction.apply(undefined, arguments);
}

export function runInTransaction<T>(action: () => T, thisArg = undefined): T {
	// TODO: use execute action!
	startBatch();
	const prev = untrackedStart();
	try {
		return action.call(thisArg);
	} finally {
		untrackedEnd(prev);
		endBatch();
	}
}
