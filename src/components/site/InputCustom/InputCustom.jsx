import clsx from 'clsx';
import React from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import styles from './InputCustom.module.scss';
import { Controller } from 'react-hook-form';
const InputCustom = ({ radioList, form, name, label, placeholder, isPhone, isPrice, isTextarea, isCheckbox, isEmail, control, isNumber, isRadio, disabled = false }) => {
  const error = form?.formState?.errors?.[name];
  return isRadio ? (
    <div style={{ fontWeight: 400, fontSize: '16px', lineHeight: '22px', userSelect: 'none' }}>
      <div style={{ marginBottom: '0px' }} className="input-lable input-label-required">
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {radioList?.map((itemRadio, itemIndex) => (
          <label style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <input disabled={disabled} style={{ margin: '0 5px 0 0' }} {...form.register(name)} type="radio" value={itemRadio?.value} />
            {itemRadio?.label}
          </label>
        ))}
      </div>
    </div>
  ) : isNumber ? (
    <label class={clsx('input-wrap', error && 'input-error')}>
      <div className="input-lable input-label-required">{label}</div>
      <Controller control={control} name={name} render={({ field: { onChange, name, value } }) => <NumericFormat {...(isPrice && { suffix: ' тг', thousandSeparator: ' ' })} name={name} className="input-custom" value={value} onChange={onChange} disabled={disabled} />} />
    </label>
  ) : isPhone ? (
    <label class={clsx('input-wrap textarea-wrap', error && 'input-error')}>
      <div className="input-lable input-label-required">Телефон</div>
      <PatternFormat
        className="input-custom"
        format="+ 7 (###) ###-##-##"
        value={form.watch(name)}
        mask="*"
        type="text"
        placeholder="Введите телефон для связи"
        is
        onValueChange={(val) => {
          form.setValue(name, val.formattedValue);
        }}
      />
    </label>
  ) : isTextarea ? (
    <label class={clsx('input-wrap textarea-wrap', error && 'input-error')}>
      <div className="input-lable textarea-label input-label-required">{label}</div>
      <textarea {...form.register(name, { required: true })} rows="6" className="textarea-custom" placeholder={placeholder} />
    </label>
  ) : isCheckbox ? (
    <label class={clsx('checkbox-custom', error && 'checkbox-error')}>
      <input {...form.register(name, { required: true })} type={'checkbox'} />
      <div></div>
      <span className="">{label}</span>
    </label>
  ) : (
    <label class={clsx('input-wrap', error && 'input-error')}>
      <div className="input-lable input-label-required">{label}</div>
      <input
        {...form.register(name, {
          required: true,
          ...(isEmail && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          }),
        })}
        disabled={disabled}
        type={'text'}
        className="input-custom"
        placeholder={placeholder}
      />
    </label>
  );
};

export default InputCustom;
