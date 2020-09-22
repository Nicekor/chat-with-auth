const validate = ({ nickname }) => {
  const errors = {};
  if (!nickname) {
    errors.nickname = 'Nickname is required.';
  } else if (nickname.length > 12) {
    errors.nickname = 'Nickname is too long. Max chars: 12.';
  } else if (nickname.length < 4) {
    errors.nickname = 'Nickname is too short. Min chars: 3';
  }
  return errors;
};

export default validate;
