/**
 * Options to add task
 */
export interface AddTaskOptions {
  /**
   * Task to add
   */
  task: () => any;

  /**
   * Minimal timeout after task will be executed
   */
  timeout: number;

  /**
   * Timeout name which has to be terminated and assigned to passed to task
   */
  timeoutName?: string;
}

/**
 * Function that terminates task
 */
export type TerminateTask = () => void;

/**
 * Background worker interface
 */
export interface BackgroundWorkerInterface {
  /**
   * Adds delayed background task
   * @param {AddTaskOptions} options
   * @returns {TerminateTask}
   */
  addTask(options: AddTaskOptions): TerminateTask;

  /**
   * Terminates task
   * @param timeoutName
   */
  terminateTask(timeoutName: string): void;
}
