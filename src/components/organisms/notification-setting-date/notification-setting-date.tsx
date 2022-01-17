import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {
  SearchCheckbox,
  SearchCheckboxGroup,
} from '../../atoms/search-checkbox'
import FormField from '../../molecules/form-field'
import { Button } from '../../atoms/button'
import { InputText, InputTime } from '../../atoms/form'
import GlobalContext from '../../../store/context'
import { Field, Form } from 'react-final-form'
import { composeValidators, time } from '../../utils/varidator'
import { useOrganization } from '../../../hooks/use-organization'

type Props = {}

const NotificationSettingDate: React.FC<Props> = (props) => {
  const { state } = useContext(GlobalContext)
  const { setTarget, setPutTrigger } = useOrganization()
  const [saveDisable, setSaveDisable] = useState(true)
  const [selectedTime, setSelectedTime] = useState<string>(
    state.organization.notification_time
  )

  const handleSubmit = async (formValues: any) => {
    const {
      notification_week_0,
      notification_week_1,
      notification_week_2,
      notification_week_3,
      notification_week_4,
      notification_week_5,
      notification_week_6,
      notification_time,
    } = formValues
    const target = {
      notification_week_0: notification_week_0,
      notification_week_1: notification_week_1,
      notification_week_2: notification_week_2,
      notification_week_3: notification_week_3,
      notification_week_4: notification_week_4,
      notification_week_5: notification_week_5,
      notification_week_6: notification_week_6,
      notification_time: notification_time,
    }
    setSaveDisable(true)
    setTarget(target)
    setPutTrigger(true)
  }

  const handleChange = async (formState) => {
    const {
      notification_time,
      notification_week_0,
      notification_week_1,
      notification_week_2,
      notification_week_3,
      notification_week_4,
      notification_week_5,
      notification_week_6,
    } = formState.values

    if (
      notification_time !== state.organization.notification_time ||
      notification_week_0 !== state.organization.notification_week_0 ||
      notification_week_1 !== state.organization.notification_week_1 ||
      notification_week_2 !== state.organization.notification_week_2 ||
      notification_week_3 !== state.organization.notification_week_3 ||
      notification_week_4 !== state.organization.notification_week_4 ||
      notification_week_5 !== state.organization.notification_week_5 ||
      notification_week_6 !== state.organization.notification_week_6
    ) {
      setSaveDisable(false)
    } else {
      setSaveDisable(true)
    }

    setSelectedTime(notification_time)
  }

  const setTimes = (args, state, { setIn, changeValue }) => {
    const time = args[0].target.value
    const field = state.fields['notification_time']
    field.change(time)
    handleChange(state.formState)
  }

  return (
    <Wrap>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          notification_week_0: state.organization.notification_week_0,
          notification_week_1: state.organization.notification_week_1,
          notification_week_2: state.organization.notification_week_2,
          notification_week_3: state.organization.notification_week_3,
          notification_week_4: state.organization.notification_week_4,
          notification_week_5: state.organization.notification_week_5,
          notification_week_6: state.organization.notification_week_6,
          notification_time: state.organization.notification_time,
        }}
        validate={(values: any) => {
          const errors: any = {}

          errors.notification_time = composeValidators(time)(
            values.notification_time
          )

          return errors
        }}
        mutators={{ setTime: setTimes }}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <FormWrap>
              <FormField label={'曜日'}>
                <SearchCheckboxGroup>
                  <Field name={'notification_week_1'} type={'checkbox'}>
                    {({ input, meta }) => (
                      <SearchCheckbox
                        {...input}
                        onChange={(e) => {
                          input.onChange(e)
                          handleChange(form.getState())
                        }}
                      >
                        月
                      </SearchCheckbox>
                    )}
                  </Field>
                  <Field name={'notification_week_2'} type={'checkbox'}>
                    {({ input, meta }) => (
                      <SearchCheckbox
                        {...input}
                        onChange={(e) => {
                          input.onChange(e)
                          handleChange(form.getState())
                        }}
                      >
                        火
                      </SearchCheckbox>
                    )}
                  </Field>
                  <Field name={'notification_week_3'} type={'checkbox'}>
                    {({ input, meta }) => (
                      <SearchCheckbox
                        {...input}
                        onChange={(e) => {
                          input.onChange(e)
                          handleChange(form.getState())
                        }}
                      >
                        水
                      </SearchCheckbox>
                    )}
                  </Field>
                  <Field name={'notification_week_4'} type={'checkbox'}>
                    {({ input, meta }) => (
                      <SearchCheckbox
                        {...input}
                        onChange={(e) => {
                          input.onChange(e)
                          handleChange(form.getState())
                        }}
                      >
                        木
                      </SearchCheckbox>
                    )}
                  </Field>
                  <Field name={'notification_week_5'} type={'checkbox'}>
                    {({ input, meta }) => (
                      <SearchCheckbox
                        {...input}
                        onChange={(e) => {
                          input.onChange(e)
                          handleChange(form.getState())
                        }}
                      >
                        金
                      </SearchCheckbox>
                    )}
                  </Field>
                  <Field name={'notification_week_6'} type={'checkbox'}>
                    {({ input, meta }) => (
                      <SearchCheckbox
                        {...input}
                        onChange={(e) => {
                          input.onChange(e)
                          handleChange(form.getState())
                        }}
                      >
                        土
                      </SearchCheckbox>
                    )}
                  </Field>
                  <Field name={'notification_week_0'} type={'checkbox'}>
                    {({ input, meta }) => (
                      <SearchCheckbox
                        {...input}
                        onChange={(e) => {
                          input.onChange(e)
                          handleChange(form.getState())
                        }}
                      >
                        日
                      </SearchCheckbox>
                    )}
                  </Field>
                </SearchCheckboxGroup>
              </FormField>

              <Field name={'notification_time'} type={'text'}>
                {({ input, meta }) => (
                  <FormField label={'時間'}>
                    <InputTime
                      {...(input as any)}
                      name={'notification_time'}
                      size={'M'}
                      value={input.value}
                      placeholder={'00:00'}
                      onChange={(e) => {
                        input.onChange(e)
                        handleChange(form.getState())
                      }}
                      selectedTime={selectedTime}
                      onClick={form.mutators.setTime}
                      invalidMessage={meta.error && meta.touched && meta.error}
                    />
                  </FormField>
                )}
              </Field>
            </FormWrap>
            <Button
              type={'submit'}
              label={'保存'}
              buttonType={'primary'}
              disabled={saveDisable}
            />
          </form>
        )}
      />
    </Wrap>
  )
}

const Wrap = styled.div``
const FormWrap = styled.div`
  display: flex;
  padding: 24px 0;

  > div {
    margin-right: 32px;
  }
`

export default NotificationSettingDate
