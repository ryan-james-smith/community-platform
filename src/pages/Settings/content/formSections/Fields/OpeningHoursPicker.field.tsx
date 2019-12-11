import React, { Component } from 'react'
import { WEEK_DAYS, OPENING_HOURS } from 'src/mocks/Selectors'
import { Field } from 'react-final-form'
import { InputField } from 'src/components/Form/Fields'
import { Button } from 'src/components/Button'
import { Modal } from 'src/components/Modal/Modal'
import Text from 'src/components/Text'
import Flex from 'src/components/Flex'
import { SelectField } from 'src/components/Form/Select.field'
import { required } from 'src/utils/validators'

interface IProps {
  openingHoursValues?: string
  index: number
  onDelete: (index: number) => void
}
interface IState {
  showDeleteModal: boolean
  _toDocsList: boolean
}

export class OpeningHoursPicker extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      showDeleteModal: false,
      _toDocsList: false,
    }
  }

  toggleDeleteModal() {
    this.setState({ showDeleteModal: !this.state.showDeleteModal })
  }
  confirmDelete() {
    this.toggleDeleteModal()
    this.props.onDelete(this.props.index)
  }

  render() {
    const { openingHoursValues, index } = this.props
    return (
      <Flex
        key={index}
        alignItems="center"
        flexDirection={['column', 'row']}
        my={1}
      >
        <Field
          data-cy={`opening-time-day-${index}`}
          name={`${openingHoursValues}.day`}
          options={WEEK_DAYS}
          component={SelectField}
          validate={required}
          placeholder="Select day"
          style={{ width: '160px', marginRight: '8px', marginBottom: 0 }}
        />
        <Field
          data-cy={`opening-time-from-${index}`}
          name={`${openingHoursValues}.openFrom`}
          options={OPENING_HOURS}
          component={SelectField}
          placeholder="from --:-- AM"
          validate={required}
          style={{ width: '160px', marginRight: '8px', marginBottom: 0 }}
        />
        <Field
          data-cy={`opening-time-to-${index}`}
          name={`${openingHoursValues}.openTo`}
          options={OPENING_HOURS}
          component={SelectField}
          placeholder="to --:-- PM"
          validate={required}
          style={{ width: '160px', marginBottom: 0 }}
        />
        <Button
          data-cy={`delete-opening-time-${index}`}
          icon={'delete'}
          variant={'tertiary'}
          onClick={() => this.toggleDeleteModal()}
          ml={'10px'}
        />
        {this.state.showDeleteModal && (
          <Modal onDidDismiss={() => this.toggleDeleteModal()}>
            <Text>Are you sure you want to delete this schedule ?</Text>
            <Flex p={0} mx={-1} justifyContent="flex-end">
              <Flex px={1}>
                <Button
                  data-cy={'cancel-delete'}
                  variant={'outline'}
                  onClick={() => this.toggleDeleteModal()}
                >
                  Cancel
                </Button>
              </Flex>
              <Flex px={1}>
                <Button
                  data-cy={'confirm-delete'}
                  variant={'tertiary'}
                  onClick={() => this.confirmDelete()}
                >
                  Delete
                </Button>
              </Flex>
            </Flex>
          </Modal>
        )}
      </Flex>
    )
  }
}
