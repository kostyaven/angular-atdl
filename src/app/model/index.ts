import {ControlType} from './controls/ControlType'
import {ParameterType} from './types/ParameterType'
import {Edit} from './validation'

export type StandardFixFields = { [p: string]: any };
export type FixMessage = { [tag: number]: string };
export type ParametersByName = Record<string, ParameterType<any>>;
export type ControlsByID = Record<string, ControlType<any>>;
export type EditsByID = Record<string, Edit>;
