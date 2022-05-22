import { LogType } from "../../types/log-type";

/**
 * Logger class that can be used to log messages to the console.
 * @param message The message to log
 * @param level The level of the message
 */
export default function log(message: any, level?: LogType) {
  if (!level) {
    level = "info";
  }
  const logFunction: Function = console[level]; //get the correct function to use
  const logLevel = `[${level.toUpperCase()}]`;
  if (logFunction) {
    //if the function exists
    logFunction(`${logLevel} ${message}`); //log the message, using the correct function
  } else {
    console.log(`${logLevel} ${message}`); //log the message, using the console.log function as a fallback
  }
}
