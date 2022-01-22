import {CheckBoxControl} from './CheckBoxControl'
import {CheckBoxListControl} from './CheckBoxListControl'
import {ClockControl} from './ClockControl'
import {DoubleSpinnerControl} from './DoubleSpinnerControl'
import {DropDownListControl} from './DropDownListControl'
import {EditableDropDownListControl} from './EditableDropDownListControl'
import {HiddenFieldControl} from './HiddenFieldControl'
import {LabelControl} from './LabelControl'
import {MultiSelectListControl} from './MultiSelectListControl'
import {RadioButtonControl} from './RadioButtonControl'
import {RadioButtonListControl} from './RadioButtonListControl'
import {SingleSelectListControl} from './SingleSelectListControl'
import {SingleSpinnerControl} from './SingleSpinnerControl'
import {SliderControl} from './SliderControl'
import {TextFieldControl} from './TextFieldControl'

import '../styles.scss'

import React, {FunctionComponent} from 'react'
import {ParameterType} from '../../model/types/ParameterType'

export type ComponentProps<C, P> = {
  control: C;
  parameter: ParameterType<P> | null;
  onChange: React.EventHandler<any>;
}

export const components = new Map<string, FunctionComponent<ComponentProps<any, any>>>()
components.set('lay:Clock_t', ClockControl)
components.set('lay:TextField_t', TextFieldControl)
components.set('lay:SingleSelectList_t', SingleSelectListControl)
components.set('lay:MultiSelectList_t', MultiSelectListControl)
components.set('lay:Slider_t', SliderControl)
components.set('lay:CheckBox_t', CheckBoxControl)
components.set('lay:CheckBoxList_t', CheckBoxListControl)
components.set('lay:SingleSpinner_t', SingleSpinnerControl)
components.set('lay:DoubleSpinner_t', DoubleSpinnerControl)
components.set('lay:DropDownList_t', DropDownListControl)
components.set('lay:EditableDropDownList_t', EditableDropDownListControl)
components.set('lay:RadioButton_t', RadioButtonControl)
components.set('lay:RadioButtonList_t', RadioButtonListControl)
components.set('lay:Label_t', LabelControl)
components.set('lay:HiddenField_t', HiddenFieldControl)
