import { Box } from '@mui/material';
import InputCustom from '../InputCustom/InputCustom';
import RatingBlock from './RatingBlock';

export const getTypeComponents = ({ valueStatus, status, fields, title, name, type, value, avatar }, form, index, activeIndex) => {
  switch (type) {
    case 'title':
      return <Box sx={{ fontWeight: '600' }}>{value}</Box>;
    case 'chat':
    case 'chat-self': {
      let statusValue = status?.(form);
      return (
        <Box sx={{ fontSize: '16px', display: 'flex', alignItems: 'start', justifyContent: 'flex-end', flexDirection: type == 'chat-self' ? 'row' : 'row-reverse', paddingTop: avatar ? '40px' : '10px' }}>
          <Box
            sx={{
              position: 'relative',
              ...(type == 'chat-self' ? { marginRight: '20px' } : { marginLeft: '20px' }),
              padding: `15px 18px 15px ${statusValue ? '40px' : '24px'}`,
              borderRadius: '6px',
              background: type == 'chat-self' ? '#4282E1' : '#DFE9F7',
              color: type == 'chat-self' ? '#fff' : '#000',
            }}>
            {statusValue && <Box sx={{ position: 'absolute', top: '15px', left: '22px', height: 'calc(100% - 30px)', width: '4px', borderRadius: '4px', background: statusValue == 'good' ? '#219653' : statusValue == 'bad' || statusValue == 'very-bad' ? '#EB5757' : '#4282E1' }}></Box>}

            <Box sx={{ fontWeight: '600', marginBottom: '4px' }}>{name}</Box>
            {valueStatus?.(statusValue) || value}
            {(avatar || statusValue) && (
              <img
                src={type == 'chat-self' ? 'img/triangle.svg' : 'img/triangle-light.svg'}
                style={{
                  position: 'absolute',
                  top: 0,
                  ...(type == 'chat-self' ? { right: '-11px' } : { left: '-11px' }),

                  width: '20px',
                }}
              />
            )}
          </Box>
          {avatar ? <img style={{ borderRadius: '50%' }} src={avatar} /> : <Box sx={{ minWidth: '32px' }}></Box>}
        </Box>
      );
    }
    case 'inputs': {
      return (
        <Box sx={{ marginTop: '40px', padding: '24px 24px 32px 24px', borderRadius: '12px', border: '1px solid rgba(66, 130, 225, 0.15)' }}>
          <Box>
            <Box sx={{ fontWeight: '600', fontSize: '20px', marginBottom: '25px' }}> {title}</Box>

            {fields?.map((itemField) => (
              <>
                <InputCustom
                  // disabled={activeIndex != index + 1}
                  disabled={false}
                  isPrice={itemField?.isPrice}
                  radioList={itemField?.list}
                  isNumber={itemField?.type == 'number'}
                  isEmail={itemField?.type == 'email'}
                  isRadio={itemField?.type == 'radio'}
                  control={form?.control}
                  label={itemField?.label}
                  form={form}
                  name={itemField?.name}
                />
              </>
            ))}
          </Box>
        </Box>
      );
    }
    case 'chapter-end': {
      return <RatingBlock />;
    }
    case 'video': {
      return <img style={{ width: '100%', marginTop: '40px' }} src="img/video.png" />;
    }
    default:
      break;
  }
};
