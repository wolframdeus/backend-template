import Timeout = NodeJS.Timeout;
import {
  AddTaskOptions,
  BackgroundWorkerInterface, TerminateTask,
} from './types';

/**
 * Class which allows to execute tasks in background
 */
export class BackgroundWorker implements BackgroundWorkerInterface {
  /**
   * List of timeout names with their ids
   * @type {{}}
   */
  private timeouts: Record<string, Timeout> = {};

  public addTask(options: AddTaskOptions): TerminateTask {
    const {task, timeout, timeoutName: _timeoutName} = options;

    // Terminate previous task
    if (_timeoutName) {
      this.terminateTask(_timeoutName);
    }

    // Generate timeout name and create timeout
    const timeoutName = _timeoutName || Math.random().toString();
    this.timeouts[timeoutName] = setTimeout(() => task(), timeout);

    // Return terminator
    return () => this.terminateTask(timeoutName);
  }

  public terminateTask(taskNameOrId: string | symbol | NodeJS.Timeout): void {
    if (typeof taskNameOrId === 'string') {
      const timeoutId = this.timeouts[taskNameOrId];

      if (timeoutId) {
        // Clear timeout
        clearTimeout(timeoutId);

        // Delete task key
        delete this.timeouts[taskNameOrId];
      }
    } else {
      const entries = Object.entries(this.timeouts);

      for (let i = 0; i < entries.length; i++) {
        const [timeoutName, timeoutId] = entries[i];

        if (timeoutId === taskNameOrId) {
          // Clear timeout
          clearTimeout(timeoutId);

          // Delete task key
          delete this.timeouts[timeoutName];

          return;
        }
      }
    }
  }
}
