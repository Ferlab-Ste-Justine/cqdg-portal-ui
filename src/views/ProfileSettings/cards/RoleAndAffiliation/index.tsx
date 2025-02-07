import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Checkbox, Form, Input, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import cx from 'classnames';

import { IOption } from 'services/api/user/models';
import { useUser } from 'store/user';
import { updateUser } from 'store/user/thunks';

import BaseCard from '../BaseCard';
import BaseForm from '../BaseForm';
import { sortOptionsLabelsByName } from '../utils';

import formStyles from '../form.module.css';

enum FORM_FIELDS {
  ROLES = 'roles',
  AFFILIATION = 'affiliation',
  NO_AFFILIATION = 'no_affiliation',
}

const initialChangedValues = {
  [FORM_FIELDS.ROLES]: false,
  [FORM_FIELDS.AFFILIATION]: false,
  [FORM_FIELDS.NO_AFFILIATION]: false,
};

const RoleAndAffiliationCard = ({ roleOptions = [] }: { roleOptions: IOption[] }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [hasChanged, setHasChanged] = useState<Record<FORM_FIELDS, boolean>>(initialChangedValues);
  const initialValues = useRef<Record<FORM_FIELDS, any>>();

  const isValueChanged = () => Object.values(hasChanged).some((val) => val);

  const onDiscardChanges = () => {
    setHasChanged(initialChangedValues);
    form.setFieldsValue(initialValues.current);
  };

  const roleOptionsSorted = sortOptionsLabelsByName(roleOptions, 'roleOptions');

  useEffect(() => {
    initialValues.current = {
      [FORM_FIELDS.ROLES]: userInfo?.roles || [],
      [FORM_FIELDS.AFFILIATION]: userInfo?.affiliation,
      [FORM_FIELDS.NO_AFFILIATION]: !userInfo?.affiliation,
    };
    form.setFieldsValue(initialValues.current);
    setHasChanged(initialChangedValues);
  }, [form, roleOptions, userInfo]);

  return (
    <BaseCard
      form={form}
      title={intl.get('screen.profileSettings.cards.roleAffiliation.title')}
      isValueChanged={isValueChanged()}
      onDiscardChanges={onDiscardChanges}
    >
      <BaseForm
        form={form}
        onHasChanged={setHasChanged}
        initialValues={initialValues}
        hasChangedInitialValue={hasChanged}
        onFinish={(values: any) => {
          const roles = values[FORM_FIELDS.ROLES];
          const affiliation = values[FORM_FIELDS.NO_AFFILIATION]
            ? ''
            : values[FORM_FIELDS.AFFILIATION];
          dispatch(updateUser({ data: { roles, affiliation } }));
        }}
      >
        <Form.Item
          className={formStyles.withCustomHelp}
          name={FORM_FIELDS.ROLES}
          label={intl.get('screen.profileSettings.cards.roleAffiliation.iama')}
          required={false}
          rules={[{ required: true }]}
        >
          <Checkbox.Group className={formStyles.checkBoxGroup}>
            <span className={formStyles.help}>
              {intl.get('screen.profileSettings.cards.roleAffiliation.checkAllThatApply')}
            </span>
            <Space direction="vertical">
              {roleOptionsSorted.map((option) => (
                <Checkbox key={option.value} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[FORM_FIELDS.NO_AFFILIATION] !== currentValues[FORM_FIELDS.NO_AFFILIATION]
          }
        >
          {({ getFieldValue }) =>
            !getFieldValue(FORM_FIELDS.NO_AFFILIATION) ? (
              <Form.Item
                className={cx(formStyles.withCustomHelp, formStyles.affiliationField)}
                label={intl.get('screen.profileSettings.cards.roleAffiliation.affiliatedWith')}
              >
                <span className={formStyles.help}>
                  {intl.get('screen.profileSettings.cards.roleAffiliation.provideAffiliation')}
                </span>
                <Form.Item
                  name={FORM_FIELDS.AFFILIATION}
                  className={formStyles.noMargin}
                  required={false}
                  rules={[{ required: true, validateTrigger: 'onSubmit' }]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[FORM_FIELDS.NO_AFFILIATION] !== currentValues[FORM_FIELDS.NO_AFFILIATION]
          }
        >
          <Form.Item
            name={FORM_FIELDS.NO_AFFILIATION}
            label={
              form.getFieldValue(FORM_FIELDS.NO_AFFILIATION)
                ? intl.get('screen.profileSettings.cards.roleAffiliation.affiliatedWith')
                : ''
            }
            className={cx(
              formStyles.withCustomHelp,
              form.getFieldValue(FORM_FIELDS.NO_AFFILIATION) && formStyles.noAffiliationField,
            )}
            rules={[{ required: false }]}
            valuePropName="checked"
          >
            <Checkbox>
              {intl.get('screen.profileSettings.cards.roleAffiliation.dontHaveAffiliation')}
            </Checkbox>
          </Form.Item>
        </Form.Item>
      </BaseForm>
    </BaseCard>
  );
};

export default RoleAndAffiliationCard;
