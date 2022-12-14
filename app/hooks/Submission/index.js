import { createContext, useContext } from 'react';
import { ExecutionResult } from './enums';
export { default as useExecution } from './useExecution';

export const ExecutionContext = createContext < ExecutionCtx > ({
    execute: () => Promise.resolve(ExecutionResult.Canceled),
    requests: undefined,
    waitingSubmit: false,
});

/**
 * Get the submission context
 */
export function useSubmission() {
    return useContext(ExecutionContext);
}